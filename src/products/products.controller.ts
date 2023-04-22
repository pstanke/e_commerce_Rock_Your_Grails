import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  public async getAll(): Promise<Product[]> {
    const products = await this.productsService.getAll();
    return products;
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
