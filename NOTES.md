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
- Phase 3 (Custom Complex Forms), mọi bài dính Generics, và **Signals (Phase 12)**: **giảng kỹ
  hơn bình thường**, nhiều ví dụ nhỏ trước khi giao bài tập lớn (yêu cầu rõ ràng của người học).
  Signals thêm 2026-09-06: người học nói thẳng "từ NgModule qua Modern khá khó khăn để tiếp
  Signal" — không dạy như "so sánh nhanh với BehaviorSubject rồi migrate", mà phải có nhịp
  cơ bản → nâng cao → phỏng vấn riêng, đủ để dùng trong dự án MỚI (không chỉ để migrate app cũ).
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

## 🆕 Mở rộng lộ trình theo yêu cầu 2026-09-06 — Performance, Design System, i18n, Realtime, Animation, SSR
Người học hỏi "đã có performance/design system chưa" → tôi rà thấy CHƯA có (chỉ nhắc trước
`OnPush` 3 lần mà chưa dạy Change Detection nền tảng — lỗ hổng thật, không phải người học bịa ra).
Người học xác nhận muốn thêm cả hai, rồi ngay sau đó bổ sung thêm: i18n, realtime, animation,
Angular SSR — tất cả trong cùng một lượt yêu cầu.

**Đã tra docs chính thức (angular.dev) cho từng cái trước khi thêm — không tin trí nhớ (A6/A26):**
- **Animations:** `@angular/animations` (trigger/state/transition, cần `BrowserAnimationsModule`)
  giờ là **legacy**. API mới `animate.enter`/`animate.leave` là compiler feature native, KHÔNG
  cần NgModule, và **không dùng chung được** với animation cũ trong cùng 1 component.
- **SSR:** `ng add @angular/ssr` dùng được trên app **đã tồn tại**, không chỉ lúc `ng new`.
  Hybrid rendering (`RenderMode`: Server/Client/Prerender theo route), `provideServerRendering()`,
  `provideClientHydration()`.
- **i18n:** build-time qua `@angular/localize` (build riêng theo từng locale), không phải runtime.
- **Realtime:** không phải tính năng riêng của Angular — dùng `rxjs/webSocket`, tự viết
  reconnect/backoff. Fit tốt vì tận dụng đúng nền RxJS đã dạy ở Phase 0.

**Quyết định độ sâu (theo nguyên tắc A15 — không nhồi nhét, chủ đề ít liên quan thì gộp):**
| Chủ đề | Độ sâu | Vì sao |
|---|---|---|
| Change Detection & Performance | ĐẦY ĐỦ, 5 bài | Fit mission mạnh nhất: phỏng vấn senior kinh điển + maintain codebase cũ |
| Realtime | Vừa, 3 bài | Tận dụng RxJS đã vững, không cần kiến thức ngoài khoá |
| Design System | Vừa, 3 bài | Tổng hợp lại component ĐÃ TỰ XÂY (không xây thư viện UI mới — vẫn giữ ranh giới MISSION.md) |
| i18n | Khảo sát, 2 bài | Thật với maintain app cũ nhưng ít chiều sâu phỏng vấn |
| Animation | Khảo sát, 2 bài | Khớp triết lý Classic→Modern của cả khoá, nhưng không phải trọng tâm mission |
| SSR | Khảo sát, 2 bài | Độ phức tạp hydration đủ lớn để thành mảng riêng — giữ mức tình huống senior, không đào sâu |

**Vị trí chèn** (không renumber Bài 00–37 đã viết/đã chấm; chỉ renumber phần "sắp tới" chưa
viết lesson nào — an toàn tuyệt đối):
- Phase 8.5 (Change Detection & Performance) + 8.6 (Realtime) — sau Dashboard Admin, trước NgRx.
- Phase 10.5 (Design System) + 10.6 (i18n) — sau Testing, cuối Giai đoạn 1.
- Phase 16.5 (Animation) + 16.6 (SSR) — sau Zoneless, trước Migration Guide tổng kết.

