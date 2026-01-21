import {
  Batch,
  Conveyor,
  Employee,
  ExtrusionStatus,
  OffsetStatus,
  Product,
  SealantStatus,
  Summary,
  VarnishStatus,
} from "./../../generated/prisma/index.d";

type IState = "idle" | "working" | "finished";
export interface IPostData {
  production: number | null;
  state: IState;
  employee: string | null;
}

export interface IMappedSummary {
  id: number;
  product_id: number | null;
  product_code: string | null;
  product_name: string | null;
  batch_id: number | null;
  batch_name: string | null;
  plan: number;

  // isActive: boolean;
  // isFinished: boolean;

  extrusion: IPostData | null;
  varnish: IPostData | null;
  offset: IPostData | null;
  sealant: IPostData | null;
}

export interface IMappedConveyor {
  id: number;
  name: string;
  summary: IMappedSummary | null;
}

export const mappedConveyors = ({
  conveyor,
  summary,
  product,
  batch,
  extrusion_status,
  extrusion_employee,
  varnish_status,
  varnish_employee,
  offset_status,
  offset_employee,
  sealant_status,
  sealant_employee,
}: {
  conveyor: Conveyor;
  summary: Summary | null;
  product: Product | null;
  batch: Batch | null;
  extrusion_status: ExtrusionStatus | null;
  extrusion_employee: Employee | null;
  varnish_status: VarnishStatus | null;
  varnish_employee: Employee | null;
  offset_status: OffsetStatus | null;
  offset_employee: Employee | null;
  sealant_status: SealantStatus | null;
  sealant_employee: Employee | null;
}): IMappedConveyor => {
  const mappedExtrusionStatus: IPostData | null = extrusion_status
    ? {
        employee: extrusion_employee ? extrusion_employee.name : null,
        production: extrusion_status.counter_value,
        state: extrusion_status.finished === true ? "finished" : extrusion_status.idle === true ? "idle" : "working",
      }
    : null;
  const mappedVarnishStatus: IPostData | null = varnish_status
    ? {
        employee: varnish_employee ? varnish_employee.name : null,
        production: varnish_status.counter_value,
        state: varnish_status.finished === true ? "finished" : varnish_status.idle === true ? "idle" : "working",
      }
    : null;
  const mappedOffsetStatus: IPostData | null = offset_status
    ? {
        employee: offset_employee ? offset_employee.name : null,
        production: offset_status.counter_value,
        state: offset_status.finished === true ? "finished" : offset_status.idle === true ? "idle" : "working",
      }
    : null;
  const mappedSealantStatus: IPostData | null = sealant_status
    ? {
        employee: sealant_employee ? sealant_employee.name : null,
        production: sealant_status.counter_value,
        state: sealant_status.finished === true ? "finished" : sealant_status.idle === true ? "idle" : "working",
      }
    : null;

  const mapped_summary: IMappedSummary | null = summary
    ? {
        id: summary.id,
        product_id: product ? product.id : null,
        product_code: product ? product.code : null,
        product_name: product ? product.name : null,
        plan: summary.plan,
        batch_id: batch ? batch.id : null,
        batch_name: batch ? batch.name : null,
        extrusion: mappedExtrusionStatus,
        varnish: mappedVarnishStatus,
        offset: mappedOffsetStatus,
        sealant: mappedSealantStatus,
      }
    : null;

  return {
    id: conveyor.id,
    name: conveyor.name,
    summary: mapped_summary,
  };
};
