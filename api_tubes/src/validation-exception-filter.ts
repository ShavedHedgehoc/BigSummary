import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from "@nestjs/common";
import { Request, Response } from "express"; // or use the appropriate platform types

@Catch(BadRequestException) // Catches only BadRequestExceptions
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // You can process the raw error response here, e.g., errorResponse['message']
    const customResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // Customize the error structure
      errors: errorResponse["message"] || [errorResponse],
      message: errorResponse["message"] ? errorResponse["message"][0] : "Ошибка валидации",
    };

    response.status(status).json(customResponse);
  }
}
