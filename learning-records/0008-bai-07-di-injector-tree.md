# 0008 — Bài 07: DI & injector tree — "gần nhất thắng"

- **Ngày:** 2026-10-01
- **Kết quả:** ĐẠT (6/6 TC bắt buộc + TC7 `useClass` tuỳ chọn) — sau 1 lần sửa

## Bằng chứng
Đọc `di.spec.ts` + tự chạy lại: `pnpm exec ng test --include di.spec.ts` → 1 file / 7 tests
passed (Vitest 4.1.11). `pnpm exec tsc --noEmit -p tsconfig.spec.json` sạch.

## Lần nộp đầu — không đạt, yêu cầu sửa
3 component (`LocalProviderComponent`, `ModuleProviderComponent`, `NearestProviderComponent`)
khai `standalone: true`, đúng vào cái bẫy chính lesson cảnh báo ở "Hint 3 · Bẫy setup" VÀ vi
phạm quy ước đã chốt từ Bài 00 (`NOTES.md`): mọi component trong project phải `standalone: false`
vì khoá mô phỏng codebase Angular Classic thật (v12-16), nơi Standalone chưa tồn tại — dùng nó
sớm làm mất tác dụng cảm nhận sự khác biệt khi tới Phase 11 (Migration). Đã yêu cầu sửa, không
đụng tới phần logic DI (đã đúng từ đầu).

## Lần nộp sau khi sửa — đạt
Đổi đúng cả 3 component sang `standalone: false`, gom vào một `DiTestingModule` khai
`declarations` + `exports`, và `TestBed.configureTestingModule({ imports: [DiTestingModule] })`
ở từng test thay vì `imports: [component]`. Không có component nào bị khai trùng ở 2 NgModule
(bẫy Bài 27) vì mỗi test đều `TestBed.resetTestingModule()` ở `beforeEach` trước khi cấu hình lại.

## Nắm được
- TC1: `providedIn: 'root'` → cùng instance qua `toBe`.
- TC2: provider ở COMPONENT → 2 instance riêng biệt, đổi state ở cái này không ảnh hưởng cái kia.
- TC3: không khai ở component, khai ở cấp TestBed (đóng vai "module") → 2 instance DÙNG CHUNG.
- TC4: khai ở CẢ HAI → component luôn thắng (đúng "gần nhất thắng" — ElementInjector được hỏi
  trước EnvironmentInjector).
- TC5/TC6: `InjectionToken` + `useValue`, và `multi: true` trả mảng đúng thứ tự khai báo.
- TC7 (tuỳ chọn, đúng tên lesson đặt): `useClass` tráo `FakeUserService` thay `RealUserService`
  qua một abstract class `UserService` làm token — đúng kỹ thuật mock sẽ dùng ở Phase 10.

## Không có gì phải sửa (sau khi đã sửa phần standalone)
Logic assertion chọn đúng `toBe`/`not.toBe` cho từng TC (không lẫn `toEqual` ở chỗ cần so sánh
THAM CHIẾU). Đặt tên NgModule rõ ràng (`DiTestingModule`), không che giấu cấu trúc.

## Ghi chú về quy trình chấm
Đây là lần ĐẦU TIÊN trong khoá yêu cầu sửa rồi mới chấm ĐẠT (không tính Bài 01, lỗi logic runtime
khác bản chất). Vấn đề lần này là VI PHẠM QUY ƯỚC PROJECT đã chốt từ đầu, không phải lỗi logic —
nhưng vẫn giữ nguyên tắc "sửa xong mới ĐẠT" vì nó ảnh hưởng tới TOÀN BỘ các bài sau (mọi lesson từ
Bài 08 trở đi đều giả định component NgModule Classic).

## Xác nhận xu hướng
Bảy bài liên tiếp, lần đầu có một bài cần quay lại sửa — nhưng sửa đúng, sửa gọn, không đụng
logic đã đúng. Vẫn giữ nguyên hướng đề mở, không cần thêm khung sườn.
