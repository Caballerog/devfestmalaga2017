import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(req, context: ExecutionContext): boolean {
    const { parent, handler } = context;
    const roles = this.reflector.get<string[]>('roles', handler);
    if (!roles) {
      return true;
    }
    /* Fake user's rol */
    req.user = {
      rol: 'user',
    };
    const user = req.user;
    const hasRole = () => !!roles.find((role) => user.rol === role);
    return user && user.rol && hasRole();
  }
}