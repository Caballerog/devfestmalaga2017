# HeroesTour - Angular 5 + NestJS (Tutorial)
HeroesTour built with Angular Cli on Nestjs with TypeORM + Postgres.

This repo is a demo for the GDG DevFest at Málaga. 

## Assumptions
- angular cli (project generated with version 1.5.0)
- yarn (dependency management)
- angular 5.0+ (new service worker)
- NestJS 4.3+

## Presentation
You can get the [presentation from this link](./99-heroes-presentation/) which is built using reveal.js.

## Topics
- [HeroTour (Angular)](./98-tour-heroes).
- [Controllers](./00-heroes-controllers).
- [Components](./01-heroes-components).
- [Modules](./02-heroes-modules).
- [Middlewares](./03-heroes-middlewares).
- [Exceptions](./04-heroes-exceptions).
- [Pipes](./05-heroes-pipes).
- [Guards](./06-heroes-guards).
- [TypeORM](./07-heroes-typeorm).
- [Testing](./08-heroes-testing).

## Useful Commands
- In the folder 09-tour-heroes run the following command:
  - `ng serve` - Run in frontend development mode on port 4200.
- In each folder 00-heroes-XXX run the following command:
  - `npm run start:watch` - Runs server on port 3000 via ts-node, assumes no frontend changes.
- In 08-heroes-XX run the following commands:
  - `npm run test:watch` - Runs test using jest.
  - `npm run e2e` - Runs End to End test using supertest.
  

## To Do List
- Swagger
- CQRS