**Kết quả:** 38 lesson gốc → ~62 bài (tách nhỏ) → **~79 bài** (thêm 17 bài mới, 6 module).
Đã cập nhật đồng bộ: `lo-trinh-angular-classic-to-modern.md` (nguồn sự thật), `MISSION.md`
(sửa Out of scope — SSR/i18n giờ TRONG scope ở mức khảo sát), `lessons/index.html` (renumber
Module 9→22, badge 🆕 cho module mới, callout cuối trang nói thật là ĐÃ thêm ngoài lộ trình gốc
thay vì tuyên bố "không thêm gì" như trước).

**Việc CHƯA làm** (đúng nhịp module-theo-module đã thống nhất): chưa viết lesson HTML đầy đủ
cho 6 module mới — chỉ mới cập nhật roadmap/index làm placeholder "sắp tới". Sẽ soạn khi tới
lượt module đó, giống mọi module trước.

## 🆕 Mở rộng lộ trình LƯỢT 2 — 2026-09-06: CDK/Material sâu + đào sâu SSR/Performance/Forms
Ngay sau lượt 1 (cùng ngày), người học phản hồi cụ thể: (1) muốn MỘT MODULE RIÊNG cho
Material/CDK để "hiểu và viết thành thạo — cần cho Senior"; (2) đào sâu thêm SSR, Performance,
Forms (không phải thêm chủ đề mới, mà MỞ RỘNG 3 module vừa thêm/đã có).

**Đã tra docs thêm trước khi quyết định** (A6/A26):
- **CDK primitives** (`material.angular.dev/cdk/*` — trang là SPA, WebFetch chỉ lấy được
  title, phải dùng WebSearch snippet để lấy nội dung; **cần verify lại bằng tay khi viết lesson
  thật**, ghi rõ ở đây để phiên sau không quên): Overlay (positioning engine sau dialog/menu/
  tooltip), Portal (render nội dung động ở vị trí khác trong DOM), A11y (`FocusTrap`,
  `FocusMonitor`, `LiveAnnouncer`), Layout (`BreakpointObserver`), Scrolling (virtual scroll).
- **`@angular/forms/signals`**: xác nhận CÓ THẬT — hàm `form()`, experimental từ Angular 21,
  các bản cập nhật (`FormRoot`, `submission options`, `debounce`, `getError()`) đã vào 22.0.0,
  dự kiến ổn định trong 2026. Đây là phát hiện quan trọng: cho phép trả lời "đào sâu Forms
  hướng Modern" bằng nội dung THẬT, không phải suy đoán.
- **`@defer`**: xác nhận stable/production-ready ở v22 (không đánh dấu experimental trong docs),
  hỗ trợ trigger `idle/viewport/interaction/hover/immediate/timer/when` + prefetch trigger.

**Quyết định:**
| Yêu cầu | Hành động | Vị trí |
|---|---|---|
| Module UI riêng cho Material/CDK | **Phase 10.7 mới**, 6 lesson | Sau Design System, trước i18n |
| Đào sâu Forms | Phase 10.8 mới (File upload CVA, form quy mô lớn, 2 lesson) **+** Phase 12
  mở rộng thêm Signal Forms (2 lesson) ở Giai đoạn 2 | Cuối Stage 1 + trong Signals Migration |
| Đào sâu Performance | Phase 8.5 mở rộng 5→8 lesson (`@defer`, `NgOptimizedImage`, DevTools
  profiling) | Giữ nguyên vị trí đã chèn ở lượt 1 |
| Đào sâu SSR | Phase 16.6 mở rộng 2→5 lesson (SEO, debug hydration mismatch thật, đo
  TTFB/LCP) | Giữ nguyên vị trí |

**Kết quả:** ~79 bài (lượt 1) → **~96 bài** (lượt 2, +17 bài: 6 CDK/Material + 2 Advanced Forms
+ 2 Signal Forms + 3 Performance + 3 SSR + 1 do dồn dịch). Vẫn KHÔNG đụng Bài 00–37 đã
viết/đã chấm — mọi thay đổi chỉ ở phần "sắp tới" (Bài 38+), an toàn tuyệt đối.

