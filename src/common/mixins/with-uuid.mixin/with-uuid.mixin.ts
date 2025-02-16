import { Type } from '@nestjs/common';
import { randomUUID } from 'crypto';

/*
Junto com as hierarquias tradicionais orientadas a objetos,
outra maneira popular de construir classes a partir de componentes reutilizáves e criá-las combinando classes
parciais mais simples.

Isso é conhecido como padrão Mixin .

Mixins fornecem uma forma de reutilização de código que é baseada em comportamento de composição .
 A flexibilidade obtida com o uso de mixins se torna aparente quando você começa a compô-los.
  Uma classe pode incluir quantos mixins você quiser, ao contrário da herança (que só pode herdar de 1 classe).
 */
export function WithUuid<TBase extends Type>(Base: TBase) {
  return class extends Base {
    uuid = randomUUID();

    regenerateUuid() {
      this.uuid = randomUUID();
    }
  };
}

export function WithTimestamp<TBase extends Type>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();

    regenerateTimestamp() {
      this.timestamp = Date.now();
    }
  };
}

export class Coffee {
  constructor(public name: string) {}
}

const CoffeeWithUuidCls = WithUuid(Coffee); // 👈 use the new WithUuid mixin
const CoffeeWithTimestampCls = WithTimestamp(CoffeeWithUuidCls); // 👈 use the new WithTimestamp mixin

const coffee = new CoffeeWithTimestampCls('Buddy Brew');
//PODEMOS COMPOR VARIOS MIXXIN
