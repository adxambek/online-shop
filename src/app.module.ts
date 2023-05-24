import { Module } from "@nestjs/common";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //database ga ulanish uchun kerakli modul ekan ConfigModule
    MongooseModule.forRoot(process.env.MONGODB_URL),
    SharedModule,
    AuthModule,
    ProductModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}