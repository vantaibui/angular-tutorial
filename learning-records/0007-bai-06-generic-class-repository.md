# 0007 — Bài 06: Generic class — `InMemoryRepository<T>`

- **Ngày:** 2026-09-30
- **Kết quả:** ĐẠT (5/5 TC bắt buộc + thử thách thêm `create()`)

## Bằng chứng
Đọc `repository.ts` + `repository.spec.ts` + tự chạy lại: `pnpm exec ng test --include
repository.spec.ts` → 1 file / 11 tests passed (Vitest 4.1.11) — 11, không phải 5, vì mỗi TC
được tách thành nhiều `it()` con và làm cả phần thử thách `create()`. `pnpm exec tsc --noEmit -p
tsconfig.spec.json` sạch.

Xác minh cả 4 `@ts-expect-error` trong bài là test canh gác thật: xoá tạm cả 4 trong bản sao
sandbox, chạy lại `tsc --noEmit` → cả 4 dòng đều báo đúng lỗi kiểu ở đúng vị trí (`TS2345` thiếu
field bắt buộc, `TS2353` field lạ trong `Partial<Course>`, `TS2339` `.id` không tồn tại trên `T`
không ràng buộc, `TS2353` không được truyền `id` vào `create()`).

## Nắm được
- Tự dựng `InMemoryRepository<T extends Entity>` từ chữ ký, không copy mục 3 — interface
  `Entity { id: number }` tách riêng, `Course`/`User` đều `extends Entity`, đúng tinh thần "một
  ràng buộc, nhiều entity".
- TC1: chứng minh `T` đổi thì field ĐẶC THÙ (`.price`, `.role`) vẫn đúng kiểu, kèm
  `@ts-expect-error` khi cố nhét sai entity vào repo — dùng `create()` thay vì `add()` (class
  không có `add()`), vẫn đúng tinh thần "thêm sai kiểu phải đỏ".
- TC2: `update()` trả về `T | undefined` (khác `void` ở mục 3, lựa chọn riêng hợp lý) — VÀ chủ
  động khoá cứng `id: this.items[index].id` khi ghép patch, phòng trường hợp `Partial<T>` vô tình
  cho phép ghi đè `id` qua patch. Không bị yêu cầu, tự thêm vì hiểu đúng rủi ro.
- TC5: viết `UnconstrainedRepository<T>` (không `extends`) + comment giải thích rõ vì sao không
  viết được `findById` — đúng yêu cầu "giải thích bằng comment trong code". Phần chứng minh
  `.id` không truy cập được đặt trong một hàm generic độc lập (`getId<T>`) thay vì cố nhét vào
  class rồi comment out — cách làm sạch, tránh code chết nằm trong class thật.
- Thử thách `create()`: tự sinh `id` bằng `max + 1`, đúng kiểu `Omit<T, 'id'>`, kèm
  `@ts-expect-error` khi cố truyền `id` — làm đủ cả phần không bắt buộc.

## Không có gì phải sửa
Đặt tên phương thức theo đúng quy ước tiếng Anh của chính lesson mẫu (`findById`, `update`,
`remove`) — nhất quán, không lẫn nửa Việt nửa Anh. Không `any`. Test dùng `toEqual` so sánh toàn
bộ object thay vì chỉ so field lẻ — chặt hơn yêu cầu tối thiểu.

## Ghi chú về bản chất bài này
Tiếp tục mạch Bài 03-05: không có gì để "phá" theo kiểu runtime (Bài 01-02) — verify đúng cách
là probe biên dịch (xoá `@ts-expect-error`, xem lỗi đúng chỗ). Đã làm đủ cho cả 4 điểm.

## Xác nhận xu hướng
Sáu bài liên tiếp từ Bài 01, ba bài gần nhất (04-06) đều sạch hoàn toàn VÀ chủ động vượt yêu cầu
tối thiểu (TC7 tuỳ chọn ở Bài 04, ba góc trong một TC ở Bài 05, giờ là tự thêm khoá `id` trong
patch + làm trọn thử thách ở Bài 06). Không cần thay đổi cách ra đề — giữ nguyên hướng mở.
