import { Observable } from 'rxjs';

/** Nhật ký dùng chung để test quan sát được API nào chạy, API nào bị huỷ. */
export type ApiLog = string[];

/**
 * API tìm kiếm giả lập.
 *
 * Observable là lazy:
 * chỉ khi có subscriber thì request giả lập mới bắt đầu.
 *
 * Teardown chạy khi unsubscribe hoặc khi Observable complete.
 * Cờ `xong` dùng để phân biệt:
 * - complete bình thường
 * - bị cancel giữa chừng
 */
export function fakeSearchApi(
  term: string,
  delayMs: number,
  log: ApiLog,
): Observable<string[]> {
  return new Observable<string[]>((subscriber) => {
    log.push(`START ${term}`);

    let xong = false;

    const id = setTimeout(() => {
      xong = true;

      subscriber.next([`${term} result`]);
      subscriber.complete();
    }, delayMs);

    return () => {
      clearTimeout(id);

      if (!xong) {
        log.push(`CANCEL ${term}`);
      }
    };
  });
}
