import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';

@Injectable()
export class IntervalScheduler implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}
  onApplicationBootstrap(): any {
    const providers = this.discoveryService.getProviders();
    providers.forEach((provider) => {
      const { instance } = provider;
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!prototype || !instance) {
        return;
      }
      const isIntervalHost =
        this.reflector.get<boolean>(
          'INTERVAL_HOST_KEY',
          prototype.constructor,
        ) ?? false;
      if (!isIntervalHost) {
        return;
      }
      //COM ISSO CONSEGUIMOS PEGAR TODOS OS PROVIDERS QUE TEM O DECORATOR INTERVAL_HOST
      console.log('IntervalHost', provider.token);
    });
  }
}
