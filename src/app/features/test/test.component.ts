import { Component } from '@angular/core';

// class Container<T> {
//   private $value: T;

//   constructor(x: T) {
//     this.$value = x;
//   }

//   static of<T>(x: T): Container<T> {
//     console.log('New Instances');
//     return new Container(x);
//   }

//   getValue(): T {
//     return this.$value;
//   }

//   map<U>(f: (value: T) => U): Container<U> {
//     return Container.of(f(this.getValue()));
//   }
// }

// function append(suffix: string) {
//   return (value: string) => value + suffix;
// }

// function prop<T, U extends keyof T>(key: U): (obj: T) => T[U] {
//   return (obj: T): T[U] => obj[key];
// }

// class Maybe<T> {
//   private $value: T;

//   constructor(x: T) {
//     this.$value = x;
//   }

//   get isNothing() {
//     // eslint-disable-next-line sonarjs/different-types-comparison
//     return this.$value === null || this.$value === undefined;
//   }

//   static of<T>(x: T): Maybe<T> {
//     return new Maybe(x);
//   }

//   getValue(): T {
//     return this.$value;
//   }

//   map<U>(f: (value: T) => U): Maybe<U> {
//     return this.isNothing
//       ? (this as unknown as Maybe<U>)
//       : Maybe.of(f(this.$value));
//   }

//   inspect(): string {
//     return this.isNothing
//       ? 'Nothing'
//       : `The inspection is ${JSON.stringify(this.$value)}`;
//   }
// }

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

function pipeAsync<T, R>(
  ...fns: ((arg: any) => Promise<any>)[]
): (x: T) => Promise<R> {
  return async (x: T): Promise<R> =>
    fns.reduce(
      async (acc: unknown, fn: (arg: unknown) => unknown) => fn(await acc),
      Promise.resolve(x),
    ) as Promise<R>;
}

// function pipe<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
//   return (arg: T): T => fns.reduce((res, fn) => fn(res), arg);
// }

// function pipeAsync<T>(
//   ...fns: ((arg: T) => Promise<T>)[]
// ): (arg: T) => Promise<T> {
//   return async (arg: T): Promise<T> => {
//     let result = arg;
//     for (const fn of fns) {
//       result = await fn(result);
//     }
//     return result;
//   };
// }

// const pipeAsync: any =
//   (...fns: Promise<Function>[]) =>
//   (input: any) =>
//     fns.reduce(
//       (chain: Prommise<Function>, func: Function | Promise<Function> | any) =>
//         chain.then(func),
//       Promise.resolve(input),
//     );

// const compose =
//   <T, U, V>(f: (arg: U) => T, g: (arg: V) => U) =>
//   (x: V): T =>
//     f(g(x));

// const pipe =
//   <A, B, C>(f: (arg: A) => B, g: (arg: B) => C) =>
//   (x: A): C =>
//     g(f(x));

interface Person {
  name: string;
  age: number;
}

@Component({
  selector: 'app-test',
  imports: [],
  template: `<p>test works!</p>`,
})
export class TestComponent {
  people: Person[] = [
    {
      name: 'Doan Dat',
      age: 20,
    },
    {
      name: 'Nguyen Mie',
      age: 20,
    },
  ];

  loggingPersonAsync = pipeAsync(
    async (pp: Person[]) => Promise.resolve(pp.map(p => p.name)),
    async (names: string[]) =>
      Promise.resolve(names.map(name => `Hello Hello ${name}`)),
    async (names: string[]) =>
      Promise.resolve(names.reduce((acc, name) => acc + name.length, 0)),
  );

  loggingPerson = pipe(
    (pp: Person[]) => pp.map(p => p.name),
    (names: string[]) => names.map(name => `Hello Hello ${name}`),
    (names: string[]) => names.reduce((acc, name) => acc + name.length, 0),
  );

  constructor() {
    // Container.of(3);
    // Container.of('hello').map(append(' world')).map(prop('length'));

    // const tmp = Maybe.of({
    //   name: 'Doan Dat',
    //   age: 20,
    //   dob: '17/11/2004',
    //   university: 'HCMC University of Technology',
    // });

    // const person = Maybe.of<Person>({
    //   name: 'Tien Dat',
    //   age: 20,
    // });

    // const calculated = compose(
    //   (x: number) => x + 10,
    //   (
    //     obj: Maybe<{
    //       name: string;
    //       age: number;
    //       dob: string;
    //       university: string;
    //     }>,
    //   ) =>
    //     prop<
    //       { name: string; age: number; dob: string; university: string },
    //       'age'
    //     >('age')(obj.getValue()),
    // );
    // console.log(calculated(tmp));

    // const calculatingPerson = compose(
    //   (x: number) => x + 20,
    //   (obj: Maybe<Person>) => prop<Person, 'age'>('age')(obj.getValue()),
    // );
    // console.log(calculatingPerson(person));

    const toUpperCase = (s: string) => s.toUpperCase();
    const wrapInBrackets = (s: string) => `[${s}]`;

    const transformString = compose<string, string>(
      toUpperCase,
      wrapInBrackets,
    );

    console.log(transformString('hello'));
  }
}
