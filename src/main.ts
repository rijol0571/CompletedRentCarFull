import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { lookupService } from 'dns/promises';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
import { runInThisContext } from 'vm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app=await NestFactory.create(AppModule)
  const config=new DocumentBuilder()
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
