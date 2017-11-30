import { Roles } from "./roles.decorator";
import { Reflector } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

let injector: TestingModule;
let reflector: Reflector;

describe("Roles Decorator", () => {
    beforeEach(async () => {
        injector = await Test.createTestingModule({}).compile();

        reflector = injector.get(Reflector);
    });

    it("should generate reflection metadata", () => {
        const target = {test() {} };

        Roles("test")(target);
        
        expect(reflector.get<string[]>("roles", target)).toEqual(["test"]);
    });
});
