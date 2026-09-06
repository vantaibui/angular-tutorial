import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { interval, Subject, switchMap, takeUntil } from "rxjs";

describe('leak', () => {

  afterEach(() => {
    vi.useRealTimers();
  })

  it('TC1 - không cleanup thì interval vẫn chạy sau khi component bị destroy', () => {
    vi.useFakeTimers();

    let callbackCount = 0;

    const sub = interval(100).subscribe(() => callbackCount++);

    vi.advanceTimersByTime(250);

    expect(callbackCount).toBe(2);

    const countAtDestroy = callbackCount;

    vi.advanceTimersByTime(300);

    expect(callbackCount).toBeGreaterThan(countAtDestroy);

    expect(sub.closed).toBe(false);

    sub.unsubscribe();
  });

  it('TC2 - takeUntil(destroy$) dừng interval khi destroy$ emit', () => {
    vi.useFakeTimers();

    const destroy$ = new Subject<void>();

    let callbackCount = 0;

    const sub = interval(100)
    .pipe(takeUntil(destroy$))
    .subscribe(() => callbackCount++);

    vi.advanceTimersByTime(250);

    expect(callbackCount).toBe(2);

    destroy$.next();

    const countAtDestroy = callbackCount;

    vi.advanceTimersByTime(300);

    expect(callbackCount).toBe(countAtDestroy);

    expect(sub.closed).toBe(true);
  });

  it('TC3 - đặt takeUntil trước switchMap vẫn làm inner Observable bị leak', () => {
    vi.useFakeTimers();

    const destroy$ = new Subject<void>();
    const click$ = new Subject<void>();

    let innerCallbackCount = 0;

    const sub = click$
    .pipe(
      takeUntil(destroy$),
      switchMap(() => interval(100))
    )
    .subscribe(() => innerCallbackCount++);

    click$.next();

    vi.advanceTimersByTime(250);

    expect(innerCallbackCount).toBe(2);

    destroy$.next();

    const countAtDestroy = innerCallbackCount;

    vi.advanceTimersByTime(300);

    expect(innerCallbackCount).toBeGreaterThan(countAtDestroy);

    expect(sub.closed).toBe(false);
    sub.unsubscribe();
  });

  it('TC4 - đặt takeUntil sau switchMap sẽ cleanup cả inner Observable', () => {
    vi.useFakeTimers();

    const destroy$ = new Subject<void>();
    const click$ = new Subject<void>();


    let innerCallbackCount = 0;

    const sub = click$
    .pipe(
      switchMap(() => interval(100)),
      takeUntil(destroy$)
    )
    .subscribe(() => innerCallbackCount++);

    click$.next();

    vi.advanceTimersByTime(250);

    expect(innerCallbackCount).toBe(2);

    destroy$.next();

    const countAtDestroy = innerCallbackCount;

    vi.advanceTimersByTime(300);

    expect(innerCallbackCount).toBe(countAtDestroy);

    expect(sub.closed).toBe(true);

    sub.unsubscribe();
  });

  it('TC5 - chỉ complete destroy$ mà không next() thì takeUntil không cleanup', () => {
    vi.useFakeTimers();

    const destroy$ = new Subject<void>();

    let callbackCount = 0;

    const sub = interval(100)
      .pipe(takeUntil(destroy$))
      .subscribe(() => {
        callbackCount++;
      });

    vi.advanceTimersByTime(250);

    expect(callbackCount).toBe(2);

    destroy$.complete();

    const countAtComplete = callbackCount;

    vi.advanceTimersByTime(300);

    expect(callbackCount).toBeGreaterThan(countAtComplete);
    expect(sub.closed).toBe(false);

    sub.unsubscribe();
  });
})
