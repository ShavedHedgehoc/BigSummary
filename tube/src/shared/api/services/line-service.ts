import axios from "axios";

export interface ILine {
  id: string;
  value: string;
  description: string;
}

export default class LineService {
  static async getLineByDescription(line_description: string | null): Promise<ILine> {
    const res = await axios.get(`/api/lines?description=${line_description}`);
    return res.data;
  }
}
