import { ApiProperty } from "@nestjs/swagger";
export class PrintZplDto {
  @ApiProperty({ example: "192.168.250.95", description: "IP" })
  readonly ip: string;
  @ApiProperty({ example: 9100, description: "Port" })
  readonly port: number;
  @ApiProperty({
    example: "^XA^CI28^FO20,20 ^FB700,3,,L^A0N,50,50^FDZPL Print success!!!^FS^PQ1^XZ",
    description: "ZPL",
  })
  readonly zpl: string;
}
