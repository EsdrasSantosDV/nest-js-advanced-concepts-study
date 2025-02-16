import { parentPort } from 'worker_threads';

function fib(n: number) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

//AQUIU COLOCAMOS PELA POORTA O NOSSO WORKER, SENDO A MESSAGE A PORTA
parentPort?.on('message', ({ n, id }) => {
  const result = fib(n);

  //ID E  ID DA REQUEST, E O RESULTADO E O RESULTADO DA FUNCAO FIB
  //PRA ESSE ID
  parentPort?.postMessage({ result, id });
});
