import { BadRequestException, Injectable } from '@nestjs/common';
import { Order, OrderedProduct } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        orderedProducts: {
          include: {
            product: {
              include: {
                photos: {
                  where: {
                    type: 'RIGHT',
                  },
                },
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
        orderedProducts: {
          include: {
            product: {
              include: {
                photos: {
                  where: {
                    type: 'RIGHT',
                  },
                },
              },
            },
          },
        },
        user: true,
      },
    });
  }

  public async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> & {
      orderedProducts: Omit<OrderedProduct, 'id' | 'orderId'>[];
    },
  ): Promise<Order> {
    const { orderedProducts, userId, address } = orderData;
    try {
      const createdOrder = await this.prismaService.order.create({
        data: {
          orderedProducts: {
            create: orderedProducts,
          },
          user: {
            connect: { id: userId },
          },
          address,
        },
        include: {
          orderedProducts: {
            include: {
              product: {
                include: {
                  photos: {
                    where: {
                      type: 'RIGHT',
                    },
                  },
                },
              },
            },
          },
          user: true,
        },
      });
      return createdOrder;
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }
}
