import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const PORT = config.get<string>('PORT');

  app.useGlobalPipes(new ValidationPipe({}));

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, PATCH',
  });
  await app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port`);
  });
}
bootstrap();
