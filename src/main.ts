import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enhanced CORS configuration
  app.enableCors({
    origin: [
      FRONTEND_URL, // Your production frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'Access-Control-Allow-Origin',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
