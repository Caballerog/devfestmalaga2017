import { Middleware, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';

@Middleware()
export class CorsMiddleware implements NestMiddleware {
  public resolve(
    options?: cors.CorsOptions,
  ): (req: any, res: any, next: any) => void {
    return cors(options);
  }
}