import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { typePolicies } from "./cache";
import { browserLink, createServerLink } from "./links";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    link: browserLink,
    cache: new InMemoryCache({ typePolicies }),
  });
});

export function makeServerApolloClient(token: string | undefined) {
  return new ApolloClient({
    link: createServerLink(token),
    cache: new InMemoryCache({ typePolicies }),
    defaultOptions: {
      watchQuery: { fetchPolicy: "no-cache" },
      query: { fetchPolicy: "no-cache" },
    },
  });
}
