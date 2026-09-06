# Mission: Angular Senior-track (Classic → Modern)

## Why
Đạt trình độ **Senior Angular Developer** để (1) đi phỏng vấn / đổi việc Angular,
(2) lên senior ở công ty hiện tại, (3) đủ tự tin maintain & migrate một codebase
Angular cũ. Học Classic (NgModule + RxJS + class Guard/Interceptor) trước vì đó là
thứ 80% codebase production ngoài kia đang chạy, rồi mới migrate lên Modern —
đúng thứ tự một senior thật phải đối mặt.

## Performance & Modern mở rộng (thêm 2026-09-06)
Theo yêu cầu trực tiếp, đã bổ sung 6 chủ đề ngoài 38 lesson gốc — đã tra docs chính thức
(angular.dev) cho từng cái trước khi thêm, xem chi tiết & nguồn trong `NOTES.md`:
- **Change Detection & Performance sâu** (Giai đoạn 1, sau Dashboard Admin) — fit mission mạnh
  nhất: câu hỏi phỏng vấn senior kinh điển + trực tiếp phục vụ việc maintain codebase cũ.
- **Realtime (WebSocket/SSE)** — tận dụng nền RxJS đã có, không cần kiến thức mới ngoài khoá.
- **Design System** — tổng hợp component đã tự xây, không phải xây thư viện UI mới.
- **i18n** — thật với việc maintain app cũ, giữ ở mức khảo sát (2 bài) vì ít chiều sâu phỏng vấn.
- **Animation Classic → Modern** — khớp đúng triết lý cả khoá: `@angular/animations` (NgModule,
  giờ là legacy) → `animate.enter`/`animate.leave` (API native, Angular khuyến nghị).
- **SSR** — `ng add @angular/ssr` dùng được trên app ĐÃ CÓ (không chỉ lúc `ng new`), tình huống
  senior thật; giữ mức khảo sát (2 bài) vì độ phức tạp hydration đủ lớn để thành mảng riêng.

Tổng lộ trình: **~79 bài** (từ ~62). Xem toàn cảnh mới nhất ở `lessons/index.html`.

## Success looks like
- Đọc hiểu & sửa được một codebase Angular NgModule-based lạ mà không hoảng.
- Tự viết custom form control bằng `ControlValueAccessor` (rating, tag input, card number)
  hoạt động đầy đủ trong `FormGroup`: value, validator, disabled state.
- Build được form phức tạp: nested `FormArray` (Course Builder) + dynamic form render từ schema.
- Dùng Generics viết `GenericApiService<T>` và `GenericListComponent<T>` tái sử dụng thật,
  type-safe (không có `any` lọt lưới).
- Giải thích được RxJS operator nào cho bài toán nào và vì sao (`switchMap` vs `mergeMap`
  vs `concatMap`), tự quản memory leak bằng `takeUntil`.
- Migrate app Classic → Standalone + Signals + control flow mới, giải thích được
  lợi ích / rủi ro từng bước, không regression.
- Trả lời trôi chảy các câu phỏng vấn Angular senior hay gặp.

## Parallel project
**Có — "EduCommerce"**: nền tảng e-learning kiêm bán khóa học (course listing, cart,
checkout, học bài + progress, instructor course builder, admin dashboard). Frontend
Angular thuần, data giả lập qua **MSW** dùng bộ mock có sẵn ở `./mock-data/`
(courses, lessons, users, reviews, enrollments, coupons, categories, instructors + `types.ts`).
Mỗi bài phải đóng góp một mẩu **chạy được** vào app này.

## Constraints
- Học bằng **tiếng Việt**. Nền TypeScript/lập trình đã có; đã làm dự án Angular thật ở
  mức junior/mid → không cần dạy lại cú pháp cơ bản, cần đào phần "vì sao".
- Máy: macOS 26.5, **Node v24.18.0**, **pnpm 11.13.1** (trình quản lý gói của khoá), git 2.50.1.
  Chưa cài Angular CLI global — gọi qua `pnpm dlx` khi cần.
- **Angular 22.1.x** (bản mới nhất) chạy ở chế độ NgModule qua `--no-standalone`
  — vì Angular 16 "classic" thật không chạy được trên Node 24. Chỗ nào Angular 22
  đã khác v12–v16 thì phải nói rõ, không dạy như thể chúng giống hệt nhau.
- Nguồn sự thật của lộ trình: `lo-trinh-angular-classic-to-modern.md` (do người học soạn).
  Không tự bịa lesson ngoài lộ trình; được phép **tách** một lesson quá to thành nhiều bài nhỏ.
- Không sang Giai đoạn 2 (Modern) khi Giai đoạn 1 chưa xong.

## Out of scope
- Backend thật (mọi thứ qua MSW mock).
- PWA.
- Thư viện UI ngoài Angular Material/CDK — "Design System" (đã thêm 2026-09-06) là tổng hợp
  lại component TỰ VIẾT của khoá (Bài 08/17/18/22), không phải xây/dùng thư viện UI mới.
- React/Vue so sánh — chỉ nhắc khi giúp hiểu nhanh một khái niệm.
- SSR/i18n sâu (chỉ ở mức khảo sát — xem mục Performance & Modern mở rộng bên dưới).
