import { Module } from '@nestjs/common';
import { FibonacciController } from './fibonacci.controller';
import { FibonacciWorkerHost } from './fibonacci-worker.host';

@Module({
  controllers: [FibonacciController],
  //PRECISAMOS COLCOAR NOSSO HOST NO ARRAY DE PROVIDERS
  providers: [FibonacciWorkerHost],
})
export class FibonacciModule {}
