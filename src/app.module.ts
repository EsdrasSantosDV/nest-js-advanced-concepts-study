import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { DataSourceModule } from './data-source/data-source.module';
import { UsersModule } from './users/users.module';
import { ContextIdFactory } from '@nestjs/core';
import { I18nModule } from './i18n/i18n.module';
import { AggregateByLocaleContextIdStrategy } from './core/aggregate-by-locallly.strategy';
//PRECISMAOS COLOCAR A ESTRATÉGIA DE AGREGAÇÃO NO CONTEXTO
ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy());
@Module({
  imports: [
    CoffeesModule,
    CronModule,
    FibonacciModule,
    DataSourceModule,
    UsersModule,
    I18nModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
