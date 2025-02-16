import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { INTERVAL_KEY } from '../decorators/interval.decorator';

@Injectable()
export class IntervalScheduler
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly intervals: NodeJS.Timer[] = [];

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner, //ESSE JA CONSEGUIMOS PEGAR OS METODOS E O METADATA DOS METODOS
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

      const methodKeys = this.metadataScanner.getAllMethodNames(prototype);
      methodKeys.forEach((methodKey) => {
        const interval = this.reflector.get(INTERVAL_KEY, instance[methodKey]);
        if (interval === undefined) {
          return;
        }
        const intervalRef = setInterval(() => instance[methodKey](), interval);
        this.intervals.push(intervalRef);
      });
    });
  }

  onApplicationShutdown(signal?: string) {
    this.intervals.forEach((intervalRef) =>
      clearInterval(intervalRef as unknown as number),
    );
  }
}
