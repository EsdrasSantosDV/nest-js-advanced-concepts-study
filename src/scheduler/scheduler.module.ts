import { Module } from '@nestjs/common';
import { IntervalScheduler } from './interval.scheduler/interval.scheduler';
import { DiscoveryModule } from '@nestjs/core';

//Temos esse modulo que seria o modulo responsavel pro descobrri se um determinado provider tem alguns parametros que precisam ser injetados
@Module({
  providers: [IntervalScheduler],
  exports: [],
  imports: [DiscoveryModule],
})
export class SchedulerModule {}
