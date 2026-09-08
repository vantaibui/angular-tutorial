import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  BehaviorSubject,
  Subject,
  combineLatest,
  distinctUntilChanged,
  startWith,
  withLatestFrom,
} from 'rxjs';

describe('RxJS combine playground', () => {
  describe('TC1 - combineLatest waits until all sources emitted', () => {
    it('should not emit until both Subjects emitted, then emit latest values', () => {
      const search$ = new Subject<string>();
      const page$ = new Subject<number>();

      const results: Array<[string, number]> = [];

      combineLatest([search$, page$]).subscribe(value => {
        results.push(value);
      });

      search$.next('angular');
      search$.next('rxjs');

      expect(results).toEqual([]);

      page$.next(1);

      expect(results).toEqual([['rxjs', 1]]);
    });
  });

  describe('TC2 - combineLatest re-emits whenever any source emits', () => {
    it('should emit once for every next() after both sources have emitted', () => {
      const search$ = new Subject<string>();
      const page$ = new Subject<number>();

      const results: Array<[string, number]> = [];

      combineLatest([search$, page$]).subscribe(value => {
        results.push(value);
      });

      search$.next('rxjs');
      page$.next(1);

      expect(results).toEqual([['rxjs', 1]]);

      search$.next('angular');

      expect(results).toEqual([
        ['rxjs', 1],
        ['angular', 1],
      ]);

      page$.next(2);

      expect(results).toEqual([
        ['rxjs', 1],
        ['angular', 1],
        ['angular', 2],
      ]);
    });
  });

  describe('TC3 - startWith provides initial value', () => {
    it('should emit immediately when the other source emits', () => {
      const search$ = new Subject<string>();
      const page$ = new Subject<number>();

      const results: Array<[string, number]> = [];

      combineLatest([
        search$,
        page$.pipe(startWith(1)),
      ]).subscribe(value => {
        results.push(value);
      });

      search$.next('rxjs');

      expect(results).toEqual([['rxjs', 1]]);
    });
  });

  describe('TC4 - BehaviorSubject provides current value', () => {
    it('should emit without needing startWith', () => {
      const search$ = new Subject<string>();
      const page$ = new BehaviorSubject<number>(1);

      const results: Array<[string, number]> = [];

      combineLatest([search$, page$]).subscribe(value => {
        results.push(value);
      });

      search$.next('rxjs');

      expect(results).toEqual([['rxjs', 1]]);

      page$.next(2);

      expect(results).toEqual([
        ['rxjs', 1],
        ['rxjs', 2],
      ]);
    });
  });

  describe('TC5 - duplicate emission trap', () => {
    it('should emit twice when search changes then page is set to the same value', () => {
      const search$ = new BehaviorSubject<string>('initial');
      const page$ = new BehaviorSubject<number>(1);

      const request = vi.fn();

      combineLatest([search$, page$]).subscribe(([search, page]) => {
        request(search, page);
      });

      // Bỏ emission ban đầu: ['initial', 1]
      request.mockClear();

      search$.next('rxjs');

      // Lần 1: ['rxjs', 1]
      page$.next(1);

      // Lần 2: ['rxjs', 1] dù page vẫn là 1
      expect(request).toHaveBeenCalledTimes(2);

      expect(request).toHaveBeenNthCalledWith(1, 'rxjs', 1);
      expect(request).toHaveBeenNthCalledWith(2, 'rxjs', 1);
    });
  });

  describe('TC6 - withLatestFrom', () => {
    it('should not emit when secondary source changes', () => {
      const search$ = new Subject<string>();
      const page$ = new BehaviorSubject<number>(1);

      const results: Array<[string, number]> = [];

      search$
        .pipe(withLatestFrom(page$))
        .subscribe(value => {
          results.push(value);
        });

      // page$ là nguồn phụ -> đổi không trigger
      page$.next(2);

      expect(results).toEqual([]);

      // search$ là nguồn chính -> trigger và lấy page mới nhất
      search$.next('rxjs');

      expect(results).toEqual([['rxjs', 2]]);

      page$.next(3);

      expect(results).toEqual([['rxjs', 2]]);

      search$.next('angular');

      expect(results).toEqual([
        ['rxjs', 2],
        ['angular', 3],
      ]);
    });
  });

  describe('TC7 - distinctUntilChanged blocks duplicate emission', () => {
    it('should block duplicate page value and avoid duplicate request', () => {
      const search$ = new BehaviorSubject<string>('initial');
      const page$ = new BehaviorSubject<number>(1);

      const request = vi.fn();

      combineLatest([
        search$,
        page$.pipe(distinctUntilChanged()),
      ]).subscribe(([search, page]) => {
        request(search, page);
      });

      request.mockClear();

      search$.next('rxjs');

      // page hiện tại đã là 1
      // distinctUntilChanged() chặn next(1) này
      page$.next(1);

      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith('rxjs', 1);
    });
  });
});
