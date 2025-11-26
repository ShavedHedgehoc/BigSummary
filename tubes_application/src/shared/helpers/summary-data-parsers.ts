import type { ICounter, IMaterial, IStatus, ISummary } from "../api/services/summary-service";

export function getNoteData(postId: number, data: ISummary | null): { header: string; note: string } {
  const existsHeader = "Примечание главного технолога: ";
  const emptyString = "";
  if (!data) return { header: emptyString, note: emptyString };
  switch (postId) {
    case 1:
      return { header: data.extrusion_note ? existsHeader : "", note: data.extrusion_note ?? "" };
    case 2:
      return { header: data.varnish_note ? existsHeader : "", note: data.varnish_note ?? "" };
    case 3:
      return { header: data.offset_note ? existsHeader : "", note: data.offset_note ?? "" };
    case 4:
      return { header: data.sealant_note ? existsHeader : "", note: data.sealant_note ?? "" };
    default:
      return { header: emptyString, note: emptyString };
  }
}

export function getProductionData(postId: number, data: ISummary | null): number {
  if (!data) return 0;
  switch (postId) {
    case 1:
      return data.extrusionParams ? data.extrusionParams.counter_value : 0;
    case 2:
      return data.varnishParams ? data.varnishParams.counter_value : 0;
    case 3:
      return data.offsetParams ? data.offsetParams.counter_value : 0;
    case 4:
      return data.sealantParams ? data.sealantParams.counter_value : 0;
    default:
      return 0;
  }
}

export function getLastCheckDate(postId: number, data: ISummary | null): Date | undefined {
  if (!data) return undefined;
  switch (postId) {
    case 1:
      return data.extrusionParams ? data.extrusionParams.createdAt : undefined;
    case 2:
      return data.varnishParams ? data.varnishParams.createdAt : undefined;
    case 3:
      return data.offsetParams ? data.offsetParams.createdAt : undefined;
    case 4:
      return data.sealantParams ? data.sealantParams.createdAt : undefined;
    default:
      return undefined;
  }
}

export function getCountersData(postId: number, data: ISummary | null): ICounter[] | [] {
  if (!data) return [];
  switch (postId) {
    case 1:
      return data.extrusionCounters;
    case 2:
      return data.varnishCounters;
    case 3:
      return data.offsetCounters;
    case 4:
      return data.sealantCounters;
    default:
      return [];
  }
}

export function getMaterialsData(postId: number, data: ISummary | null): IMaterial[] | [] {
  if (!data) return [];
  switch (postId) {
    case 1:
      return data.extrusion_materials;
    case 2:
      return data.varnish_materials;
    case 3:
      return data.offset_materials;
    case 4:
      return data.sealant_materials;
    default:
      return [];
  }
}

export function getStatusData(postId: number, data: ISummary | null): IStatus | null {
  if (!data) return null;
  switch (postId) {
    case 1:
      return data.extrusionStatus;
    case 2:
      return null;
    case 3:
      return null;
    case 4:
      return null;
    default:
      return null;
  }
}
