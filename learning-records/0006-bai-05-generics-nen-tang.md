# 0006 — Bài 05: Generics nền — tham số hoá kiểu dữ liệu

- **Ngày:** 2026-09-29
- **Kết quả:** ĐẠT (6/6 TC)

## Bằng chứng
Đọc `generics.spec.ts` + tự chạy lại: `pnpm exec ng test --include generics.spec.ts` → 1 file /
6 tests passed (Vitest 4.1.11). `pnpm exec tsc --noEmit -p tsconfig.spec.json` sạch.

Xác minh cả 5 `@ts-expect-error` trong bài là test canh gác THẬT (mở rộng nguyên tắc "test vẫn
đỏ nếu cố tình phá" sang biên dịch — GLOSSARY mới thêm mục này): copy file ra sandbox, xoá hết
5 comment `@ts-expect-error`, chạy lại `tsc --noEmit` → cả 5 dòng đúng vị trí đều báo lỗi kiểu
thật (`TS2551` sai tên field, `TS2322` sai kiểu giá trị, `TS2345` thiếu field/sai key/sai kiểu
tham số) — không có dòng nào "giả vờ cần" `@ts-expect-error` mà thực ra không lỗi gì.

## Nắm được
- TC1/TC2: `dauTien<T>(ds: T[]): T | undefined` đúng, và tách riêng một test (TC2) chỉ để nhấn
  mạnh "gọi không ghi `<Course>` mà TypeScript vẫn suy luận đúng" — đúng tinh thần DoD dù cơ chế
  giống TC1.
- TC3: `ApiResponse<T>` dùng đúng với cả `Course[]` (mảng) và `User` (object đơn) — chứng minh
  `T` nhận được MỌI hình dạng dữ liệu, không riêng gì mảng.
- TC4: `layId<T extends {id: string}>` — ràng buộc đúng, test với object THIẾU `id` để kích hoạt
  lỗi, không chỉ test trường hợp đúng.
- TC5: đúng y yêu cầu khó nhất bài — gán kết quả `layTruong(course, 'title')` vào
  `const t: string` tường minh để CHỨNG MINH kiểu trả về `T[K]` chính xác, không chỉ chạy được.
- TC6: làm nhiều hơn yêu cầu tối thiểu — vừa chứng minh mặc định `B = A` hoạt động
  (`cap<string>(...)`), vừa chứng minh ghi đè mặc định được (`cap<string, number>(...)`), vừa có
  `@ts-expect-error` khi vi phạm mặc định. Ba góc trong một TC thay vì một góc tối thiểu.

## Không có gì phải sửa
Đặt tên hàm nhất quán phong cách Vietnamese-verb đã dùng trong khoá (`dauTien`, `layId`,
`layTruong`) — không lẫn tiếng Anh nửa vời. Không có `any` nào. Không TC nào thiếu nhánh lỗi.

## Ghi chú về bản chất bài này
Giống Bài 03/04: không có implementation "để phá" theo kiểu Bài 01-02, vì đây là test ĐẶC TÍNH
CỦA HỆ THỐNG KIỂU TypeScript, không phải logic runtime tự viết. Verify phù hợp là probe biên
dịch (xoá `@ts-expect-error`, xem lỗi có xuất hiện đúng chỗ không) — đã làm và xác nhận cả 5/5.

## Xác nhận xu hướng
Năm bài liên tiếp từ Bài 01: lỗi thật → tự vá → sạch hoàn toàn → sạch hoàn toàn (làm thêm tuỳ
chọn) → sạch hoàn toàn (làm nhiều hơn yêu cầu ở TC6). Quỹ đạo đi lên ổn định và bắt đầu chủ động
vượt yêu cầu tối thiểu, không chỉ đáp ứng đủ.
