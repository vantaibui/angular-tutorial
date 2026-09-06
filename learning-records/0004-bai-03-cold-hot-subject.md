# 0004 — Bài 03: Cold vs Hot, họ nhà Subject

- **Ngày:** 2026-09-06
- **Kết quả:** ĐẠT (8/8 TC, gồm cả TC8 tuỳ chọn)

## Bằng chứng
Đọc `subjects.spec.ts` + chạy `pnpm test`: 5 files / 21 tests passed (Vitest 4.1.11).
`pnpm exec tsc --noEmit` sạch.

## Nắm được
- Lazy vs eager: dùng `vi.fn()` đếm lời gọi thay vì biến đếm thủ công — gọn hơn cách tôi gợi ý.
- Cold/unicast: 2 subscriber trên cùng Observable → 2 lần chạy độc lập, giá trị khác nhau.
- Chọn đúng Subject theo "người tới muộn nhận gì": Subject (không), BehaviorSubject (giá trị
  hiện tại), ReplaySubject(2) (2 giá trị gần nhất).
- TC7 kiểm `'next' in public$` — đúng thứ cần kiểm (bị ẩn ở tầng thuộc tính), không chỉ
  `typeof` hời hợt.
- TC8 (tuỳ chọn, tự làm): đủ 4 góc — giá trị trước complete, next() sau complete vô hiệu,
  subscriber muộn nhận complete ngay, không replay giá trị.

## Không có gì phải sửa
Lần đầu tiên trong 3 bài nộp mà không có lỗi hay code smell nào. Không `.filter()` che
assertion (như Bài 01), không `any`, tsc sạch ngay từ lần đầu.

## Ghi chú về bản chất bài này (khác Bài 01-02)
Bài 03 không có implementation tự viết để "phá" kiểm chứng — đây là test ĐẶC TÍNH của chính
RxJS (Subject/BehaviorSubject/ReplaySubject), không phải logic do người học viết. Câu hỏi tự
chẩn đoán "test vẫn xanh nếu tôi làm hỏng chỗ nào?" không áp dụng trực tiếp kiểu Bài 01-02.
Tiêu chí chất lượng phù hợp hơn: assertion có phân biệt được hai mental model đối lập không —
TC3 vs TC4 làm tốt việc này (gần đối xứng, kết quả ngược nhau đúng lý thuyết).

## Xác nhận xu hướng
Ba bài liên tiếp (00 lỗi nhỏ → 01 lỗi thật → 02 tự vá → 03 sạch hoàn toàn) cho thấy quỹ đạo
đi lên rõ rệt. Giữ nguyên quyết định: đề mở hơn từ Module 5, ít khung sườn.
