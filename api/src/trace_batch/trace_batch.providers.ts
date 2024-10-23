import TraceBatch from "../trace_models/trace_batch.model";

export const traceBatchsProviders = [
  {
    provide: "TRACE_BATCHS_REPOSITORY",
    useValue: TraceBatch,
  },
];
