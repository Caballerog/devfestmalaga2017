import { Get, Controller, Param, Body, Put, Delete, Post, UsePipes, UseGuards } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';
import { HeroesService } from './heroes.service';
import { HeroDto } from './interfaces/hero.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipes';
import { Roles } from '../../common/decorators/roles.decorator';
import { ValidationHeroPipe } from '../../common/pipes/validation-hero.pipe';


@UseGuards(RolesGuard)
@Controller('heroes')
export class HeroesController {
  constructor(
    private readonly heroesService: HeroesService,
  ) { }

  @Get()
  heroes(): Hero[] {
    return this.heroesService.findAll();
  }
  @Get(':id')
  findById( @Param('id', new ParseIntPipe()) id: number): Hero {
    return this.heroesService.findById(id);
  }
  @Roles('user')
  @Get('search/:name')
  findByName( @Param('name') name: string): Hero[] {
    return this.heroesService.findByName(name);
  }
  @Roles('admin')
  @Put()
  updateById( @Body('id', new ParseIntPipe()) id: number, @Body('name') name: string): Hero {
    return this.heroesService.updateById(id, name);
  }
  @Roles('admin')
  @Delete(':id')
  deleteById( @Param('id', new ParseIntPipe()) id: number): Hero {
    return this.heroesService.deleteById(id);
  }
  @Roles('admin')
  @Post()
  create( @Body('', new ValidationHeroPipe()) hero: HeroDto): Hero {
    return this.heroesService.create(hero.name);
  }
}
