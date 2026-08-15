# Mission: Angular Senior-track (Classic → Modern)

## Why
Đạt trình độ **Senior Angular Developer** để (1) đi phỏng vấn / đổi việc Angular,
(2) lên senior ở công ty hiện tại, (3) đủ tự tin maintain & migrate một codebase
Angular cũ. Học Classic (NgModule + RxJS + class Guard/Interceptor) trước vì đó là
thứ 80% codebase production ngoài kia đang chạy, rồi mới migrate lên Modern —
đúng thứ tự một senior thật phải đối mặt.

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
- Máy: macOS 26.5, **Node v24.18.0**, npm 11.16.0, git 2.50.1. Chưa cài Angular CLI global.
- **Angular 22.1.x** (bản mới nhất) chạy ở chế độ NgModule qua `--no-standalone`
  — vì Angular 16 "classic" thật không chạy được trên Node 24. Chỗ nào Angular 22
  đã khác v12–v16 thì phải nói rõ, không dạy như thể chúng giống hệt nhau.
- Nguồn sự thật của lộ trình: `lo-trinh-angular-classic-to-modern.md` (do người học soạn).
  Không tự bịa lesson ngoài lộ trình; được phép **tách** một lesson quá to thành nhiều bài nhỏ.
- Không sang Giai đoạn 2 (Modern) khi Giai đoạn 1 chưa xong.

## Out of scope
- Backend thật (mọi thứ qua MSW mock).
- Angular Universal / SSR, i18n, PWA.
- Thư viện UI ngoài Angular Material/CDK (đã nằm trong lộ trình).
- React/Vue so sánh — chỉ nhắc khi giúp hiểu nhanh một khái niệm.
