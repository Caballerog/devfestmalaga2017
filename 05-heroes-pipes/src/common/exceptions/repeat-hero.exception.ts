import { ForbiddenException } from '@nestjs/common';
import { Hero } from '../../modules/heroes/interfaces/hero.interface';


export class RepeatHeroException extends ForbiddenException {
  constructor(hero: Hero) {
    const msg = `The Hero: ${hero.id} - ${hero.name} is repeated`;
    super(msg);
  }
}