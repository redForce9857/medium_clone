import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userResponseInterface } from './types/usertype.interface';
import { LoginDto } from './dto/login-user.dto';
import { Request } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/registration')
  @UsePipes(new ValidationPipe())
  async create(@Body('user') createUserDto: CreateUserDto): Promise<userResponseInterface>{
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponseAperance(user)
  }

  @Post('user/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginDto : LoginDto ): Promise<userResponseInterface>{
    const loginUser = await this.userService.login(loginDto);
    return this.userService.buildUserResponseAperance(loginUser)
  }

  @Get('user')
  async currentUser(@Req() request: Request):Promise<userResponseInterface>{
    return 'currentUser' as any
    
  }
}
