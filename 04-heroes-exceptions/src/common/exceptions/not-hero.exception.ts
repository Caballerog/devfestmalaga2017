import { NotFoundException } from '@nestjs/common';

export class NotHeroException extends NotFoundException {
  constructor(heroID: number) {
    const msg = `The Hero: ID: ${heroID} not found`;
    super(msg);
  }
}