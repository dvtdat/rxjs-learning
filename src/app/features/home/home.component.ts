import { Component, effect, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  template: ` <div
    class="w-screen h-screen flex flex-col space-y-10 items-center justify-center"
  >
    <button
      (click)="onClickButton()"
      class="flex flex-row w-20 h-10 bg-primary text-white rounded-lg items-center justify-center hover:bg-primary-700"
    >
      Hello
    </button>
    <div
      class="flex flex-row w-20 h-10 bg-white text-4xl text-primary border border-primary rounded-lg items-center justify-center"
    >
      {{ this.value() }}
    </div>
  </div>`,
  styles: ``,
})
export class HomeComponent {
  value = signal<number>(0);
  isEven$ = toObservable(this.value).pipe(map(value => value % 2 === 0));

  constructor() {
    // ==============================
    // observable
    const a$: Observable<number> = of(1, 2, 3, 4, 5);

    // new observable created after some operations
    const c$ = a$.pipe(
      startWith(0),
      map((a: number) => {
        console.log('First Operator');
        return a * 3;
      }),
      map((a: number) => {
        console.log('Second Operator');
        return a * 2;
      }),
      map((a: number) => {
        console.log('Third Operator');
        return a * 4;
      }),
    );

    // subscriber
    c$.subscribe(value => {
      console.log('value', value);
    });

    // ==============================
    const observable$ = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      subscriber.next(5);
    });
    const value$: Observable<number> = of(1, 2, 3, 4, 5, 6);
    const observer = {
      next: (value: any) => console.log('oke next', value),
      error: (error: any) => console.log('error', error),
      complete: () => console.log('complete'),
    };
    value$.subscribe(observer);
    observable$.subscribe(observer);

    // ==============================
    effect(() => {
      this.isEven$.subscribe(isEven => {
        console.log('isEven', isEven);
      });
    });
  }

  onClickButton() {
    this.value.set(this.value() + 1);
  }
}
