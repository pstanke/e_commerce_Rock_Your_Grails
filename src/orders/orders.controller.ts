import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Order } from '@prisma/client';

import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderedProductDTO } from './dtos/create-ordered-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  /* for admin panel  

  @Get('/')
  public getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  */

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  public async getByUser(@Param('id', new ParseUUIDPipe()) userId: string) {
    const orders = await this.ordersService.getByUser(userId);
    if (!orders) {
      throw new NotFoundException('Orders not found');
    }
    return orders;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(
    @Body()
    requestBody: {
      orderData: CreateOrderDTO;
      orderedProducts: CreateOrderedProductDTO[];
    },
  ): Promise<Order> {
    const { orderData, orderedProducts } = requestBody;
    return await this.ordersService.create(orderData, orderedProducts);
  }
}
