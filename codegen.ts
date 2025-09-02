import type { CodegenConfig } from "@graphql-codegen/cli";
import clientConfig from "./src/config/client";

const config: CodegenConfig = {
  schema: clientConfig.apiGraphqlUrl ?? "http://localhost:5000/graphql",
  documents: ["src/**/*.{graphql,gql}"],
  ignoreNoDocuments: true,

  generates: {
    "./src/graphql/__generated__/documents.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: { skipTypename: false },
    },

    "./src/graphql/__generated__/hooks.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "typescript-react-apollo": {
            withHooks: true,
            hooksWithSuspense: true,
            withHOC: false,
            withComponent: false,
            reactApolloVersion: 3,
            addDocBlocks: false,
            gqlImport: "graphql-tag#gql",
          },
        },
      ],
      config: { skipTypename: false },
    },
  },
};

export default config;
