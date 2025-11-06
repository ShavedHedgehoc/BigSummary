import { $api } from "../http";

//

export default class HealthService {
  static async checkApiHealth(): Promise<any> {
    const res = await $api.get(`/health-check`);
    return res.data;
  }
}
