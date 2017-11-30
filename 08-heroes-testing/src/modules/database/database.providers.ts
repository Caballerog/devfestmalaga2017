import { createConnection } from 'typeorm';
export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'toor',
      database: 'heroes',
      entities: [
        __dirname + '/../**/*entity.{ts,js}',
      ],
      synchronize: true,
    }),
  },
];
