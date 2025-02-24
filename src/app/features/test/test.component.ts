import { Component, effect } from '@angular/core';
import { map, of } from 'rxjs';

function compose<T, R>(...fns: ((arg: any) => any)[]): (x: T) => R {
  return (x: T): R =>
    fns.reduceRight(
      (acc: unknown, fn: (arg: unknown) => unknown) => fn(acc),
      x,
    ) as R;
}

function pipe<T, R>(...fns: ((arg: any) => any)[]): (x: T) => R {
  return (x: T): R =>
    fns.reduce(
      (acc: unknown, fn: (arg: unknown) => unknown) => fn(acc),
      x,
    ) as R;
}

function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('The result is returned from the cache');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    console.log('The result is being cached');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }) as T;
}

function pipeAsync<T, R>(
  ...fns: (((arg: any) => Promise<any>) | ((arg: any) => any))[]
): (x: T) => Promise<R> {
  return async (x: T): Promise<R> =>
    fns.reduce(
      async (acc: unknown, fn: (arg: unknown) => unknown) => fn(await acc),
      Promise.resolve(x),
    ) as Promise<R>;
}

interface Person {
  name: string;
  age: number;
}

@Component({
  selector: 'app-test',
  imports: [],
  template: `<p>Hello</p>`,
})
export class TestComponent {
  people: Person[] = [
    {
      name: 'Doan Dat',
      age: 20,
    },
  ];

  loggingPersonAsync = pipeAsync(
    async (pp: Person[]) => Promise.resolve(pp.map(p => p.name)),
    async (names: string[]) => Promise.resolve(names.map(name => `Hi ${name}`)),
    (names: string[]) => names.reduce((acc, name) => acc + name.length, 0),
  );

  loggingPerson = pipe(
    (pp: Person[]) => pp.map(p => p.name),
    (names: string[]) => names.map(name => `Hello Hello ${name}`),
    (names: string[]) => names.reduce((acc, name) => acc + name.length, 0),
  );

  fib = memoize((n: number): number => {
    return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
  });

  obs$ = of(1);
  obs = this.obs$.pipe(
    map(x => x + 1),
    map(x => x + 2),
    map(x => x + 3),
    map(x => x + 3),
    map(x => x + 3),
    map(x => x + 3),
    map(x => x + 3),
    map(x => x + 3),
    map(x => x + 3),
  );

  constructor() {
    const toUpperCase = (s: string) => s.toUpperCase();
    const wrapInBrackets = (s: string) => `[${s}]`;

    const transformString = compose<string, string>(
      toUpperCase,
      wrapInBrackets,
    );

    console.log(transformString('hello'));

    effect(async () => {
      const res = await this.loggingPersonAsync(this.people);
      console.log(res);
    });
  }
}
