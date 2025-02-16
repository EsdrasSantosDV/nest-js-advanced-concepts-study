import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { filter, firstValueFrom, fromEvent, map, Observable, tap } from 'rxjs';
import { Worker } from 'worker_threads';
//AUI COLOCAMOS O QQUE VIA CHAMAR NOSSO WORKER
//nesse caso, vmaos ter as mensagens que o worker vai mandar
//E PEGAMOS PELO ID DA REQUEST
//E RETORNAMOS O RESULTADO
@Injectable()
export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;
  private message$: Observable<{ id: string; result: number }>;

  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    //QUANDO USA O PISCINA , ELE NÃO PASSA POR AQUI
    //PEGANDO AS MENSAGENS DO WORKER
    this.message$ = fromEvent(this.worker, 'message') as Observable<{
      id: string;
      result: number;
    }>;
  }

  async onApplicationShutdown() {
    await this.worker.terminate();
  }

  run(n: number) {
    const uniqueId = randomUUID();
    console.log('uniqueId', uniqueId);
    //PRA CADA REQUEST TEMOS O ID DA REQUEST E O N
    this.worker.postMessage({ n, id: uniqueId });
    return firstValueFrom(
      this.message$.pipe(
        //FILTRANDO PELO ID DA REQUEST
        tap((message) => console.log('message', message)),
        filter(({ id }) => id === uniqueId),
        map(({ result }) => result),
      ),
    );
  }
}

//SO QUE AIDNA ASSIM FICA BLOQUEANTE, POIS O POOL DO WOKRER E PEQUENO
//PRA ISSO PODEMOS BAIXAR O PISCINA, E AUMENTAR O POOL DE WORKERS
//COLOCAR NO JSON TSCONFIG   "esModuleInterop": true,