Đã cập nhật đồng bộ: `lo-trinh-angular-classic-to-modern.md`, `MISSION.md`, `lessons/index.html`
(dùng script Python sinh HTML tự động đánh số Bài/Module theo danh sách dữ liệu — tránh lỗi
đếm tay như đã từng xảy ra ở lượt 1). Verify: 96 bài liên tục 0→95, không trùng không thiếu;
25 module liên tục 0→24; cấu trúc HTML sạch (parser check); mọi link còn sống.

**Ghi chú trung thực về quy mô:** 96 bài là con số lớn. Đã nói rõ với người học trong response
rằng đây là lựa chọn có chủ đích (ưu tiên "học cho tới" theo A15 cho các chủ đề fit mission —
Performance, Forms, CDK) chứ không phải nhồi nhét ngẫu nhiên, và roadmap vẫn co giãn được
(gộp nếu nắm nhanh — nguyên tắc "roadmap không phải syllabus đóng" giữ nguyên).

## 🆕 Mở rộng lộ trình LƯỢT 3 — 2026-09-06: NgRx đào sâu + Timezone
Ngay sau lượt 2 (cùng ngày), người học yêu cầu thêm: (1) NgRx cần đào sâu — cách dùng cho bài
toán lớn, setup generic, câu hỏi phỏng vấn; (2) các bài toán liên quan timezone.

**Đã tra docs/nguồn thêm trước khi quyết định** (A6/A26):
- **`@ngrx/entity`** (`ngrx.io/guide/entity/adapter`): `createEntityAdapter<T>()` là pattern
  generic CHÍNH THỨC của NgRx cho collection — xác nhận đây đúng là "generic setup" người học
  hỏi, và nó SONG SONG hoàn hảo với `GenericApiService<T>` đã dạy ở Bài 10 (cùng tư duy generic,
  khác tầng: một cho HTTP, một cho state). Callback tự nhiên, không phải chủ đề rời rạc.
- **`@ngrx/signals` (SignalStore)**: xác nhận qua WebSearch — bản mới nhất 22.0.0, và
  **"NgRx Signals is now the recommended local state management library... for new applications,
  start with NgRx SignalStore"**. Đây là phát hiện quan trọng: cho phép thêm một lesson Modern
  đối xứng thật sự (không phải suy đoán) cho toàn bộ câu chuyện state management của khoá:
  Service+BehaviorSubject (Bài 32) → NgRx Store Classic (Phase 9) → NgRx SignalStore (Phase 12).
- **Timezone**: tra `angular.dev/api/common/DatePipe` — xác nhận `DatePipe` mặc định dùng
  **LOCAL timezone của trình duyệt, KHÔNG PHẢI UTC**. Đây chính là hiểu nhầm phổ biến nhất gây
  bug timezone, nên dùng làm trọng tâm của lesson đầu tiên trong cụm Timezone. Có
  `DATE_PIPE_DEFAULT_OPTIONS` injection token để set timezone mặc định toàn app.

**Quyết định:**
| Yêu cầu | Hành động | Vị trí |
|---|---|---|
| NgRx đào sâu | Phase 9 mở rộng 4→9 lesson: `@ngrx/entity` generic, selector composition,
  effects nâng cao, testing, góc phỏng vấn riêng | Giữ nguyên vị trí (sau Realtime, trước Testing) |
| NgRx hướng Modern | **Phase 12 mở rộng thêm 2 lesson**: NgRx SignalStore + migrate CartService
  lần 3 (BehaviorSubject → NgRx → SignalStore) | Trong Signals Migration, sau Signal Forms |
| Timezone | **Phase 10.6 đổi tên "i18n" → "i18n & Timezone"**, thêm 2 lesson | Giữ nguyên vị trí,
  gộp chung vì cùng nhóm "hiển thị đúng theo người dùng" |

**Kết quả:** ~96 bài (lượt 2) → **~105 bài** (lượt 3, +9: 5 NgRx Classic + 2 NgRx SignalStore +
2 Timezone). Vẫn KHÔNG đụng Bài 00–37 đã viết/đã chấm.

