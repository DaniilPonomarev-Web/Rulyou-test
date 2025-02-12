module.exports = {
  host: process.env.MYSQL_HOST,
  type: 'mysql',
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  logging: process.env.MYSQL_LOG === 'true',
  entities: ['./**/*.entity.ts'],
  migrations: ['db/migrations/*.ts'],
  cli: {
    migrationsDir: 'db/migrations',
  },
  extra: {
    connectionLimit: 10,
  },
  synchronize: true,
};
