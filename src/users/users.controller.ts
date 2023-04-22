import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  public async getAll(): Promise<User[]> {
    const users = await this.usersService.getAll();
    return users;
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @Delete('/:id')
  // @UseGuards(AdminAuthGuard)
  // @UseGuards(JwtAuthGuard)
  // public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
  //   if (!(await this.usersService.getById(id))) {
  //     throw new NotFoundException('User not found');
  //   }
  //   const user = await this.usersService.deleteById(id);
  //   return user;
  // }
}
