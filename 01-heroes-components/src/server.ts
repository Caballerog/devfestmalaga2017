import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.use(cors());
	app.use(bodyParser.json());
	await app.listen(3000);
}
bootstrap();
