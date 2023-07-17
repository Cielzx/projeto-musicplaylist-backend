import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Validator } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Music Playlist app')
    .setDescription('Listen to your musics')
    .setVersion('0.0.1')
    .addTag('Users')
    .addBearerAuth()
    .addTag('Musics')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
    new ValidationPipe({
      transform: true,
      transformOptions: {
        groups: ['transform'],
      },
    }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
