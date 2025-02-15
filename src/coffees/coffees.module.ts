import { Module } from '@nestjs/common';
import { COFFE_DATA_SOURCE, CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';

//AI FUNCIONA, MAAS SE TIVER NAQUELE ARQUIVO O PROVIDER
@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFE_DATA_SOURCE,
      useValue: [],
  }],
})
export class CoffeesModule {}
