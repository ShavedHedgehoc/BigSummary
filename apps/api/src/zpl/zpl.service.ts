import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as net from "node:net";
import { PrintZplDto } from "./print-zpl-dto";

@Injectable()
export class ZplService {
  private socket: net.Socket;
  constructor() {}

  async sendDataToSocket(dto: PrintZplDto) {
    return new Promise((resolve, reject) => {
      this.socket = new net.Socket();
      this.socket.connect(dto.port, dto.ip, () => {
        this.socket.write(dto.zpl, "ascii", () => {
          this.socket.end();
          resolve("");
        });
      });
      this.socket.on("error", (error) => {
        reject(error);
      });
    });
  }

  async printZPLData(dto: PrintZplDto) {
    try {
      await this.sendDataToSocket(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
