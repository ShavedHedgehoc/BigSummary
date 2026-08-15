"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeByBarcodeSchema = void 0;
const zod_1 = require("zod");
exports.getEmployeeByBarcodeSchema = zod_1.z.object({
    barcode: zod_1.z.string().default(''),
});
//# sourceMappingURL=inputs.js.map