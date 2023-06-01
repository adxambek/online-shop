import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editedFileName } from "src/utilities/file-helper";
import { AuthGuard } from "@nestjs/passport";
import { QueryProductDTO } from "./dto/query-product-dto";

@ApiTags("Product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files",
        filename: editedFileName
      })
    })
  )
  async create(
    @Body() productDTO: CreateProductDTO,
    @UploadedFile() image: Express.Multer.File
  ) {
    return await this.productService.create(productDTO, image);
  }

  @Get()
  async findAll(@Query() query: QueryProductDTO) {
    return await this.productService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.productService.findOne(id);
  }

  @Put(":id")
  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files",
        filename: editedFileName
      })
    })
  )
  async update(
    @Param("id") id: string,
    @Body() productDTO: UpdateProductDTO,
    @UploadedFile() image: Express.Multer.File
  ) {
    return await this.productService.update(id, productDTO, image);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: string) {
    return await this.productService.remove(id);
  }
}