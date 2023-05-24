import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Simple online shop')
  .setDescription('This project is learning ')
  .build();

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();