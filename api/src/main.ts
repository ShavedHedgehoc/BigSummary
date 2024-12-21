import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import AppModule from "./app.module";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { TraceBatchModule } from "./trace_batch/trace_batch.module";
import { TraceWeightingsModule } from "./trace_weightings/trace_weightings.module";
import { TraceLoadsModule } from "./trace_loads/trace_loads.module";
import { TraceTechnologyModule } from "./trace_technology/trace_technology.module";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { logger: ["error"] });
  app.setGlobalPrefix("api");

  const mainOption = new DocumentBuilder()
    .setTitle("Summary API")
    .setDescription("API for summary list database")
    .setVersion("1.0")
    .addTag("API")
    .build();
  const mainFactory = SwaggerModule.createDocument(app, mainOption);
  SwaggerModule.setup("/api/documentation/main", app, mainFactory);

  const traceOption = new DocumentBuilder()
    .setTitle("Trace API")
    .setDescription("API for trace database")
    .setVersion("1.0")
    .addTag("Trace API")
    .build();

  const traceFactory = SwaggerModule.createDocument(app, traceOption, {
    include: [TraceBatchModule, TraceWeightingsModule, TraceLoadsModule, TraceTechnologyModule],
  });
  SwaggerModule.setup("/api/documentation/trace", app, traceFactory);

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}

start();