Đã cập nhật đồng bộ: `lo-trinh-angular-classic-to-modern.md`, `MISSION.md`, `RESOURCES.md`,
`lessons/index.html` (tiếp tục dùng script Python sinh HTML tự động đánh số — đã 3 lần liên tiếp
không có lỗi đếm tay nhờ cách này, nên giữ làm quy trình chuẩn cho lần mở rộng sau nếu có).
Verify: 105 bài liên tục 0→104, không trùng không thiếu; 25 module liên tục 0→24; cấu trúc HTML sạch.

**Mẫu hình đáng chú ý:** đây là LƯỢT MỞ RỘNG THỨ BA trong cùng một ngày (2026-08-14 lần đầu hỏi
"đã có performance/design system chưa" → lượt 1; "thêm i18n/realtime/animation/SSR" → vẫn lượt 1;
"thêm CDK/Material + đào sâu SSR/Performance/Forms" → lượt 2; "NgRx đào sâu + timezone" → lượt 3).
Mỗi lượt đều được tra docs trước khi thêm và ghi lại minh bạch trong `lessons/index.html` +
`NOTES.md`. Nếu có lượt 4, tiếp tục đúng quy trình này: tra docs → tính lại số bài bằng script →
verify liên tục/không trùng → cập nhật đồng bộ 4 file (roadmap, MISSION, NOTES, index) → commit.

## 🆕 Mở rộng lộ trình LƯỢT 4 — 2026-09-06: Tách Signals thành module riêng (cơ bản→nâng cao→phỏng vấn)
Người học phản hồi trực tiếp về CÁCH DẠY (không phải nội dung mới): "với 1 dev từ NgModule qua
Modern thì tôi cũng khá khó khăn để tiếp Signal — cần học cơ bản đến nâng cao cũng như khả năng
qua new prj + interview". Đây là tín hiệu quan trọng: Phase 12 cũ (7 lesson, toàn bộ đóng khung
kiểu "so sánh với BehaviorSubject rồi migrate") không đủ — cần một module Signals ĐỘC LẬP trước.

**Hành động:** tách Phase 12 làm hai:
- **Phase 12 mới (4 lesson)** — Signals cơ bản đến nâng cao, KHÔNG nhắc tới migrate:
  `signal()`/`computed()` (mental model), `effect()` sâu, nâng cao (`untracked`, `linkedSignal`,
  bẫy), và một lesson góc phỏng vấn Signals riêng — mirror đúng cấu trúc `Lesson 9.9` (góc phỏng
  vấn NgRx) vừa thêm ở lượt 3.
- **Phase 12.5 (7 lesson, giữ nguyên nội dung cũ)** — Signals & NgRx Migration thực chiến: mọi
  lesson migrate BehaviorSubject/NgRx/Forms sang Signals dồn hết vào đây, chạy SAU khi nền tảng
  đã vững.

**Ghi vào "Chế độ dạy" (mục đầu NOTES.md):** thêm Signals vào danh sách chủ đề cần "giảng kỹ hơn
bình thường, nhiều ví dụ nhỏ trước bài tập lớn" — cùng nhóm với Forms/Generics đã có từ đầu khoá.
Đây LÀ preference lâu dài, sẽ áp dụng khi thật sự soạn Phase 12, không chỉ ảnh hưởng cấu trúc.

**Kết quả:** ~105 bài (lượt 3) → **~109 bài** (lượt 4, +4 lesson do tách — nội dung không đổi,
chỉ thêm 4 lesson nền tảng mới). Vẫn không đụng Bài 00–37 đã viết/đã chấm.

Đã cập nhật đồng bộ: `lo-trinh-angular-classic-to-modern.md`, `MISSION.md`, `lessons/index.html`
(lần thứ 4 dùng script sinh HTML tự động — 4/4 lần không lỗi đếm tay). Verify: 109 bài liên tục
0→108, không trùng không thiếu; 26 module liên tục 0→25.

