import { Component } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';

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
    return this.heroes.find(hero => hero.id === heroID);
  }
  findByName(name: string): Hero[] {
    return this.heroes.filter(hero => hero.name.includes(name));
  }
  updateById(heroID: number, name: string): Hero {
    const hero = this.findById(heroID);
    if (hero) {
      hero.name = name;
    }
    return hero;
  }
  deleteById(heroID: number): Hero {
    const heroIndex = this.heroes.findIndex(hero => hero.id === heroID);
    const hero = this.heroes[heroIndex];
    this.heroes.splice(heroIndex, 1);
    return hero;
  }
  create(name: string): Hero {
    const hero: Hero = {
      name,
      id: this.FAKE_ID,
    };
    this.heroes.push(hero);
    this.FAKE_ID = this.FAKE_ID + 1;
    return hero;
  }
}