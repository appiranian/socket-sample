import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsGateway } from './coins/coins.module';

@Module({
  imports: [CoinsGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
