import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app=await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const config=new DocumentBuilder()
    .addBearerAuth()
    .setTitle('example')
    .setDescription('description')
    .setVersion('1.0')
    .addTag('car')
    .build()
  const document=SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  const port=process.env.PORT ||3003
  await app.listen(port);
}

bootstrap();
