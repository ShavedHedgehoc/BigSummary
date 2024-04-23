import { NestFactory } from "@nestjs/core";
import AppModule from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Summary API")
    .setDescription("API for summary list database")
    .setVersion("1.0")
    .addTag("API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/documentation", app, document);

  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}

start();
