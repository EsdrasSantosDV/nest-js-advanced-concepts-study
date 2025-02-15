import { Inject, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { COFFE_DATA_SOURCE } from './coffees.module';


export interface CoffeesDataSource {
  [index: number]: Coffee;
}

@Injectable()
export class CoffeesService {
  //TYPESCRIPT NÃO DEIXA NENHUM METADADO SOBRE INTERFFACES
  //TODA INTERFACE E REPRESADA COMO UM OBJETO QUANDO FOR TRASNPILAR
  //POR ISSO QUE NAO DA PRA USAR INTERFACES COMO PROVIDERS TOKEN
  //vamos injetar no nosso serviço o CoffeesDataSource
  constructor(@Inject(COFFE_DATA_SOURCE) dataSource: CoffeesDataSource
  ) {}
  create(createCoffeeDto: CreateCoffeeDto) {
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
