import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagEntity } from './entities/tags.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll(): Promise<{boobs: string[]}> {
    const tags = await this.tagsService.findAll();
    return {
      boobs: tags.map((e) => e.name),
    }
  }
}
