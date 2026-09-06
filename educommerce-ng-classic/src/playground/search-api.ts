import { Observable } from 'rxjs';

/** Nhật ký dùng chung để test quan sát được API nào chạy, API nào bị huỷ. */
export type ApiLog = string[];

/**
 * API tìm kiếm GIẢ LẬP.
 * Điểm mấu chốt: hàm teardown (phần `return () => {...}`) chạy khi có người
 * unsubscribe — nhờ vậy ta CHỨNG MINH được request đã bị huỷ, thay vì chỉ tin.
 */
export function fakeSearchApi(term: string, delayMs: number, log: ApiLog): Observable<string[]> {
  return new Observable<string[]>((subscriber) => {
    // Chạy khi CÓ NGƯỜI subscribe — không phải khi hàm được gọi.
    // Đây là tính "lazy" của Observable: không ai nghe thì không có gì xảy ra.
    log.push(`START ${term}`);
    let xong = false;

    const id = setTimeout(() => {
      xong = true;
      subscriber.next([`${term} result`]);
      subscriber.complete();
    }, delayMs);

    // TEARDOWN: chạy khi unsubscribe HOẶC khi complete.
    // Cờ `xong` để phân biệt hai trường hợp — chỉ ghi CANCEL khi bị cắt giữa chừng.
    return () => {
      clearTimeout(id);
      if (!xong) log.push(`CANCEL ${term}`);
    };
  });
}
