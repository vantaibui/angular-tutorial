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

## Git — ⚠️ QUY ƯỚC ĐÃ ĐỔI (2026-08-16)
- Đã được ủy quyền git init + commit (người học đồng ý 2026-08-14).
- **Soạn bài theo TRỌN MODULE, commit MỘT LẦN cho cả module** — người học chốt 2026-08-16.
  Điều này **ghi đè** quy ước mặc định "mỗi bài 1 commit" ở `TEACH-PREFERENCES.md`.
- Message: `teach(angular): Module N - Bài XX-YY (<chủ đề>)`.
  Gom `lessons/*`, `lessons/index.html`, `reference/*`, `NOTES.md` của cả module vào một commit.
- **Code bài tập người học tự viết vẫn commit RIÊNG** khi họ nộp — không trộn vào commit soạn bài,
  để lịch sử phân biệt được "tài liệu tôi soạn" và "code người học làm".
- Remote: `https://github.com/vantaibui/angular-tutorial` (branch `master`). Push sau mỗi commit module.
- Không commit rác: đã có `.gitignore` (node_modules, dist, .angular, .env, settings.local.json).

## Quyết định kỹ thuật đã chốt (kèm bằng chứng verify)
- **Angular 22.1.4 + `--no-standalone`** thay vì hạ Node xuống 18 để dùng Angular 16.
  Người học chọn 2026-08-14 sau khi được nêu rõ đánh đổi.
- Đã verify THẬT trong sandbox sạch (2026-08-14, Node v24.18.0):
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
| DI decorator | chỉ có `@Injectable` | **có thêm `@Service()`** (verify trong `@angular/core@22.1.2`: `declare const Service: ServiceDecorator`, có option `autoProvided`). `@Injectable` KHÔNG deprecated. Khoá dùng `@Injectable` có chủ đích. | Bài 07 |
| Injector naming | `ModuleInjector` | docs gọi là `EnvironmentInjector` | Bài 07 |

## Điều chỉnh lộ trình so với file gốc (đã báo người học)
- **Thêm Bài 00 — Dựng môi trường**: `ng new` được kéo từ Lesson 1.1 lên Bài 00 để có sân
  tập chạy được trước khi học RxJS. Lesson 1.1 giữ nguyên phần kiến trúc Core/Shared/Feature.
- Một số lesson gốc quá to cho "một bài dạy một thứ" → sẽ **tách** khi tới nơi
  (dự kiến: 3.2, 3.3, 9.1). Sẽ báo trước, không tách âm thầm.

## Trình quản lý gói: pnpm (chốt 2026-08-19)
Người học yêu cầu dùng **pnpm** thay npm. Đã verify TOÀN BỘ trên sandbox sạch
(pnpm 11.13.1 / Node v24.18.0 / Angular CLI 22.1.4):
- `pnpm dlx @angular/cli@22 new <app> ... --package-manager=pnpm` → NgModule project đúng như npm.
- `pnpm test` (7/7 xanh, gồm TestBed + RxJS + spec generics) · `pnpm exec tsc --noEmit` sạch ·
  `pnpm build` OK · `pnpm start` phục vụ HTTP 200 sau 3s.
- **Không** gặp vấn đề phantom dependency dù pnpm dùng node_modules nghiêm ngặt.
- `package.json` được ghi `"packageManager": "pnpm@11.13.1"` → khoá cả team/CI vào pnpm.

**Bẫy cú pháp đã đâm vào khi verify** (đã đưa vào Bài 00 làm callout danger):
`pnpm dlx @angular/cli@22 **ng** new ...` SAI — pnpm dlx tự chạy binary `ng` của gói, nên phải
viết `pnpm dlx @angular/cli@22 **new** ...`. Viết sai ra lỗi
`Unknown arguments: standalone, routing, ..., ng, new, <app>` rất khó lần.

Bảng quy đổi dùng trong mọi bài: `npm test`→`pnpm test` · `npm start`→`pnpm start` ·
`npx tsc`→`pnpm exec tsc` · `npx <pkg> <cmd>`→`pnpm dlx <pkg> <cmd>` (bỏ tên binary trùng).

## Trạng thái soạn bài
- **Đã soạn: Bài 00–14** (hết Module 3). Người học đã HOÀN THÀNH Bài 00.
- Người học yêu cầu (2026-08-27) soạn trước **TẤT CẢ** bài. Đã báo ràng buộc: từ Module 2 trở đi
  các bài phụ thuộc code lẫn nhau → phải dựng **app EduCommerce tham chiếu** trong sandbox rồi
  soạn bài từ đó, và đi **theo đúng thứ tự module**, không nhảy cóc.
