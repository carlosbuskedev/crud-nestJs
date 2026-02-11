import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const db = app.get(DataSource)
    await app.listen(process.env.PORT ?? 3000);
    console.log(db.isInitialized)
    console.log("conectado no banco de dados e servidor na porta 3000")
}
bootstrap();
