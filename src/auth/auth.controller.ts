import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from "../dto/register-dto";
import { LoginDTO } from "../dto/login-dto";
import { UserService } from "../shared/user.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    return await this.userService.create(userDTO);
  }
  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    return await this.userService.findByLogin(userDTO);
  }
}
