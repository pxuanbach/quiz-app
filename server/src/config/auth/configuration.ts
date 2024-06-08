export default () => ({
  auth: {
    accessTokenSecretKey:
      process.env.JWT_ACCESS_TOKEN_SECRET || 'LGVncerKSBnfg0Qvvtzej6Z21Z1PQ4',
    refreshTokenSecretKey:
      process.env.JWT_REFRESH_TOKEN_SECRET || '4qiDTgoMNCQqj8JpeffGSL3oDLX0gU',
    verifyTokenSecretKey:
      process.env.JWT_VERIFY_TOKEN_SECRET || 'VgVI8XGClmfmR4nMq58WlB1hxj5qSk',
    resetPassTokenSecretKey:
      process.env.JWT_RESET_PASSWORD_TOKEN_SECRET ||
      'nzj9TTnN0PMO1YFx9nWxjBXz78yH0z',
    accessTokenExpiresInMinutes:
      parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN_MINUTES, 10) || 1 * 60, // 1 hour
    refreshTokenExpiresInMinutes:
      parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_MINUTES, 10) || 24 * 60, // 24 hours
    verifyTokenExpiresInMinutes:
      parseInt(process.env.VERIFY_TOKEN_EXPIRES_IN_MINUTES, 10) || 24 * 60, // 24 hour
    resetPassTokenExpiresInMinutes:
      parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN_MINUTES, 10) ||
      2 * 60, // 2 hour
    saltOrRounds: parseInt(process.env.SALT_OR_ROUNDS, 10) || 10,
  },
});
