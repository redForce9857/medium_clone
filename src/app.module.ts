import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { TagsModule } from './tags/tags.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),TagsModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
