import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
// import cookieParser from 'cookie-parser';
import * as bodyParser from "body-parser";
import { RequestHandler } from 'express';
import AppModule from "./app.module";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { TraceBatchModule } from "./v1/trace_batch/trace_batch.module";
import { TraceWeightingsModule } from "./v1/trace_weightings/trace_weightings.module";
import { TraceLoadsModule } from "./v1/trace_loads/trace_loads.module";
import { TraceTechnologyModule } from "./v1/trace_technology/trace_technology.module";
import { TraceInventoryDocsModule } from "./v1/trace_inventory_docs/trace_inventory_docs.module";
import { TraceInventoryRowsModule } from "./v1/trace_inventory_rows/trace_inventory_rows.module";
import { TraceTrademarksModule } from "./v1/trace_trademarks/trace_trademarks.module";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { logger: ["error"] });
  // app.enableCors({
  //   allowedHeaders: ["content-type", "origin"],
  //   origin: "http://192.168.250.237:8081",
  //   credentials: true,
  // });
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
    include: [
      TraceBatchModule,
      TraceWeightingsModule,
      TraceLoadsModule,
      TraceTechnologyModule,
      TraceInventoryDocsModule,
      TraceInventoryRowsModule,
      TraceTrademarksModule,
    ],
  });
  SwaggerModule.setup("/api/documentation/trace", app, traceFactory);

  // app.use((cookieParser as any)());
  app.use((cookieParser as unknown as () => RequestHandler)());
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}

start();
