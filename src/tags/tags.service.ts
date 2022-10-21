import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './entities/tags.entity';


@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity) 
    private tagRepository: Repository<TagEntity>
    ){}

  async findAll():Promise<TagEntity[]> {
    return await this.tagRepository.find()
  }
}
