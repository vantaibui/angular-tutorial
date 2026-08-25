import { describe, it, expect } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

describe('sân tập', () => {

  // Test 1: chứng minh test runner sống.
  it('bộ máy test chạy', () => {
    expect(1 + 1).toBe(2);
  });

  // Test 2: chứng minh RxJS chạy được KHÔNG cần TestBed của Angular.
  // firstValueFrom biến Observable thành Promise để await trong test.
  it('RxJS chạy không cần Angular TestBed', async () => {
    const ketQua = await firstValueFrom(
      of(1).pipe(map((x) => x + 1))
    );
    expect(ketQua).toBe(2);
  });

});
