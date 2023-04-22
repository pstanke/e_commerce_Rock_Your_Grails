import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  public create(@Body() registrationData: RegisterDTO) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    res.cookie('auth', tokens, { httpOnly: true });
    res.send(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Delete('/logout')
  public async logout(@Response() res) {
    res.clearCookie('auth', { httpOnly: true });
    res.send({
      message: 'success',
    });
  }
}
