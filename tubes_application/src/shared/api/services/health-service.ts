import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export default class HealthService {
  static async checkApiHealth(): Promise<any> {
    const res = await $api.get(ApiRoutes.HEALTH_CHECK);
    return res.data;
  }
}
