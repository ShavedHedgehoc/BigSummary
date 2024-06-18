import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import AppModule from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');



  console.log(process.env.POSTGRES_HOST)
  // port: Number(process.env.POSTGRES_PORT),
  // username: process.env.POSTGRES_USERNAME,
  // password: process.env.POSTGRES_PASSWORD,
  // database: process.env.POSTGRES_DB,

  const config = new DocumentBuilder()
    .setTitle("Summary API")
    .setDescription("API for summary list database")
    .setVersion("1.0")
    .addTag("API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/documentation", app, document);

  app.use(cookieParser());
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}

start();
