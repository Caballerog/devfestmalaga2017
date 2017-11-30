import { Get, Controller, Param, Body, Put, Delete, Post } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';

@Controller('heroes')
export class AppController {
  private FAKE_ID = 21;
  private HEROES: Hero[] = [
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
  @Get()
  heroes(): Hero[] {
    return this.HEROES;
  }
  @Get(':id')
  findById( @Param('id') id: string): Hero {
    const heroID = parseInt(id, 10); //Pipe
    return this.HEROES.find(hero => hero.id === heroID);
  }
  @Get('search/:name')
  findByName( @Param('name') name: string): Hero[] {
    return this.HEROES.filter(hero => hero.name.includes(name));
  }
  @Put()
  updateById( @Body('id') id: string, @Body('name') name: string) {
    const heroID = parseInt(id, 10);
    const hero = this.HEROES.find(hero => hero.id === heroID);
    if (hero) {
      hero.name = name;
    }
  }
  @Delete(':id')
  deleteById( @Param('id') id: string) {
    const heroID = parseInt(id, 10);
    const heroIndex = this.HEROES.findIndex(hero => hero.id === heroID);
    this.HEROES.splice(heroIndex, 1);
  }
  @Post()
  createHero( @Body('name') name: string) {
    const hero: Hero = {
      name,
      id: this.FAKE_ID,
    };
    this.HEROES.push(hero);
    this.FAKE_ID = this.FAKE_ID + 1;
    return hero;
  }

}
