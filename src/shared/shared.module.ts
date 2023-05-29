import { HttpException, Module } from "@nestjs/common";
import { UserService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../models/user.schema";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema
    }])
  ],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpException
    }
  ],
  exports: [
    UserService
  ]
})
export class SharedModule {}
