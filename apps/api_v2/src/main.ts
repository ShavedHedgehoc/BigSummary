import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const PORT = process.env.API_PORT || 7000;
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  // app.enableCors({
  //   origin: 'http://localhost:3000', // Строго адрес вашего фронтенда, никаких '*'!
  //   credentials: true, // Разрешает принимать куки от клиента
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // });
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
