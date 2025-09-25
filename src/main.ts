import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CORS FIX START ---
  // This tells the browser to allow requests from any origin (*).
  // For production, you should replace '*' with the specific URL of your frontend.
  app.enableCors({
    origin: '*', // Allows requests from any frontend origin (like localhost:3001)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // --- CORS FIX END ---

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
