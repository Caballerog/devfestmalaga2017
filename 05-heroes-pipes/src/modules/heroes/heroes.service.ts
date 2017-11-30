import { Component, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';
import { NotHeroException } from '../../common/exceptions/not-hero.exception';
import { RepeatHeroException } from '../../common/exceptions/repeat-hero.exception';


@Component()
export class HeroesService {
  private FAKE_ID = 21;
  private readonly heroes: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' },
  ];

  findAll(): Hero[] {
    return this.heroes;
  }
  findById(heroID: number): Hero {
    const hero = this.heroes.find(hero => hero.id === heroID);
    if (!hero) {
      throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
    }
    return hero;
  }
  findByName(name: string): Hero[] {
    const heroes = this.heroes.filter(hero => hero.name.includes(name));
    if (!heroes.length) {
      throw new NotFoundException('Heroes not found');
    }
    return heroes;
  }
  updateById(heroID: number, name: string): Hero {
    const hero = this.findById(heroID);
    hero.name = name;
    return hero;
  }
  deleteById(heroID: number): Hero {
    const heroIndex = this.heroes.findIndex(hero => hero.id === heroID);
    if (heroIndex === -1) {
      throw new NotHeroException(heroID);
    }
    const hero = this.heroes[heroIndex];
    this.heroes.splice(heroIndex, 1);
    return hero;
  }
  create(name: string): Hero {
    const heroFound = this.heroes.find(hero => hero.name === name);
    if (heroFound) {
      throw new RepeatHeroException(heroFound);
    }
    const hero: Hero = {
      name,
      id: this.FAKE_ID,
    };
    this.heroes.push(hero);
    this.FAKE_ID = this.FAKE_ID + 1;
    return hero;
  }
}
