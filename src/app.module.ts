import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../db/ormconfig';
import { TagsModule } from './tags/tags.module';
import { AuthMidleWare } from './user/midlewares/auth.midleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),TagsModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMidleWare)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
