import { Controller, Get, Query } from '@nestjs/common';
import { FibonacciWorkerHost } from './fibonacci-worker.host';

@Controller('fibonacci')
export class FibonacciController {
  constructor(private readonly fibonannaciWorkerHost: FibonacciWorkerHost) {}
  @Get()
  fibonacci(@Query('n') n = 10) {
    return this.fibonannaciWorkerHost.run(n);
  }
}
