export default () => ({
  database: {
    mongo: {
      username: process.env.MONGO_USERNAME || '',
      password: process.env.MONGO_PASSWORD || '',
      database: process.env.MONGO_DATABASE || 'VocabDb',
      host: process.env.MONGO_HOST || 'localhost:27017',
    },
  },
});
