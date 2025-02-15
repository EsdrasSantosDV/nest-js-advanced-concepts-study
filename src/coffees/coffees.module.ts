import { Module } from '@nestjs/common';
import {  CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';

//COM ISSO TIVEMOS DEPENDENCIA CIRCULAR
export const COFFE_DATA_SOURCE=Symbol('COFFE_DATA_SOURCE');

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
