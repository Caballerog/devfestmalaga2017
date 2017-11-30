import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HeroesService } from './heroes.service';

@Module({
  modules: [],
  controllers: [AppController],
  components: [
    HeroesService,
  ],
})
export class ApplicationModule { }
