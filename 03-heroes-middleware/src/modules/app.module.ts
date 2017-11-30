import { Module, MiddlewaresConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { HeroesModule } from './heroes/heroes.module';
import { CorsOptions } from 'cors';
import { CorsMiddleware } from '../common/middlewares/cors.middleware';
import { JSONMiddleware } from '../common/middlewares/json.middleware';

const allRoutes = {
  method: RequestMethod.ALL,
  path: '*',
};

@Module({
  modules: [
    HeroesModule,
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule implements NestModule {

  public static corsOptions: CorsOptions | undefined = undefined;
  public static jsonOptions: any | undefined = undefined;

  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(CorsMiddleware)
      .with(ApplicationModule.corsOptions)
      .forRoutes(allRoutes)
      .apply(JSONMiddleware)
      .with(ApplicationModule.jsonOptions)
      .forRoutes(allRoutes);
  }
}
