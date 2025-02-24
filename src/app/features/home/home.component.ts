import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: ` <div
    class="w-screen h-screen flex flex-col space-y-10 items-center justify-center"
  >
    <!-- <button
      (click)="onClickButton()"
      class="flex flex-row w-20 h-10 bg-primary text-white rounded-lg items-center justify-center hover:bg-primary-700"
    >
      Hello
    </button>
    <div
      class="flex flex-row w-20 h-10 bg-white text-4xl text-primary border border-primary rounded-lg items-center justify-center"
    >
      {{ this.value() }}
    </div> -->
  </div>`,
  styles: ``,
})
export class HomeComponent {
  // value = signal<number>(0);
  // isEven$ = toObservable(this.value).pipe(map(value => value % 2 === 0));
  // constructor() {
  // ==============================
  // observable
  // const a$: Observable<number> = of(1, 2, 3, 4, 5);
  // // new observable created after some operations
  // const c$ = a$.pipe(
  //   startWith(0),
  //   map((a: number) => {
  //     return a + 1;
  //   }),
  //   map((a: number) => {
  //     return a * 3;
  //   }),
  //   map((a: number) => {
  //     return a * 2;
  //   }),
  //   map((a: number) => {
  //     return a * 4;
  //   }),
  // );
  // // subscriber
  // // c$.pipe(map(value => value + 10)).subscribe(value => {
  // //   console.log('value', value);
  // // });
  // const obs$: Observable<number> = c$.pipe(map(value => value + 10));
  // // subscriber
  // obs$.subscribe((value: number) => {
  //   console.log('value', value);
  // });
  // // ==============================
  // const observable$: Observable<unknown> = new Observable(subscriber => {
  //   subscriber.next(1);
  //   subscriber.next(2);
  //   subscriber.next(3);
  //   subscriber.next(4);
  //   subscriber.next(5);
  // });
  // const value$: Observable<number> = of(1, 2, 3, 4, 5, 6);
  // const observer = {
  //   next: (value: any) => console.log('oke next', value),
  //   error: (error: any) => console.log('error', error),
  //   complete: () => console.log('complete'),
  // };
  // value$.subscribe(observer);
  // observable$.subscribe(observer);
  // ==============================
  // const observable$: Observable<number> = of(1, 2, 3, 4, 5);
  // const observer = {
  //   next: (value: any) => console.log(value),
  //   error: (error: any) => console.group('error', error),
  //   complete: () => console.log('complete'),
  // };
  // const tmp$: Observable<number> = interval(200).pipe(take(10));
  // const tmp$: Observable<Observable<string>> = observable$.pipe(
  //   map(value =>
  //     interval(1000).pipe(
  //       map(i => `${value} ${i}`),
  //       take(5),
  //     ),
  //   ),
  // );
  // const tmp2$: Observable<Observable<Observable<string>>> = interval(
  //   100,
  // ).pipe(
  //   map(x =>
  //     interval(100).pipe(
  //       map(y =>
  //         interval(100).pipe(
  //           map(z => `${x} ${y} ${z}`),
  //           take(5),
  //         ),
  //       ),
  //       take(5),
  //     ),
  //   ),
  //   take(5),
  // );
  // // const obs$: Observable<string[]> = tmp$.pipe(combineLatestAll());
  // // obs$.subscribe(observer);
  // // const a$: Observable<Observable<string>[]> = tmp2$.pipe(combineLatestAll());
  // const a$: Observable<Observable<string[]>> = tmp2$.pipe(
  //   map(value => value.pipe(combineLatestAll())),
  // );
  // a$.pipe(map(value => value.subscribe(observer)));
  // ==============================
  //   effect(() => {
  //     this.isEven$.subscribe(isEven => {
  //       console.log('isEven', isEven);
  //     });
  //   });
  // }
  // onClickButton() {
  //   this.value.set(this.value() + 1);
  // }
}
