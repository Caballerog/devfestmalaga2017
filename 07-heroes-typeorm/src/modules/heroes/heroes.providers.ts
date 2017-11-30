import { Connection, Repository } from 'typeorm';
import { Hero } from './hero.entity';

export const heroesProviders = [
  {
    provide: 'HeroesRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Hero),
    inject: ['DbConnectionToken'],
  },
];