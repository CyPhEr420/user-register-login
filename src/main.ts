import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// Does not use Any kind of token to change the password. i mean i could implement with a little learning but i am soooooo tired now pathu sai bro.

// It works perfectly fine.
