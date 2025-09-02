export interface JwtPayload {
  exp?: number;
  iat?: number;
  userId?: string;
  email?: string;
  [key: string]: string | number | boolean | undefined;
}

export function decodeTokenEdge(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];

    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);

    const decodedPayload = atob(
      paddedPayload.replace(/-/g, "+").replace(/_/g, "/")
    );

    return JSON.parse(decodedPayload) as JwtPayload;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export function isTokenExpiredEdge(token: string): boolean {
  try {
    const decoded = decodeTokenEdge(token);

    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Erro ao verificar expiração do token:", error);
    return true;
  }
}

export function getTokenExpirationTimeEdge(token: string): number {
  try {
    const decoded = decodeTokenEdge(token);

    if (!decoded || !decoded.exp) {
      return 0;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return Math.max(0, decoded.exp - currentTime);
  } catch (error) {
    console.error("Erro ao obter tempo de expiração:", error);
    return 0;
  }
}

export function willTokenExpireSoonEdge(
  token: string,
  thresholdSeconds: number = 300
): boolean {
  try {
    const timeUntilExpiration = getTokenExpirationTimeEdge(token);
    return timeUntilExpiration <= thresholdSeconds;
  } catch (error) {
    console.error("Erro ao verificar expiração iminente:", error);
    return true;
  }
}
