export default () => ({
  app: {
    env: process.env.APP_ENV || 'development',
    name: process.env.APP_NAME || 'My App',
    url: process.env.APP_URL || 'http://localhost:9001',
    port: parseInt(process.env.APP_PORT, 10) || 9001,
  },
});
