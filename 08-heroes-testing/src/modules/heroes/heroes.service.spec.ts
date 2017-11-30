import { Test } from "@nestjs/testing";
import { HeroesService } from "./heroes.service";
import { TestingModule } from "@nestjs/testing/testing-module";
import { Repository } from "typeorm/repository/Repository";
import { Hero } from "./interfaces/hero.interface";
import { NotHeroException } from "../../common/exceptions/not-hero.exception";

let testingModule: TestingModule;
let service: HeroesService;
let spyRepository: Repository<Hero>;

describe("Heroes Service", () => {
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      components: [
        HeroesService,
        {
          provide: "HeroesRepositoryToken",
          useFactory: () => ({
            find: jest.fn(),
            findOneById: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    service = testingModule.get(HeroesService);
    spyRepository = testingModule.get("HeroesRepositoryToken");
  });

  it("#findAll should find all heroes", () => {
    service.findAll();

    expect(spyRepository.find).toHaveBeenCalledTimes(1);
  });

  describe("#findById", () => {
    it("should return an exception if no hero was found", async () => {
      spyRepository.findOneById = jest.fn();

      await expect(service.findById(1)).rejects.toBeInstanceOf(NotHeroException);
    });

    it("should not return an exception if a hero was found", () => {
      service.findById(1);

      expect(spyRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(spyRepository.findOneById).toHaveBeenCalledWith(1);
    });
  });
  
});
