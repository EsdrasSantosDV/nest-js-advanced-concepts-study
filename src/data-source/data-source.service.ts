import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

//o nest por padrão e singleton
//mas podemos mudar o escopo do nosso service
//pra request, e cada solicitação fica com uma instancia diferente
//e isso pode ser util em alguns casos
// MAS LEMBRA QUE A LATENCIA PODE AUMENTAR
//SO QUE EXISTE A DIFERENÇA DE REQUEST SCOPE PROVIDERS E DURABLE PROVIDERS
//PQ A GENTE CONSEGUE DETERMINAR A DURABILIDADE DO NOSSO PROVIDER

@Injectable({
  scope: Scope.REQUEST,
  durable: true, //COM ESSA PROPS
})
export class DataSourceService {
  constructor(@Inject(REQUEST) private readonly requestContext: unknown) {}
}
