import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptor/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Testimonial')
    .setDescription('The Testimonial API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documents = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documents);

  app.useGlobalInterceptors(new LoggerInterceptor());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
