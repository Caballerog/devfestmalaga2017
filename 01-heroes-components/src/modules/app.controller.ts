import { Get, Controller, Param, Body, Put, Delete, Post } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class AppController {
  constructor(
    private readonly heroesService: HeroesService,
  ) { }

  @Get()
  heroes(): Hero[] {
    return this.heroesService.findAll();
  }
  @Get(':id')
  findById( @Param('id') id: string): Hero {
    const heroID = parseInt(id, 10); //Pipe
    return this.heroesService.findById(heroID);
  }
  @Get('search/:name')
  findByName( @Param('name') name: string): Hero[] {
    return this.heroesService.findByName(name);
  }
  @Put()
  updateById( @Body('id') id: string, @Body('name') name: string): Hero {
    const heroID = parseInt(id, 10);
    return this.heroesService.updateById(heroID, name);
  }
  @Delete(':id')
  deleteById( @Param('id') id: string): Hero {
    const heroID = parseInt(id, 10);
    return this.heroesService.deleteById(heroID);
  }
  @Post()
  create( @Body('name') name: string): Hero {
    return this.heroesService.create(name);
  }
}
