# 0002 — Bài 01: switchMap và nghệ thuật huỷ request

- **Ngày:** 2026-09-06
- **Kết quả:** ĐẠT (4/4 TC xanh) — kèm 1 lỗi thật cần sửa

## Bằng chứng
Đọc `search-stream.spec.ts` + chạy `pnpm test` thật: 3 files / 8 tests passed (Vitest 4.1.11).
Cả 4 TC đúng yêu cầu: switchMap huỷ, debounce gộp, distinctUntilChanged chặn trùng,
mergeMap không huỷ.

## Làm TỐT HƠN bài mẫu (ghi lại để hiệu chỉnh độ khó)
- Dùng `advanceTimersByTimeAsync` + async test thay vì bản sync của tôi — bền hơn với microtask.
- TC2 assert ở **299ms rồi 300ms** để chứng minh đúng ranh giới debounce, không chỉ kết quả.
- `subscription.unsubscribe()` cuối mỗi test (tôi bỏ qua trong bài mẫu).
- Import operator từ `'rxjs'` root thay vì `'rxjs/operators'` — đúng đường dẫn khuyến nghị
  (đã verify rxjs 7.8.2 root export đủ).
→ **Kết luận: Bài 01–02 KHÔNG quá khó với người học. Có thể tăng độ mở của đề từ Module 5.**

## Điểm yếu — LẶP LẠI LẦN 2
**Comment mô tả đúng nhưng code không implement.** Teardown ghi comment "chỉ log CANCEL nếu
chưa complete" nhưng thiếu `let xong` + `if (!xong)`. Đã chứng minh bằng probe chạy trong
chính project họ: request hoàn thành bình thường vẫn ghi `CANCEL`.

Test vẫn xanh vì **assert log TRƯỚC khi request hoàn thành** — rác ghi vào sau nên không thấy.
Và TC3 dùng `log.filter(x => x.startsWith('START'))`, lọc bỏ đúng phần chứa bug.

Liên hệ Bài 00: lần đó báo "xong" khi thiếu hẳn `src/playground/`. **Cùng một dạng: tự đánh
giá là xong mà chưa đối chiếu bằng chứng.** Đây là lần thứ 2 → theo A21 phải ĐỔI cách can thiệp.

## Can thiệp cho bài sau (A21 — không lặp lại lời nhắc cũ)
Từ Bài 02, khi người học báo xong, **bắt tự chẩn đoán trước khi tôi chấm**:
yêu cầu họ trả lời "test của tôi sẽ vẫn xanh nếu tôi cố tình làm hỏng chỗ nào?" —
buộc nghĩ về việc test có thực sự chứng minh điều nó tuyên bố hay không.

## Chưa kiểm được
Người học có tự nhận ra "phải lọc log đi để test pass" là code smell hay không.
Bài 02 (TC3 đặt sai vị trí takeUntil) sẽ lộ ra điều này.