**Tổng kết 4 lượt mở rộng trong 1 ngày (2026-09-06):** 38 lesson gốc → 109 bài. Đã nói rõ với
người học đây là con số lớn nhưng roadmap co giãn (gộp nếu nắm nhanh). Nếu có lượt 5+, giữ đúng
quy trình đã ổn định: tra docs trước → dùng script Python tính lại số bài (không đếm tay) →
verify liên tục/không trùng bằng script → cập nhật đồng bộ 4 file → nói rõ với người học đây là
thay đổi ngoài lộ trình gốc, không âm thầm.

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
- **Đã soạn: Bài 00–35** (hết Module 7 — Cart &amp; Checkout). Người học đã HOÀN THÀNH Bài 00-03,
  đang làm Bài 04. Module 5-7 soạn trước theo yêu cầu "chốt báo nhiều đó tiếp tục soạn bài"
  (2026-09-07) rồi "tiếp tục soạn" (2026-09-08, hai lượt).
- Người học yêu cầu (2026-08-27) soạn trước **TẤT CẢ** bài. Đã báo ràng buộc: từ Module 2 trở đi
  các bài phụ thuộc code lẫn nhau → phải dựng **app EduCommerce tham chiếu** trong sandbox rồi
  soạn bài từ đó, và đi **theo đúng thứ tự module**, không nhảy cóc.
- **App tham chiếu:** `<scratchpad>/ref/educommerce-ng-classic/` — **55/55 test xanh**, tsc sạch,
  2 lazy chunk tách thật, MSW worker phục vụ HTTP 200, CDK 22.1.4.

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
- `reference/forms-cheatsheet.html` — Bài 15–23.
- `reference/auth-classic-cheatsheet.html` — Bài 24–27.
- `reference/course-listing-cheatsheet.html` — Bài 28–31.
- `reference/cart-checkout-cheatsheet.html` — Bài 32–35.
- Mốc kế tiếp: sau **Bài 37** HOẶC khi Module 8 xong.

### Phát hiện khi verify Module 7 (2026-09-08, đã đưa vào bài)
Sandbox tiếp tục dùng `<scratchpad>/ref/educommerce-ng-classic/`. Thêm `CartService` (optimistic
+ rollback), `cart-handlers.ts`/`coupon-handlers.ts` (MSW), toàn bộ `CheckoutModule` (shell +
4 route con: cart/coupon/payment/success), `CheckoutStateService` (module-scoped),
`CouponResolver` (class `Resolve<Coupon[]>`), `CardNumberInputComponent` (CVA thứ ba). Kết quả
cuối: **44/44 test xanh** (11 file), `tsc --noEmit` sạch.
- **Công cụ mới: `RouterTestingHarness`** (`@angular/router/testing`) — test điều hướng THẬT qua
  Router thật thay vì tự chế `ActivatedRoute` giả. Dùng lần đầu ở Bài 33/34 cho route con +
  resolver. `navigateByUrl()` trả về component ở OUTLET GỐC của harness — muốn lấy component ở
  outlet LỒNG bên trong (route con thật sự), phải `fixture.debugElement.query(By.directive(Type))`,
  KHÔNG `routeDebugElement.injector.get(ComponentClass)` (NG0201 — component NgModule-declared
  không tự là DI token của chính nó).
- **🔴 Deadlock thật giữa `await` và `httpMock.flush()`:** `RouterTestingHarness.create(url)` gọi
  nội bộ `await router.navigateByUrl(url)` — Promise đó CHỈ resolve sau khi resolver (và HTTP
  request bên trong) xong. `const harness = await RouterTestingHarness.create(...)` rồi mới tìm
  request để flush → treo tới khi hết timeout, vì dòng flush nằm SAU await mà chính request đó
  lại là thứ khiến await không xong. Sửa: tách Promise ra
  (`const p = RouterTestingHarness.create(...)`), `await new Promise(r => setTimeout(r))` để
  nhường vòng lặp sự kiện, flush request, RỒI mới `await p`. Đưa thành quy tắc chung ở Bài 34:
  không `await` ngay một thao tác có phụ thuộc hai chiều với việc bạn cần làm tiếp theo.
