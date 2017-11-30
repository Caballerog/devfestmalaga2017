import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';

@Module({
  modules: [],
  controllers: [
    HeroesController,
  ],
  components: [
    HeroesService,
  ],
})
export class HeroesModule { }