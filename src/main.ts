import { Seeder } from './seeders/seeders';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);
  try {
    const config = app.get('ConfigService');
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      allowedHeaders: 'Content-Type, Accept',
      methods: 'GET,PUT,POST,DELETE',
      origin: '*',
    });
    const seeder = app.get(Seeder);

    seeder
      .seed()
      .then(() => logger.debug('Seeding complete!'))
      .catch((err) => {
        logger.error('Seeding failed');
        throw err;
      });
    await app.listen(config.get('app.port'));
  } catch (err) {
    logger.error(err);
  }
}
bootstrap();
