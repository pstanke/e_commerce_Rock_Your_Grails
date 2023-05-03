import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderedProductDTO } from './dtos/create-ordered-product.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  /* for admin panel  

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        orderProducts: {
          include: {
            product: {
              include: {
                photos: true,
              },
            },
          },
        },
        user: true,
      },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        orderProducts: {
          include: {
            product: {
              include: {
                photos: true,
              },
            },
          },
        },
        user: true,
      },
    });
  }
  */

  public async getByUser(userId: Order['userId']): Promise<Order[] | null> {
    return this.prismaService.order.findMany({
      where: { userId },
      include: {
        orderProducts: {
          include: {
            product: {
              include: {
                photos: true,
              },
            },
          },
        },
        user: true,
      },
    });
  }

  public async create(
    orderData: CreateOrderDTO,
    orderedProducts: CreateOrderedProductDTO[],
  ): Promise<Order> {
    const { userId, address, totalPrice } = orderData;

    try {
      const createdOrder = await this.prismaService.order.create({
        data: {
          orderProducts: {
            create: orderedProducts.map((orderProduct) => ({
              quantity: orderProduct.quantity,
              product: {
                connect: {
                  id: orderProduct.productId,
                },
              },
              note: orderProduct.note,
            })),
          },
          user: {
            connect: { id: userId },
          },
          address,
          totalPrice,
        },
        include: {
          orderProducts: {
            include: {
              product: {
                include: {
                  photos: true,
                },
              },
            },
          },
          user: true,
        },
      });

      return createdOrder;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("Product doesn't exist");
      }
      throw error;
    }
  }
}
