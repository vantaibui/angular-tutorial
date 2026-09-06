import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  Subject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  switchMap,
} from 'rxjs';

describe('search stream', () => {
  let log: string[];

  beforeEach(() => {
    vi.useFakeTimers();
    log = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function fakeSearch(term: string) {
    return new Observable<string>((subscriber) => {
      log.push(`START ${term}`);

      const timeout = setTimeout(() => {
        subscriber.next(`RESULT ${term}`);
        subscriber.complete();
      }, 1000);

      return () => {
        clearTimeout(timeout);

        // Chỉ log CANCEL nếu request chưa complete.
        // Nếu không có check này thì teardown sau complete
        // cũng có thể bị hiểu nhầm là cancel.
        log.push(`CANCEL ${term}`);
      };
    });
  }

  it('TC1 - switchMap cancels previous request', async () => {
    const search$ = new Subject<string>();
    const results: string[] = [];

    const subscription = search$
      .pipe(switchMap((term) => fakeSearch(term)))
      .subscribe((result) => results.push(result));

    search$.next('an');

    await vi.advanceTimersByTimeAsync(400);

    search$.next('ang');

    expect(log).toEqual([
      'START an',
      'CANCEL an',
      'START ang',
    ]);

    await vi.advanceTimersByTimeAsync(1000);

    expect(results).toEqual(['RESULT ang']);

    subscription.unsubscribe();
  });

  it('TC2 - debounceTime emits only latest value', async () => {
    const search$ = new Subject<string>();
    const results: string[] = [];

    const subscription = search$
      .pipe(
        debounceTime(300),
        switchMap((term) => fakeSearch(term)),
      )
      .subscribe((result) => results.push(result));

    search$.next('a');

    await vi.advanceTimersByTimeAsync(100);

    search$.next('an');

    await vi.advanceTimersByTimeAsync(100);

    search$.next('ang');

    // Chưa đủ debounce
    await vi.advanceTimersByTimeAsync(299);

    expect(log).toEqual([]);

    // Đủ 300ms kể từ "ang"
    await vi.advanceTimersByTimeAsync(1);

    expect(log).toEqual([
      'START ang',
    ]);

    await vi.advanceTimersByTimeAsync(1000);

    expect(results).toEqual(['RESULT ang']);

    subscription.unsubscribe();
  });

  it('TC3 - distinctUntilChanged ignores duplicate query', async () => {
    const search$ = new Subject<string>();
    const results: string[] = [];

    const subscription = search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => fakeSearch(term)),
      )
      .subscribe((result) => results.push(result));

    search$.next('angular');
    await vi.advanceTimersByTimeAsync(300);
    await vi.advanceTimersByTimeAsync(1000);

    search$.next('angular');
    await vi.advanceTimersByTimeAsync(300);

    search$.next('vue');
    await vi.advanceTimersByTimeAsync(300);

    const startLogs = log.filter((x) => x.startsWith('START'));

    expect(startLogs).toEqual([
      'START angular',
      'START vue',
    ]);

    await vi.advanceTimersByTimeAsync(1000);

    subscription.unsubscribe();
  });

  it('TC4 - mergeMap does not cancel previous request', async () => {
    const search$ = new Subject<string>();
    const results: string[] = [];

    const subscription = search$
      .pipe(mergeMap((term) => fakeSearch(term)))
      .subscribe((result) => results.push(result));

    search$.next('an');

    await vi.advanceTimersByTimeAsync(400);

    search$.next('ang');

    expect(log).toEqual([
      'START an',
      'START ang',
    ]);

    expect(log).not.toContain('CANCEL an');

    await vi.advanceTimersByTimeAsync(1000);

    expect(results).toHaveLength(2);
    expect(results).toContain('RESULT an');
    expect(results).toContain('RESULT ang');

    subscription.unsubscribe();
  });
});
