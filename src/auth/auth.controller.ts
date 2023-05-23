import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from "../dto/register-dto";
import { LoginDTO } from "../dto/login-dto";
import { UserService } from "../shared/user.service";
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    const payload ={
      username: user.username
    }
    const token = await this.authService.signPayload(payload);

    return{ user, token };
  }
  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  async check(){
    return 'authorized';
  }
  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);

    const payload ={
      username: user.username
    }
    const token = await this.authService.signPayload(payload);
    return { user , token };
  }
}
