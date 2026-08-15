# NOTES — preferences & working notes

## Người học
- Học bằng **tiếng Việt**. Nền lập trình/TS tốt, đã làm dự án Angular thật (junior/mid).
- Ghét học vẹt — luôn phải có **vì sao** + **đánh đổi**, không chỉ "làm thế nào".
- Mục tiêu kép: phỏng vấn/đổi việc + lên senior + maintain codebase cũ
  → **BẬT "góc phỏng vấn"** (A25) ở các khái niệm hay bị hỏi.

## Chế độ dạy
- **Dự án song song: BẬT** — EduCommerce. Mỗi bài phải thêm một mẩu chạy được.
- Trình độ junior/mid → dạy đủ dẫn dắt ở Phase 0–2, **chuyển dần sang CHẾ ĐỘ THỬ THÁCH**
  (đề + tiêu chí → tự build → review 5 trục) từ Phase 3 trở đi.
- Phase 3 (Custom Complex Forms) và mọi bài dính Generics: **giảng kỹ hơn bình thường**,
  nhiều ví dụ nhỏ trước khi giao bài tập lớn (yêu cầu rõ ràng của người học).
- Review code kiểu **PR thật**: kiến trúc → RxJS/Generics đúng chỗ chưa → interface
  implement đủ chưa → performance → best practice.

## Git
- Đã được ủy quyền: **git init + commit theo từng bài** (đã hỏi và người học đồng ý 2026-08-14).
- Message: `teach(angular): Bài NN - <tiêu đề>`. Gom cả code bài tập + index.html +
  learning-records + reference vào commit của bài đó.

## Quyết định kỹ thuật đã chốt (kèm bằng chứng verify)
- **Angular 22.1.4 + `--no-standalone`** thay vì hạ Node xuống 18 để dùng Angular 16.
  Người học chọn 2026-08-14 sau khi được nêu rõ đánh đổi.
- Đã verify THẬT trong sandbox sạch (2026-08-14, Node v24.18.0, npm 11.16.0):
  - `ng new <app> --no-standalone --routing --style=scss --file-name-style-guide=2016`
    → sinh ra `app.module.ts`, `app-routing.module.ts`, `app.component.ts`
    (`standalone: false`) — NgModule thật, không phải giả lập.
  - Test runner mặc định của Angular 22 là **Vitest 4.1.10** (không phải Karma).
    Spec RxJS thuần (không TestBed) chạy pass trong project → dùng làm sân tập Phase 0.
  - `main.ts` v22 dùng `platformBrowser().bootstrapModule(AppModule)`
    (KHÔNG còn `platform-browser-dynamic`).

## Khác biệt Angular 22 vs "Classic v12–v16" — PHẢI nói rõ khi tới nơi
| Chỗ | v12–v16 (codebase cũ) | v22 hôm nay | Bài liên quan |
|---|---|---|---|
| Bootstrap | `platformBrowserDynamic().bootstrapModule()` | `platformBrowser().bootstrapModule()` | 1.1 |
| Tên file | `app.component.ts` | mặc định `app.ts` → ta ép cờ `--file-name-style-guide=2016` | 1.1 |
| HttpClient | `HttpClientModule` trong imports | `HttpClientModule` **deprecated** → `provideHttpClient(withInterceptorsFromDi())` | 1.3 / 4.1 |
| Interceptor class | `HTTP_INTERCEPTORS` multi-provider | vẫn chạy nhưng cần `withInterceptorsFromDi()`; docs cảnh báo có thể bị gỡ sau này | 4.1 |
| Guard class | `implements CanActivate` | **vẫn stable** (không deprecated) — dạy được đúng lộ trình | 2.2 |
| Test | Karma + Jasmine | Vitest mặc định (`--test-runner=karma` vẫn còn) → cần chốt lại ở Phase 10 | 10.1 |
| Standalone | chưa có | mặc định `true`, phải `standalone: false` cho từng component NgModule | 1.1 |

## Điều chỉnh lộ trình so với file gốc (đã báo người học)
- **Thêm Bài 00 — Dựng môi trường**: `ng new` được kéo từ Lesson 1.1 lên Bài 00 để có sân
  tập chạy được trước khi học RxJS. Lesson 1.1 giữ nguyên phần kiến trúc Core/Shared/Feature.
- Một số lesson gốc quá to cho "một bài dạy một thứ" → sẽ **tách** khi tới nơi
  (dự kiến: 3.2, 3.3, 9.1). Sẽ báo trước, không tách âm thầm.

## Cần theo dõi
- [ ] Chốt lại Karma vs Vitest trước Phase 10.
- [ ] Kiểm MSW hoạt động với Angular 22 dev server trước khi soạn Lesson 1.2.
- [ ] Đếm cheat-sheet: cứ 5 bài hoặc hết 1 module → soạn `reference/*.html` (A22).
