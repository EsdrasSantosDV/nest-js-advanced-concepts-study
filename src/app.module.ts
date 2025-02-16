import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';

@Module({
  imports: [CoffeesModule, CronModule, FibonacciModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
