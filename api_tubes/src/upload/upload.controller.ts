import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { diskStorage } from "multer";

const editFileName = (req, file, callback) => {
  //   const name = file.originalname.split(".")[0];
  //   const fileExtName = extname(file.originalname);
  //   const randomName = Array(32)
  //     .fill(null)
  //     .map(() => Math.round(Math.random() * 16))
  //     .join("");
  // You can use just the original name, but adding a timestamp or random string
  // is often safer to prevent overwriting existing files with the same name.
  //   callback(null, `${name}-${randomName}${fileExtName}`);
  callback(null, file.originalname);
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    // If the file extension is not valid, reject the file
    return callback(new BadRequestException("Only image files are allowed!"), false);
  }
  // Accept the file
  callback(null, true);
};

@Controller("upload")
export class UploadController {
  @Post("file")
  //   @UseInterceptors(
  //     FileInterceptor("file", {
  //       dest: "./uploads", // Files will be saved to the 'uploads' directory inside the container
  //     })
  //   )
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/images", // The mounted volume path inside the container
        filename: editFileName, // Use the custom filename function
      }),
      fileFilter: imageFileFilter,
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: "File uploaded successfully",
      filename: file.filename,
      path: file.path,
    };
  }
}
