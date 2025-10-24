import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  app.setGlobalPrefix('api');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Tubes production API')
    .setDescription('Производство алюминиевых туб')
    .setVersion('0.1')
    .build();

  const swaggerFactory = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/swagger', app, swaggerFactory);

  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap();
