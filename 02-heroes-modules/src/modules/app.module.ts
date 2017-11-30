import { Module } from '@nestjs/common';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  modules: [
    HeroesModule,
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule { }
