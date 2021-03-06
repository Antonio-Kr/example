export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    access_expires_in: '20s',
    refresh_expires_in: '40s',
  },
  app: {
    port: process.env.PORT || 5000,
  },
});