- **DI theo cấp cho state chia sẻ giữa nhiều bước:** `CheckoutStateService` khai ở `providers`
  của `CheckoutModule` (không `providedIn:'root'`, không khai ở từng step component) — verify
  bằng test so sánh `toBe()` hai instance inject từ 2 component con khác nhau. Giải thích rõ tại
  sao `root` sai (rò rỉ state giữa 2 phiên checkout không liên quan) ở Bài 33.
- **`HttpTestingController.expectOne(url)` dạng string khớp `urlWithParams`** — nhắc lại phát
  hiện Module 6, áp dụng lại khi test `CartService`/`CouponResolver`.

### Phát hiện khi verify Module 6 (2026-09-08, đã đưa vào bài)
Sandbox tiếp tục dùng `<scratchpad>/ref/educommerce-ng-classic/` (đã có sẵn từ Module 5). Thêm
`GenericApiService<T>`, `CourseService`, `course-handlers.ts` (MSW), `GenericListComponent<T>`,
`CourseListComponent`, `CourseDetailComponent`. Kết quả cuối: **30/30 test xanh** (7 file),
`tsc --noEmit` sạch.
- **🔴 PHÁT HIỆN LỚN — `markForCheck()` không chỉ cho CVA:** quy tắc Bài 16 mục 5 (zoneless cần
  báo CD tường minh khi state đổi ngoài event template) hoá ra áp dụng cho MỌI `.subscribe()` thủ
  công, không riêng `ControlValueAccessor`. Phát hiện khi verify `CourseDetailComponent`
  (`forkJoin` + `.subscribe()` gán `this.data`/`this.loading`): state component đúng 100%
  (verify bằng field trực tiếp), nhưng `fixture.detectChanges()` gọi lại vẫn không vẽ DOM mới —
  kể cả gọi trực tiếp `fixture.changeDetectorRef.detectChanges()` hay `await fixture.whenStable()`.
  Chỉ hết khi thêm `inject(ChangeDetectorRef).markForCheck()` trong callback `.subscribe()`.
  Đã tổng quát hoá thành quy tắc rõ ràng ở Bài 29/31: "bất kỳ đâu `.subscribe()` thủ công NGOÀI
  event template ở app zoneless đều cần `markForCheck()`, bất kể component có `OnPush` hay không."
- **Thiết kế lại từ `combineLatest` 3 subject rời rạc sang 1 `BehaviorSubject<FilterState>`:**
  phát hiện khi thêm yêu cầu UX "đổi search thì reset page" — với 3 subject riêng, `onSearch()`
  phải gọi `pageSubject.next(1)` RỒI `searchSubject.next(value)`, tạo 2 emission (2 request) cho
  1 hành động. Giải pháp: gộp thành 1 state object, `patchFilter()` merge nhiều field rồi
  `.next()` đúng 1 lần. Dạy ở Bài 28 (dùng combineLatest đúng cách trước) rồi Bài 29 (lý do đổi).
- **`debounceTime` đặt trên state đã gộp làm trễ CẢ lần load đầu tiên:** vì nó áp dụng cho MỌI
  emission qua nó, không riêng gõ phím. Sửa bằng cách tách `Subject<string>` riêng cho bàn phím
  thô, debounce ở đó, patch vào `filterSubject` (không debounce) sau khi debounce đã xảy ra.
- **`HttpTestingController.expectOne(url: string)` so khớp `urlWithParams`, không phải `url`
  trơn:** `expectOne('/api/courses')` báo "found none" dù request đúng là tới
  `/api/courses` — vì server trả về `/api/courses?page=1&limit=12`. Phải dùng predicate
  `(r) => r.url === '/api/courses'` (so `.url`, bỏ qua query) khi muốn khớp bất kể params.
- Bug thật khác lặp lại y hệt Bài 27: khai trùng `CourseListComponent`/`CourseDetailComponent`/
  `GenericListComponent` ở cả module thật (`CoursesModule`/`SharedModule`) lẫn `TestHostModule`
  trong spec → `NG6007`. Sửa bằng thêm `exports` vào module thật và cho `TestHostModule`
  **import** module đó thay vì khai lại.

