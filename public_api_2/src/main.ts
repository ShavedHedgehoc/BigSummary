import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  const mainOption = new DocumentBuilder()
    .setTitle('Public API')
    .setDescription('API for summary list database')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const mainFactory = SwaggerModule.createDocument(app, mainOption);
  SwaggerModule.setup('/documentation', app, mainFactory);

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap();
