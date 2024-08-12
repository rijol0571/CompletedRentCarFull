import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';


async function bootstrap() {
  const app=await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const config=new DocumentBuilder()
    .addBearerAuth()
    .setTitle('RentCar')
    .setDescription(`If there are problems, Contact with me: @jumadullayevrustam85@gmail.com`)
    .setVersion('1.0')
    .addTag('RentCar')
    .build()
  const document=SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  const port=process.env.PORT ||3010
  await app.listen(port, ()=>{
    console.log('Every thing is good on', port);
    
  });
}
bootstrap();
