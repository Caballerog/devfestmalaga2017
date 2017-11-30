import { Test } from "@nestjs/testing";
import { HeroesService } from "./heroes.service";
import { TestingModule } from "@nestjs/testing/testing-module";
import { HeroesController } from "./heroes.controller";

import { Repository } from "typeorm/repository/Repository";
import { Hero } from "./interfaces/hero.interface";
import { NotHeroException } from "../../common/exceptions/not-hero.exception";
import { HeroDto } from "./interfaces/hero.dto";

let testingModule: TestingModule;
let controller: HeroesController;
let spyService: HeroesService;

describe("Heroes Controller", () => {
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      components: [
        {
          provide: HeroesService,
          useFactory: () => ({
            create: jest.fn(),
            findAll: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = testingModule.get(HeroesController);
    spyService = testingModule.get(HeroesService);
  });

  it("#heroes should call to findAll method of heroes service", () => {
    controller.heroes();

    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it("#create should call to create method of heroes service", () => {
    const heroMocked = { name: "Hero mocked!" } as HeroDto;

    controller.create(heroMocked);

    expect(spyService.create).toHaveBeenCalledTimes(1);
    expect(spyService.create).toHaveBeenCalledWith(heroMocked.name);
  });
});
