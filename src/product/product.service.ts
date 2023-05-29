import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/types/product";
import * as fs from "fs";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product") private productModel: Model<Product>
  ) {
  }


  async create(productDTO: CreateProductDTO, image: Express.Multer.File) {
    productDTO.image = image.filename;
    return await this.productModel.create(productDTO);
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findOne(id: string) {
    return await this.productModel.findOne({ _id: id });
  }

  async update(
    id: string,
    productDTO: UpdateProductDTO,
    image: Express.Multer.File
  ) {
    const product = await this.productModel.findOne({ _id: id });
    if (image) {
      fs.unlink(`${__dirname}/../../files/${product.image}`, async (error) => {
        if (!error) {
          throw new HttpException("File not be found", HttpStatus.NOT_FOUND);
        }
        productDTO.image = image.filename;
        return await product.updateOne(productDTO);
      });
    }
    return await product.updateOne(productDTO)
    // return await this.productModel.findOneAndUpdate({ _id: id }, productDTO);
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}
