"use client";

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { ReactNode, useCallback } from "react";
import { typePolicies } from "./cache";
import { browserLink, createServerLink } from "./links";

function makeClient(initialToken?: string) {
  const isServer = typeof window === "undefined";

  return new ApolloClient({
    link: isServer ? createServerLink(initialToken) : browserLink,
    cache: new InMemoryCache({ typePolicies }),
  });
}

export function ApolloWrapper({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken?: string;
}) {
  const makeClientWithToken = useCallback(
    () => makeClient(initialToken),
    [initialToken]
  );

  return (
    <ApolloNextAppProvider makeClient={makeClientWithToken}>
      {children}
    </ApolloNextAppProvider>
  );
}
