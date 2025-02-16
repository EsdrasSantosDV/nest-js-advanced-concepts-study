import { Inject, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { LazyModuleLoader } from '@nestjs/core';

//COM ISSO TIVEMOS DEPENDENCIA CIRCULAR
export const COFFE_DATA_SOURCE = Symbol('COFFE_DATA_SOURCE');

export interface CoffeesDataSource {
  [index: number]: Coffee;
}

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(COFFE_DATA_SOURCE) dataSource: CoffeesDataSource,
    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {}
  async create(createCoffeeDto: CreateCoffeeDto) {
    console.time(); // 👈
    //USAMOS O LAZY LOADER PARA CARREGAR O MODULO DE REWARDS
    //DE FORMA LENTA
    //ISSO E UTIL PRA EVITAR QQUE INJETAMOS OS MDOULOS JA NO ROOT DA APLICAÇÃO DIRETO
    //PRA DEIXAR O TEMPO DE INICIALIZAÇÃO MAIS RAPIDO
    // O QUE ISSO AOCNTECE, NA PRIMEIRA SOLICATACAO PRA ESSE ENDPOINT, ELE VAI CARREGAR O MODULO E A LISTA DE PROVEDERS
    // e depois ele vai CACHEAR ISSO, E NAO VAI CARREGAR NOVAMENTE
    //SE PODE VER AGORA QUE O TEMPO DE INICIALIZAÇÃO DO APP DIMINUIU
    // E CARREGOU O MODULO DE FORMA DINAMICA
    const rewardsModuleRef = await this.lazyModuleLoader.load(() =>
      import('../rewards/rewards.module').then((m) => m.RewardsModule),
    ); //ELE TA PEGANDO A LISTA DE PROVIDERFS,,  E A REFERENCIA
    const { RewardsService } = await import(
      '../rewards/rewards/rewards.service'
    ); //TO PEGANDO O PROVIDER CORRESPONDENTE
    const rewardsService = rewardsModuleRef.get(RewardsService);
    console.timeEnd(); // 👈
    rewardsService.grantTo();
    return 'This action adds a new coffee';
  }

  findAll() {
    return `This action returns all coffees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffee`;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffee`;
  }
}
