import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userResponseInterface } from './types/usertype.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @UsePipes(new ValidationPipe())
  async create(@Body('user') createUserDto: CreateUserDto): Promise<userResponseInterface>{
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponseAperance(user)
  }
}
