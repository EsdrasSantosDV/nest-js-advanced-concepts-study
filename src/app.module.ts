import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { DataSourceModule } from './data-source/data-source.module';
import { UsersModule } from './users/users.module';
import { ContextIdFactory } from '@nestjs/core';
import { AggregateByTenantContentIdStrategy } from './core/aggregate-by-tenant.strategy';
//PRECISMAOS COLOCAR A ESTRATÉGIA DE AGREGAÇÃO NO CONTEXTO
ContextIdFactory.apply(new AggregateByTenantContentIdStrategy());
@Module({
  imports: [
    CoffeesModule,
    CronModule,
    FibonacciModule,
    DataSourceModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