- **App tham chiếu:** `<scratchpad>/ref/educommerce-ng-classic/` — **25/25 test xanh**, tsc sạch,
  2 lazy chunk (`courses-module`, `dashboard-module`) tách thật, MSW worker phục vụ HTTP 200.

### Phát hiện khi verify Module 2 (đã đưa vào bài)
- **pnpm chặn postinstall** → `pnpm add -D msw@2` xong thì MỌI lệnh `pnpm exec` bị chặn tới khi
  duyệt. Key cấu hình đúng ở pnpm 11.13.1 là **`allowBuilds` (map) trong `pnpm-workspace.yaml`** —
  `onlyBuiltDependencies` trong package.json (theo blog cũ) KHÔNG ăn. Tìm ra bằng cách chạy
  `pnpm approve-builds msw` rồi xem nó ghi vào đâu.
- **Handler MSW phải viết `*/api/...`** chứ không phải `/api/...`: path tương đối chạy ở browser
  nhưng KHÔNG khớp trong `msw/node` (không có origin) → test đỏ khó hiểu.
- **`import.meta.env` không tồn tại** trong build Angular (đó là API Vite) → dùng `isDevMode()`.
- **Giới hạn thật của `isDevMode()`:** kiểm lúc chạy, không phải lúc build → chunk MSW (~330 kB)
  VẪN nằm trong `dist/`. Đã nói thẳng trong Bài 09 thay vì giấu.
- **`HttpTestingController` + Observable lazy:** quên `.subscribe()` thì `expectOne` báo
  "found none". Đã biến thành callout ở Bài 10.

## Trạng thái soạn bài (cũ)
- ~~Đã soạn: Bài 00–07~~ Người học **chưa nộp bài nào** → chưa có learning-record,
  chưa có `GLOSSARY.md` (theo A23: chỉ thêm thuật ngữ khi người học đã dùng ĐÚNG).
- Người học yêu cầu soạn trước cả Module 1 (2026-08-15). Đã báo rõ đánh đổi: bài chưa hiệu chỉnh
  theo năng lực thật → **phải sửa lại bài sau nếu họ vấp hoặc thấy quá dễ ở Bài 01–02**.
- Sau khi người học nộp hết Module 1 → ra **mini-quiz trộn** 7 bài (A24) trước khi mở Phase 1.

### Cheat-sheet (đếm theo A22)
- `reference/rxjs-cheatsheet.html` — Bài 01–04.
- `reference/generics-di-cheatsheet.html` — Bài 05–07.
- `reference/kien-truc-routing-cheatsheet.html` — Bài 08–14.
- Mốc kế tiếp: sau **Bài 19** HOẶC khi Module 4 xong (cái nào tới trước).

### Phát hiện khi verify Module 3 (đã đưa vào bài)
- **`router.navigate()` trả `true` khi guard redirect bằng `UrlTree`** — KHÔNG phải `false`.
  Tôi đoán sai lúc viết test, phải chạy mới biết. Hệ quả: đừng dùng giá trị trả về của
  `navigate()` để phát hiện bị guard chặn; kiểm `router.url`.
- **`providedIn:'root'` KHÔNG ép code vào main chunk.** Grep vào `dist/`: `CourseService`
  (`'root'`) nằm trong **lazy chunk** vì chỉ lazy module import nó; `AuthGuard` (cũng `'root'`)
  nằm ở **main** vì `AppRoutingModule` eager import. Bundling theo đồ thị import, DI scope theo
  decorator — hai hệ thống độc lập.
- **Class guard vẫn stable ở v22** — đã verify bằng test điều hướng Router thật, không chỉ gọi
  `canActivate()` trực tiếp.
- **`route.data` là `Record<string, any>`** — gõ nhầm `role` thay `roles` không có lỗi biên dịch
  và biến route admin thành công khai.

### Code đã verify trong sandbox (dùng lại khi chấm bài)
Sandbox: `<scratchpad>/final-verify/educommerce-ng-classic/`. Toàn bộ 25 test xanh + `tsc` sạch.
Đã chứng minh phương pháp `@ts-expect-error` là thật (cố tình thêm directive thừa → `TS2578`).

## Cần theo dõi
- [ ] Chốt lại Karma vs Vitest trước Phase 10.
- [ ] Kiểm MSW hoạt động với Angular 22 dev server trước khi soạn Bài 09.
- [ ] Bài 12 (lazy-load) phải quay lại chốt điểm "module eager gộp vào injector gốc" đã nêu ở Bài 07.
