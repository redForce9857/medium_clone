import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import {sign} from 'jsonwebtoken';
import { JWT_KEY } from 'src/jwttokenkey';
import { userResponseInterface } from './types/usertype.interface';
import { LoginDto } from './dto/login-user.dto';
import {compare} from 'bcrypt';

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
    if(!userValidation){
      throw new HttpException('Email or username are taken', 422)
    }

    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<UserEntity>{
    const user =  await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      }
    })

    if (!user) {
      throw new HttpException("user is not found", HttpStatus.NOT_FOUND)
    }
    const truePass = await compare(loginDto.password, user.password)
    if (!truePass) {
      throw new HttpException("password is not correct", HttpStatus.NOT_FOUND)
    }
    delete user.password
    
    return user
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
