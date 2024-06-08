interface AuthConfig {
  accessTokenSecretKey: string;
  refreshTokenSecretKey: string;
  verifyTokenSecretKey: string;
  resetPassTokenSecretKey: string;
  accessTokenExpiresInMinutes: number;
  refreshTokenExpiresInMinutes: number;
  verifyTokenExpiresInMinutes: number;
  resetPassTokenExpiresInMinutes: number;
  saltOrRounds: number;
}

export default AuthConfig;
