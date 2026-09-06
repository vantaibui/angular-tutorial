# 0003 — Bài 02: takeUntil(destroy$) & memory leak

- **Ngày:** 2026-09-06
- **Kết quả:** ĐẠT (5/5 TC) — và người học **tự đóng lại lỗ hổng của Bài 01**

## Bằng chứng
Đọc file + chạy `pnpm test`: 4 files / 13 tests passed (Vitest 4.1.11).
TC1–TC4 đúng yêu cầu; TC5 (tuỳ chọn) người học tự thêm sau khi được chỉ ra lỗ hổng.

**Kiểm chứng quyết định:** tôi cố tình bỏ `if (!done)` trong helper của Bài 01 →
**4 test ĐỎ** (TC1–TC4). Trước khi sửa, cùng thao tác đó test vẫn xanh.
Khôi phục file → 13/13 xanh lại. Test giờ thực sự canh gác được.

## Chuyển biến quan trọng — điểm yếu lặp lại ĐÃ ĐƯỢC KHẮC PHỤC
Learning-record 0002 ghi điểm yếu lặp 2 lần: "tự đánh giá xong mà chưa đối chiếu bằng chứng",
và can thiệp A21 là bắt tự hỏi *"test vẫn xanh nếu tôi làm hỏng chỗ nào?"*.

Người học đã áp dụng đúng và **vượt yêu cầu**:
- TC5 tự thêm, viết đúng ngay lần đầu (2 thước đo: đếm callback + `sub.closed`).
- Assert `log` cả TRƯỚC và SAU `unsubscribe()` ở TC1/TC3/TC4 — bắt cả trường hợp
  unsubscribe outer sau khi inner complete sinh `CANCEL` giả. **Tôi không nghĩ tới chỗ này.**
- TC3 assert `log` ở 4 mốc thời gian thay vì chỉ cuối.
- Comment giải thích *vì sao* assert, viết cho người đọc sau.

→ **Can thiệp A21 coi như thành công. Không cần lặp lại ở bài sau.**

## Nắm được
- `takeUntil` phải đứng CUỐI pipe — tự tái hiện được leak khi đặt sai (TC3).
- `complete()` một mình KHÔNG kích hoạt `takeUntil` — chứng minh bằng TC5.
- Đo leak bằng hai thước: số lần callback chạy + `subscription.closed`.

## Còn sót (nhỏ)
`search-api.ts` đã sửa đúng nhưng không ai import — code chết. Đã nhắc, không chặn.

## Hiệu chỉnh độ khó
Bài 01–02 người học làm tốt và chủ động vượt yêu cầu.
**Xác nhận lại quyết định ở record 0002: tăng độ mở của đề từ Module 5** (ít khung sườn,
tiêu chí rõ nhưng cách làm để họ tự quyết).
