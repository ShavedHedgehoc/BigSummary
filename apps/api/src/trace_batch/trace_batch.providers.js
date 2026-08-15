"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traceBatchsProviders = void 0;
const trace_batch_model_1 = __importDefault(require("../trace_models/trace_batch.model"));
exports.traceBatchsProviders = [
    {
        provide: "TRACE_BATCHS_REPOSITORY",
        useValue: trace_batch_model_1.default,
    },
];
//# sourceMappingURL=trace_batch.providers.js.map