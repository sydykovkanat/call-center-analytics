import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	app.enableCors({ origin: config.getOrThrow<string>('ALLOWED_ORIGIN') });

	await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}

void bootstrap();
