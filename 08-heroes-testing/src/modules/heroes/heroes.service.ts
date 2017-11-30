import { Component, HttpException, HttpStatus, NotFoundException, Inject } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';
import { Repository, getRepository } from 'typeorm';
import { NotHeroException } from '../../common/exceptions/not-hero.exception';
import { RepeatHeroException } from '../../common/exceptions/repeat-hero.exception';

@Component()
export class HeroesService {
  constructor(
    @Inject('HeroesRepositoryToken') private readonly heroesRepository: Repository<Hero>,
  ) {
    // this.fake_heroes.forEach(hero => this.heroesRepository.insert(hero).catch(() => { }));
  }
  private readonly fake_heroes: Hero[] = [
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

  async findAll(): Promise<Hero[]> {
    return await this.heroesRepository.find();
  }
  async findById(heroID: number): Promise<Hero> {
    const hero = await this.heroesRepository.findOneById(heroID);
    if (!hero) {
      throw new NotHeroException(heroID);
    }
    return hero;
  }
  async findByName(name: string): Promise<Hero[]> {
    const [heroes, heroesCount] = await this.heroesRepository
      .createQueryBuilder('heroes')
      .select()
      .where(`heroes.name like '%:name%'`, { name })
      .getManyAndCount();

    if (heroesCount === 0) {
      throw new NotFoundException('Heroes not found');
    }
    return heroes as Hero[];
  }
  async updateById(heroID: number, name: string): Promise<Hero> {
    const hero: Hero = {
      name,
      id: heroID,
    };
    await this.heroesRepository.updateById(heroID, hero);
    return hero;
  }
  async deleteById(heroID: number): Promise<Hero> {
    const hero = await this.findById(heroID);
    await this.heroesRepository.deleteById(heroID);
    return hero;
  }
  async create(name: string): Promise<Hero> {
    try {
      await this.heroesRepository.insert({ name });
    } catch {
      throw new RepeatHeroException({ name } as Hero);
    }
    return this.findOneByName(name);
  }
  findOneByName(name): Promise<Hero> {
    return this.heroesRepository.findOne({
      name,
    });
  }
}
