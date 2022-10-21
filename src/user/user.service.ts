import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import {sign} from 'jsonwebtoken';
import { JWT_KEY } from 'src/jwttokenkey';
import { userResponseInterface } from './types/usertype.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) 
    private userRepository: Repository<UserEntity>){}


  async create(createUserDto: CreateUserDto):Promise<UserEntity> {
    const userValidation = await this.userRepository.find({
      where:{
        email: createUserDto.email,
        username: createUserDto.username,
      }
    })
    if(userValidation){
      throw new HttpException('Email or username are taken', 422)
    }

    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);
  }

  buildUserResponseAperance(user: UserEntity):userResponseInterface{
    return {
      user:{
      ...user,
      token: this.generateToken(user)
    },
  }
  }

  generateToken(user: UserEntity):string{
    return sign({
      id: user.id,
      username: user.username,
      email: user.email
    }, JWT_KEY)
  }
}
