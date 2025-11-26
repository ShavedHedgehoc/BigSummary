import { $apiTubes } from "../http";

export default class UploadPictureService {
  static async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    await formData.append("file", file);
    await formData.append("filename", "filename.jpg");
    const res = await $apiTubes.post(`/upload/file`, formData);
    return res.data;
  }
}