### Phát hiện khi verify Module 5 (2026-09-07, đã đưa vào bài)
Sandbox dựng lại từ đầu tại `<scratchpad>/ref/educommerce-ng-classic/` (sandbox Module 2–4 đã dọn
trước đó trong session). Kết quả cuối: **16/16 test xanh** (4 file: auth-interceptor, auth-service,
reset-password, app.component mặc định), `tsc --noEmit -p tsconfig.spec.json` sạch.
- **`NG04002` khi test nhánh refresh thất bại → điều hướng `/login`:** interceptor gọi
  `router.navigate(['/login'])`, nhưng test dùng `provideRouter([])` (0 route) → unhandled
  rejection "Cannot match any routes", làm bẩn kết quả chạy dù mọi `expect()` vẫn xanh. Sửa bằng
  cách thêm route `login` thật (`LoginStubComponent` rỗng) vào `provideRouter`. Đã đưa thành quy
  tắc chung ở Bài 25: **bất kỳ test nào chạm code gọi `router.navigate()` phải đăng ký route đó
  thật trong cấu hình router của test.**
- **Khai trùng `ResetPasswordComponent` ở 2 NgModule** (test tự khai lại trong `TestHostModule`
  trong khi `AuthFeatureModule` đã khai): lỗi biên dịch AOT — đúng quy tắc "CoreModule chỉ import
  1 lần" ở Bài 08 nhưng áp cho component thay vì module. Sửa bằng thêm
  `exports: [ResetPasswordComponent]` vào `AuthFeatureModule` và cho `TestHostModule` **import**
  module đó thay vì khai lại component.
- Cả hai lỗi trên đều là lỗi thật gặp khi verify, không phải dựng sẵn — đã đưa vào Bài 25/27 dưới
  dạng callout "🔥 Bug thật tôi gặp khi soạn bài này".

### 🔴 PHÁT HIỆN LỚN khi verify Module 4 — ẢNH HƯỞNG CẢ KHOÁ
**Angular 22 `ng new` mặc định ZONELESS.** `package.json` KHÔNG có `zone.js`,
`angular.json` không có `polyfills`. Phát hiện khi test CVA: chiều component→form (bấm chuột)
xanh, chiều form→component (`writeValue`, `setDisabledState`) ĐỎ — DOM không cập nhật.
- **Lời giải đã verify:** `inject(ChangeDetectorRef)` + `markForCheck()` trong `writeValue`
  và `setDisabledState`. Sau khi thêm: 39/39 xanh.
- **Đã dạy ở Bài 16 mục 5 + Bài 17**, kèm cách nhận dạng triệu chứng.
- ⚠️ **PHẢI CHỈNH LỘ TRÌNH:** file gốc xếp Zoneless ở **Phase 16 (Bài 59)** như thứ "sắp bật lên".
  Thực tế project ĐÃ zoneless từ Bài 00. Khi tới Bài 59 phải đổi khung bài từ "bật zoneless"
  sang "hiểu vì sao nó đã bật sẵn + chỗ nào code kiểu cũ sẽ gãy". Đã ghi vào Bài 16.

### Phát hiện khác ở Module 4 (đã đưa vào bài)
- **Component test PHẢI thuộc một `@NgModule` lúc BIÊN DỊCH.** Khai qua
  `TestBed.configureTestingModule({declarations})` là quá muộn → trình biên dịch template báo
  `'app-x' is not a known element`. Phải khai `@NgModule` ngay trong file spec.
- **Mặc định sai kiểu trong dynamic form:** `tags` mặc định `''` thay vì `[]` khiến
  `TagInputComponent` render từng ký tự thành chip.
- **Async validator đặt nhầm mảng** (vị trí 2 thay vì 3) → không chạy, không lỗi, form luôn valid.
- **`timer()` chứ không `debounceTime()`** trong async validator: Angular gọi lại validator từ đầu
  mỗi lần giá trị đổi nên mỗi lần là một Observable mới, `debounceTime` không có gì để gộp.

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
