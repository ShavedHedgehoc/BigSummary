import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule, { logger: ["error"] });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.setGlobalPrefix("api_tubes");

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Tubes production API")
    .setDescription("Производство алюминиевых туб")
    .setVersion("0.1")
    .addTag("API")
    .build();

  const swaggerFactory = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("/api/swagger", app, swaggerFactory);

  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap();
