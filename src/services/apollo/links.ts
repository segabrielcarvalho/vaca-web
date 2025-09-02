import clientConfig from "@/config/client";
import settings from "@/config/settings";
import { ApolloLink, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { createClient } from "graphql-ws";
import { destroyCookie, parseCookies } from "nookies";

const authLink = (getToken: () => string | undefined) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
  }));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        if (typeof window !== "undefined") {
          destroyCookie(null, settings.tokenKey);
        }
      }
    });

  if (
    networkError &&
    "statusCode" in networkError &&
    networkError.statusCode === 401
  ) {
    if (typeof window !== "undefined") destroyCookie(null, settings.tokenKey);
  }
});

const httpLink = new HttpLink({
  uri: clientConfig.apiGraphqlUrl,
  credentials: "include",
});

const uploadLink = createUploadLink({
  uri: clientConfig.apiGraphqlUrl,
  credentials: "include",
  headers: { "Apollo-Require-Preflight": "true" },
}) as unknown as ApolloLink;

let wsLink: ApolloLink | undefined;
if (typeof window !== "undefined") {
  wsLink = new GraphQLWsLink(
    createClient({
      url: clientConfig.apiWebSocketUrl,
      connectionParams: () => {
        const token = parseCookies()[settings.tokenKey];
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
      lazy: true,
      retryAttempts: 3,
    })
  ) as ApolloLink;
}

const splitLink =
  typeof window === "undefined" || !wsLink
    ? split(
        (operation) => operation.getContext().hasUpload === true,
        uploadLink,
        httpLink
      )
    : split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        split(
          (operation) => operation.getContext().hasUpload === true,
          uploadLink,
          httpLink
        )
      );

export const browserLink = ApolloLink.from([
  errorLink,
  authLink(() => parseCookies()[settings.tokenKey]),
  splitLink,
]);

export const createServerLink = (token?: string) =>
  ApolloLink.from([errorLink, authLink(() => token), httpLink]);
