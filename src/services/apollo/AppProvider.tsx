"use client";

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { ReactNode } from "react";
import { typePolicies } from "./cache";
import { browserLink } from "./links";

function makeClient() {
  return new ApolloClient({
    link: browserLink,
    cache: new InMemoryCache({ typePolicies }),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
