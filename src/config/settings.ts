interface ISettings {
  tokenKey: string;
  refreshTokenKey: string;
  jwtSecret: string;
}

const settings: ISettings = {
  tokenKey: "vaca-web.token",
  refreshTokenKey: "vaca-web.refreshToken",
  jwtSecret: process.env.JWT_SECRET || "",
};

export default settings;
