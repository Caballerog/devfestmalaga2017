import { Middleware, NestMiddleware } from '@nestjs/common';
import { json } from 'express';

@Middleware()
export class JSONMiddleware implements NestMiddleware {
  public resolve(): (req: any, res: any, next: any) => void {
    return json();
  }
}