# Angular Senior-track Resources

Nguyên tắc: **chỉ trích nguồn chính chủ**. Blog/khoá bên ngoài chỉ được vào đây khi tác giả
thuộc Angular team hoặc là tên tuổi đã được kiểm chứng — và luôn kèm cảnh báo phiên bản.

## Knowledge

### Nguồn gốc — dùng để xác nhận API contract
- [angular.dev — tài liệu chính thức Angular](https://angular.dev)
  Nguồn chân lý số 1 cho mọi API. Lưu ý: docs mặc định viết theo **Modern/standalone**;
  phần NgModule nằm rải rác trong `reference/`. Dùng cho: mọi khẳng định về Angular API.
- [angular.dev — Version compatibility](https://angular.dev/reference/versions)
  Bảng Angular ↔ Node ↔ TypeScript ↔ RxJS. Dùng cho: quyết định version, debug lỗi "engine not supported".
  *(Đã tra 2026-08-14: Angular 22.0.x cần Node ^22.22.3 || ^24.15.0 || ^26.0.0, TS >=6.0 <6.1, RxJS ^7.4.)*
- [angular.dev/cli — CLI command reference](https://angular.dev/cli)
  Mọi cờ của `ng new` / `ng generate`. Dùng cho: kiểm cờ còn tồn tại không (đừng tin blog cũ).
- [rxjs.dev — tài liệu RxJS](https://rxjs.dev)
  ⚠️ Trang này là SPA, tool tự động fetch thường không đọc được nội dung —
  khi cần trích chính xác thì đọc JSDoc trong source (xem mục dưới).
- [RxJS source, nhánh 7.x (JSDoc gốc của từng operator)](https://github.com/ReactiveX/rxjs/tree/7.x/src/internal/operators)
  Mô tả gốc của operator nằm ngay trong JSDoc. Dùng cho: trích dẫn chính xác hành vi operator.
- [Angular Update Guide](https://angular.dev/update-guide)
  Sinh checklist migrate giữa 2 version bất kỳ. Dùng cho: **Giai đoạn 2** (Phase 11–17).
- [angular.dev — Migrations](https://angular.dev/reference/migrations)
  Danh sách schematic tự động: standalone, control-flow, inject, signal inputs.
  Dùng cho: Phase 11, 13, 14.

### Công cụ đi kèm dự án
- [Mock Service Worker (MSW) — docs](https://mswjs.io/docs/)
  Chặn request ở tầng Service Worker → app gọi `HttpClient` y như thật. Dùng cho: Lesson 1.2 trở đi.
- [Angular CDK](https://material.angular.dev/cdk/categories)
  Drag & Drop (Lesson 3.3), Table ảo hoá (Lesson 8.2). Dùng cho: Phase 3, 8.
- [NgRx — docs chính thức](https://ngrx.io/docs)
  Store/Effects/Selectors. Dùng cho: Phase 9. Đọc kỹ trang "Why NgRx" trước khi code.

### Sách / bài viết dài — đọc khi muốn đào sâu
- [Angular Blog (blog.angular.dev)](https://blog.angular.dev)
  Bài công bố chính thức của Angular team, giải thích **lý do** đằng sau mỗi thay đổi lớn
  (standalone, signals, zoneless). Dùng cho: trả lời câu phỏng vấn "vì sao Angular đổi hướng?".

## Wisdom (Communities)
- [Angular Community Discord (~44k thành viên)](https://discord.com/invite/angular)
  Kênh hỏi đáp sống nhất. Dùng cho: hỏi khi bí một lỗi cụ thể, xin review kiến trúc.
- [r/Angular2 trên Reddit](https://www.reddit.com/r/Angular2/)
  Tên cũ từ thời Angular 2 nhưng vẫn là subreddit Angular chính. Dùng cho: thảo luận
  xu hướng, so sánh cách làm, đọc kinh nghiệm phỏng vấn thật.
- [Angular GitHub Issues](https://github.com/angular/angular/issues)
  Nơi biết được API nào sắp đổi và **vì sao**. Dùng cho: kiểm chứng khi docs mập mờ.

## Gaps
- Chưa tìm được nguồn tiếng Việt chất lượng cao đủ tin cậy để trích dẫn — hiện dịch/giảng
  lại từ nguồn tiếng Anh. Sẽ bổ sung nếu tìm thấy.
- Chưa có nguồn chuyên sâu về `ControlValueAccessor` ngoài API docs (docs Angular phần này
  khá mỏng) — sẽ tự dựng cheat-sheet ở `reference/` khi tới Phase 3.
- Chưa khảo sát cộng đồng Angular Việt Nam (Facebook group / Discord VN).
  Hỏi người học có muốn không trước khi thêm.
