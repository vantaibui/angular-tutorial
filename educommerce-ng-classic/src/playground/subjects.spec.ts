import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

describe('RxJS Observable and Subjects', () => {

  it('TC1 - Promise is eager, Observable is lazy', async () => {
    const promiseExecutor = vi.fn();
    const observableExecutor = vi.fn();

    const promise = new Promise<void>((resolve) => {
      promiseExecutor();
      resolve();
    })

    const observable = new Observable<void>((subscriber) => {
      observableExecutor();
      subscriber.complete();
    })

    expect(promiseExecutor).toHaveBeenCalledTimes(1);

    expect(observableExecutor).toHaveBeenCalledTimes(0);

    const subscription = observable.subscribe();

    expect(observableExecutor).toHaveBeenCalledTimes(1);

    subscription.unsubscribe();

    await promise;
  });

  it('TC2 - cold Observable runs separately for each subscriber', () => {
    let executorCount = 0;

    const source$ = new Observable<number>((subscriber) => {
      executorCount++;

      subscriber.next(executorCount);
      subscriber.complete();
    });

    const firstValues: number[] = [];
    const secondValues: number[] = [];

    source$.subscribe((value) => firstValues.push(value));
    source$.subscribe((value) => secondValues.push(value));

    expect(executorCount).toBe(2);

    expect(firstValues).toEqual([1]);
    expect(secondValues).toEqual([2]);
  });

  it('TC3 - Subject does not replay old values to late subscriber', () => {
    const subject$ = new Subject<string>();

    const firstValues: string[] = [];
    const lateValues: string[] = [];

    const firstSub = subject$.subscribe((value) => {
      firstValues.push(value);
    });

    subject$.next('A');

    // Subscriber này tới sau khi A đã được phát.
    const lateSub = subject$.subscribe((value) => {
      lateValues.push(value);
    });

    subject$.next('B');

    expect(firstValues).toEqual([
      'A',
      'B',
    ]);

    // Không nhận A, chỉ nhận giá trị phát sau khi subscribe.
    expect(lateValues).toEqual([
      'B',
    ]);

    firstSub.unsubscribe();
    lateSub.unsubscribe();
  });

  it('TC4 - BehaviorSubject gives current value to late subscriber', () => {
    const subject$ = new BehaviorSubject<string>('initial');

    const firstValues: string[] = [];
    const lateValues: string[] = [];

    const firstSub = subject$.subscribe((value) => {
      firstValues.push(value);
    });

    subject$.next('A');
    subject$.next('B');

    // .value phải phản ánh giá trị hiện tại.
    expect(subject$.value).toBe('B');

    // Subscriber đến muộn.
    const lateSub = subject$.subscribe((value) => {
      lateValues.push(value);
    });

    // Nhận ngay current value.
    expect(lateValues).toEqual([
      'B',
    ]);

    subject$.next('C');

    expect(firstValues).toEqual([
      'initial',
      'A',
      'B',
      'C',
    ]);

    expect(lateValues).toEqual([
      'B',
      'C',
    ]);

    expect(subject$.value).toBe('C');

    firstSub.unsubscribe();
    lateSub.unsubscribe();
  });

  it('TC5 - ReplaySubject(2) replays exactly two latest values', () => {
    const subject$ = new ReplaySubject<string>(2);

    subject$.next('A');
    subject$.next('B');
    subject$.next('C');

    const lateValues: string[] = [];

    const subscription = subject$.subscribe((value) => {
      lateValues.push(value);
    });

    // A đã rơi khỏi buffer.
    expect(lateValues).toEqual([
      'B',
      'C',
    ]);

    subject$.next('D');

    expect(lateValues).toEqual([
      'B',
      'C',
      'D',
    ]);

    subscription.unsubscribe();
  });

  it('TC6 - Subject multicasts one value to multiple subscribers', () => {
    const subject$ = new Subject<string>();

    const firstValues: string[] = [];
    const secondValues: string[] = [];

    const firstSub = subject$.subscribe((value) => {
      firstValues.push(value);
    });

    const secondSub = subject$.subscribe((value) => {
      secondValues.push(value);
    });

    // Chỉ next đúng một lần.
    subject$.next('hello');

    // Cả hai subscriber cùng nhận.
    expect(firstValues).toEqual([
      'hello',
    ]);

    expect(secondValues).toEqual([
      'hello',
    ]);

    firstSub.unsubscribe();
    secondSub.unsubscribe();
  });

  it('TC7 - asObservable hides the Subject next method', () => {
    const subject$ = new Subject<string>();

    const public$ = subject$.asObservable();

    expect(typeof subject$.next).toBe('function');

    // Observable trả về không expose next().
    expect('next' in public$).toBe(false);

    const values: string[] = [];

    const subscription = public$.subscribe((value) => {
      values.push(value);
    });

    // Producer vẫn có thể emit thông qua Subject gốc.
    subject$.next('hello');

    expect(values).toEqual([
      'hello',
    ]);

    subscription.unsubscribe();
  });

  it('TC8 - completed Subject ignores next and immediately completes late subscribers', () => {
    const subject$ = new Subject<string>();

    const values: string[] = [];
    let firstCompleted = false;

    const firstSub = subject$.subscribe({
      next: (value) => {
        values.push(value);
      },
      complete: () => {
        firstCompleted = true;
      },
    });

    subject$.next('before complete');

    expect(values).toEqual([
      'before complete',
    ]);

    subject$.complete();

    expect(firstCompleted).toBe(true);

    // next() sau complete không còn tác dụng.
    subject$.next('after complete');

    expect(values).toEqual([
      'before complete',
    ]);

    // Subscriber đến sau khi Subject đã complete.
    const lateValues: string[] = [];
    let lateCompleted = false;

    const lateSub = subject$.subscribe({
      next: (value) => {
        lateValues.push(value);
      },
      complete: () => {
        lateCompleted = true;
      },
    });

    // Subject thường không replay giá trị.
    expect(lateValues).toEqual([]);

    // Nhưng complete được báo ngay khi subscribe.
    expect(lateCompleted).toBe(true);

    firstSub.unsubscribe();
    lateSub.unsubscribe();
  });

})
