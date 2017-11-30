import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { DatabaseModule } from '../database/database.module';
import { heroesProviders } from './heroes.providers';

@Module({
  modules: [
    DatabaseModule,
  ],
  controllers: [
    HeroesController,
  ],
  components: [
    HeroesService,
    ...heroesProviders,
  ],
})
export class HeroesModule { }