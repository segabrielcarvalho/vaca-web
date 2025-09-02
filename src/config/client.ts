interface IClientConfig {
  apiGraphqlUrl: string;
  apiWebSocketUrl: string;
}

const clientConfig = {
  apiGraphqlUrl: process.env.NEXT_PUBLIC_API_GRAPHQL_URL!,
  apiWebSocketUrl: process.env.NEXT_PUBLIC_API_WS_URL!,
} as IClientConfig;

export default clientConfig;
