import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
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
  SwaggerModule.setup("/api_tubes/swagger", app, swaggerFactory);

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap();
