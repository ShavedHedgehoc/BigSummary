import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import express from 'express';

async function bootstrap() {
  const PORT = process.env.PUBLIC_API_PORT || 8000;
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  const mainOption = new DocumentBuilder()
    .setTitle('Public API')
    .setDescription('API for summary list database')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const mainFactory = SwaggerModule.createDocument(app, mainOption);
  SwaggerModule.setup('/documentation', app, cleanupOpenApiDoc(mainFactory));

  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
