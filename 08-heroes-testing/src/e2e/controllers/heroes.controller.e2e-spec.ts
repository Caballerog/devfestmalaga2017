import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { Test } from "@nestjs/testing";

import { HeroesModule } from "../../modules/heroes/heroes.module";
import { createConnection, Connection } from "typeorm";
import { INestApplication } from "@nestjs/common/interfaces";
import { RolesGuard } from "../../common/guards/roles.guard";
import { HeroDto } from "../../modules/heroes/interfaces/hero.dto";

let agent: request.SuperTest<request.Test>;
let db: Connection;
let app: INestApplication;

describe("Heroes Controller", () => {
  beforeAll(async () => {
    db = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "toor",
      database: "heroes",
      entities: [`${process.cwd()}/src/**/*entity.{ts,js}`],
      synchronize: true,
    });
  });

  const server = express();
  server.use(bodyParser.json());

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      modules: [HeroesModule],
    }).overrideComponent("DbConnectionToken")
      .useValue(db)
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = testingModule.createNestApplication(server);
    agent = request(server);

    await app.init();
  });

  it("/GET heroes should return an array of heroes", () => {
    return agent
      .get("/heroes")
      .expect(200)
      .expect(({ body: heroes }) => {
        expect(heroes).toBeInstanceOf(Array);
      });
  });

  it("/GET heroes/:id should return a hero", () => {
    return agent
      .get("/heroes/5")
      .expect(200)
      .expect(({ body: hero }) => {
        expect(hero).not.toBeInstanceOf(Array);
      });
  });

  it("/GET heroes/search/:name should return an hero searched by name", () => {
    const heroName = "Tornado";
    return agent
      .get(`/heroes/search/${heroName}`)
      .expect(200)
      .expect(({ body: hero }: { body: HeroDto }) => {
        expect(hero).toEqual(heroName);
      });
  });
});
