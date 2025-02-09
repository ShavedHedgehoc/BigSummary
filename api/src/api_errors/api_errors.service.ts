import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import ApiError from "./api_errors.model";
import { CreateApiErrorDto } from "./dto/create-error.dto";

@Injectable()
export class ApiErrorsService {
  constructor(
    @InjectModel(ApiError)
    private apiErrorsRepository: typeof ApiError
  ) {}
  async create(dto: CreateApiErrorDto) {
    const api_error = await this.apiErrorsRepository.create(dto);
    return api_error;
  }
}
