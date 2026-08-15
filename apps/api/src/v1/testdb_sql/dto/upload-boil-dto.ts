export interface Row {
  productid: string;
  productname: string;
  quantity: string;
}

export interface Attributes {
  apparatus: string;
  batch: string;
  date: string;
  fin_productid: string;
  marking: string;
  plan: string;
  plant: string;
}

export interface BatchRecord {
  _attributes: Attributes;
  row: Row[];
}

interface Document {
  batch_record: BatchRecord;
}

export class UploadBoilDto {
  readonly document: Document;
}
