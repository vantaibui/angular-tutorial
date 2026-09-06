# Lộ trình học Angular (Senior-track) — Classic → Modern — Dự án E-Learning (Mock Data)

> **Nguồn sự thật của khoá `/teach`.** File này do người học soạn. AI không được bịa lesson
> ngoài file này; chỉ được **tách** một lesson quá lớn thành nhiều bài nhỏ (và phải báo trước).
> Ánh xạ từ lesson gốc → số bài thực tế xem ở `lessons/index.html`.

## Vì sao học theo thứ tự Classic → Modern

Phần lớn dự án Angular đang chạy production (và phần lớn job Angular tuyển dụng) vẫn dùng kiến trúc **NgModule + RxJS + class-based Guard/Interceptor** ("Classic Angular", ~v12-v16). Angular Modern (Standalone Components, Signals, `@if/@for`, functional Guard/Interceptor — từ v17+) là hướng đi tương lai nhưng học Modern trước mà bỏ qua Classic sẽ khiến bạn **không đọc hiểu được 80% codebase thật ngoài kia** và không biết migrate khi gặp dự án cũ.

- **Giai đoạn 1 — Angular Classic**: build toàn bộ app bằng NgModule, RxJS thuần, Reactive Forms (kể cả Custom Complex Form), Generic Service/Component, NgRx.
- **Giai đoạn 2 — Angular Modern**: migrate chính app vừa build sang Standalone + Signals + syntax mới — học migration thật chứ không phải build lại từ đầu.

Học lý thuyết cốt lõi xong là code luôn vào dự án **EduCommerce**, dùng mock data qua **MSW**.

Mỗi lesson: 🎯 Mục tiêu · 📚 Kiến thức cốt lõi · 🛠 Bài tập thực hành · ✅ Tiêu chí review.

---

# GIAI ĐOẠN 1 — ANGULAR CLASSIC (NgModule-based)

## PHASE 0 — Nền tảng bắt buộc

### Lesson 0.1 — RxJS sâu
- 🎯 Angular Classic dùng RxJS ở khắp nơi (HttpClient, Forms, Router) — không có Signals để "trốn" RxJS.
- 📚 Observable vs Promise, Subject/BehaviorSubject/ReplaySubject, operator cốt lõi (`map`, `switchMap`, `mergeMap`, `concatMap`, `debounceTime`, `distinctUntilChanged`, `combineLatest`, `takeUntil`) để unsubscribe thủ công — bắt buộc học kỹ vì Classic app phải tự quản lý memory leak.
- 🛠 Viết search-as-you-type thuần RxJS: input Subject → debounce → switchMap giả lập API → log kết quả, chứng minh request cũ bị hủy.
- ✅ Giải thích đúng vì sao dùng `switchMap` cho search, và pattern `takeUntil(this.destroy$)` để tự huỷ subscription trong `ngOnDestroy`.

### Lesson 0.2 — TypeScript Generics chuyên sâu
- 🎯 Generics là công cụ quan trọng nhất để viết code Angular tái sử dụng được (Generic Service, Generic Component, Generic Pipe).
- 📚 Generic function `wrapInArray<T>(value: T): T[]`; generic interface `ApiResponse<T>`; generic class `Repository<T extends { id: string }>`; constraints (`extends`), default generic type, multiple params, `keyof`/`in`.
- 🛠 TS thuần: `ApiResponse<T>`; `InMemoryRepository<T extends {id: string}>` với `add`/`findById`/`update(id, patch: Partial<T>)`; test với `Course` và `User`.
- ✅ Giải thích khác nhau giữa `T` không ràng buộc và `T extends {id: string}`, và vì sao ràng buộc đó cần để gọi được `item.id`.

### Lesson 0.3 — Decorator & Dependency Injection trong Angular Classic
- 🎯 Hiểu DI qua NgModule `providers` — khác `providedIn: 'root'` của Modern.
- 📚 `@NgModule({providers})`, hierarchical injector (module-level vs component-level), `@Injectable()`, `InjectionToken` cho giá trị không phải class.
- 🛠 Đọc + giải thích lại một đoạn NgModule mẫu, chỉ rõ provider nào ở scope nào và vì sao.
- ✅ Giải thích đúng thứ tự resolve dependency qua injector tree.

---

## PHASE 1 — Setup dự án theo kiến trúc NgModule

### Lesson 1.1 — Khởi tạo & kiến trúc Module (Core/Shared/Feature)
- 📚 `CoreModule` (singleton service, interceptor — import 1 lần ở `AppModule`), `SharedModule` (component/pipe/directive dùng chung), Feature Module (lazy-load theo route).
- 🛠 `ng new educommerce-ng-classic --routing --style=scss` (KHÔNG standalone), tạo `CoreModule`, `SharedModule`, `features/courses/courses.module.ts`.
- ✅ Giải thích vì sao `CoreModule` phải guard chống import 2 lần.

### Lesson 1.2 — Cắm MSW & tái sử dụng mock-data
- 🛠 Copy `mock-data/*.json` + `types.ts`, setup MSW trong `main.ts`, viết `handlers.ts`.
- ✅ `GET /api/courses` trả đúng data mock.

### Lesson 1.3 — Generic API Service
- 🎯 Thay vì `CourseService`/`UserService`/`ReviewService` trùng lặp CRUD, viết 1 `GenericApiService<T>`.
- 📚 `class GenericApiService<T> { getAll(): Observable<ApiResponse<T>>; getById(id): Observable<T> }`, kế thừa hoặc compose.
- 🛠 `CourseService extends GenericApiService<Course>`, `UserService extends GenericApiService<User>`.
- ✅ Type-safe: `courseService.getById('x')` trả `Observable<Course>` chứ không phải `any`.

---

## PHASE 2 — Routing Classic

### Lesson 2.1 — RouterModule.forRoot/forChild & Lazy Load Module
- 📚 `loadChildren: () => import('...').then(m => m.CoursesModule)` — khác `loadComponent` của Modern.
- 🛠 Lazy load toàn bộ feature (courses, cart, checkout, dashboard).
- ✅ Network tab thấy chunk tách riêng theo module.

### Lesson 2.2 — Class-based Guard (CanActivate)
- 📚 `@Injectable() class AuthGuard implements CanActivate` — khác `CanActivateFn` của Modern.
- 🛠 `AuthGuard`, `RoleGuard` (nhận qua `route.data['roles']`).
- ✅ Chặn đúng route theo role, redirect kèm `returnUrl`.

---

## PHASE 3 — Reactive Forms & CUSTOM COMPLEX FORMS ⭐

### Lesson 3.1 — Reactive Forms nền tảng
- 📚 `FormBuilder`, `FormGroup`, `FormControl`, `FormArray`, validator built-in, custom validator, cross-field validator (confirm password).
- 🛠 `RegisterForm`, `LoginForm`.
- ✅ Validate đúng, hiển thị lỗi theo `touched`/`dirty`.

### Lesson 3.2 — Custom Form Control với ControlValueAccessor
- 🎯 Kỹ thuật quan trọng nhất để làm form phức tạp thật sự.
- 📚 `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`; provider `NG_VALUE_ACCESSOR`; validator riêng qua `NG_VALIDATORS`.
- 🛠 `<app-rating-input formControlName="rating">` và `<app-tag-input formControlName="tags">` (max 5 tag).
- ✅ `setValue(4)` cập nhật UI; `errors` đúng khi vượt 5 tag; `disable()` disable đúng UI.

### Lesson 3.3 — FormArray động & Nested FormGroup (Course Builder)
- 🎯 Instructor tạo khóa học nhiều Section, mỗi Section nhiều Lesson.
- 📚 `FormArray` lồng nhau, `push()`/`removeAt()`, `formArrayName`/`formGroupName`.
- 🛠 Course info (FormGroup) chứa `sections: FormArray<FormGroup>`, mỗi section chứa `lessons: FormArray<FormGroup>`; kéo-thả bằng Angular CDK.
- ✅ Thêm/xóa không mất data phần khác; submit ra JSON lồng nhau khớp `types.ts`.

### Lesson 3.4 — Dynamic Form từ Schema
- 🎯 Config JSON mô tả form → component generic tự render.
- 📚 Generics + `FormGroup` động qua vòng lặp field config, `ngSwitch` theo `field.type`.
- 🛠 `DynamicFormComponent` nhận `@Input() schema: FormFieldSchema[]`, dùng cả 2 custom control ở 3.2; build lại Course info form bằng schema.
- ✅ Đổi schema mà không sửa template.

### Lesson 3.5 — Async Validator
- 📚 `AsyncValidatorFn`, tránh gọi API liên tục (`debounceTime` trong validator).
- 🛠 Check email tồn tại qua MSW, hiển thị spinner lúc validate.
- ✅ Chỉ gọi API sau khi ngừng gõ.

---

## PHASE 4 — Auth Flow Classic

### Lesson 4.1 — Class-based HttpInterceptor & Refresh Token
- 📚 `class AuthInterceptor implements HttpInterceptor`, đăng ký qua `HTTP_INTERCEPTORS` multi-provider.
- 🛠 Đính token, bắt 401 → refresh → retry (`catchError` + `switchMap`).
- ✅ Demo 401 tự refresh và retry thành công.

### Lesson 4.2 — Auth State bằng BehaviorSubject
- 📚 `BehaviorSubject<User | null>` + `.asObservable()` — cách quản lý global state trước Signals.
- 🛠 `currentUser$`, `isAuthenticated$` (derive bằng `map`).
- ✅ Subscribe qua `async` pipe, không leak.

### Lesson 4.3 — Quên/Đổi mật khẩu (mock flow)
- 🛠 Reactive Form + Router query params.
- ✅ 2 case token hợp lệ/hết hạn hiển thị đúng.

---

## PHASE 5 — Course Listing

### Lesson 5.1 — async pipe & combineLatest cho Filter
- 📚 Gộp search/category/page bằng `combineLatest` + `switchMap`, sync URL qua `Router.navigate`.
- 🛠 `CourseListComponent` filter/search/pagination.
- ✅ Không bắn API thừa, giữ filter khi refresh.

### Lesson 5.2 — Generic List Component
- 📚 `@Input() items: T[]`, `@Input() itemTemplate: TemplateRef<any>`, `ngTemplateOutlet`.
- 🛠 `GenericListComponent<T>` dùng lại cho Course grid và Review list.
- ✅ Cùng 1 component, 2 cách hiển thị khác nhau.

### Lesson 5.3 — Course Detail (forkJoin)
- 🛠 `forkJoin({course, reviews, related})`.
- ✅ Xử lý đúng khi 1 trong 3 API lỗi.

---

## PHASE 6 — Cart & Checkout

### Lesson 6.1 — Cart Service + Optimistic Update
- 🛠 `CartService` (`BehaviorSubject<CartItem[]>`), optimistic add/remove + rollback.
- ✅ Demo rollback đúng.

### Lesson 6.2 — Checkout nhiều bước qua Route con
- 🛠 `/checkout/cart|coupon|payment|success`, Resolver preload data.
- ✅ Back/next giữ data.

### Lesson 6.3 — Payment UI + Custom Form validate số thẻ
- 🛠 `<app-card-number-input>` bằng ControlValueAccessor, tự format `1234 5678 ...`.
- ✅ Format đúng khi gõ, validate đúng.

---

## PHASE 7 — Học bài & Progress

### Lesson 7.1 — Video Player (ViewChild + Directive)
- 🛠 Custom player, Directive `appAutoPause`.

### Lesson 7.2 — Progress đồng bộ qua RxJS
- 📚 `Subject` phát event "lesson completed", component khác subscribe — cố tình thủ công để thấy khác biệt khi học Signals.
- ✅ Progress bar + sidebar cập nhật đúng.

---

## PHASE 8 — Dashboard Admin

### Lesson 8.1 — CRUD Course dùng Dynamic Form
### Lesson 8.2 — Angular Material Table / CDK Table (500 rows, không lag)

---

> ## 🆕 PHASE 8.5 — Change Detection & Performance sâu (thêm 2026-09-06, mở rộng 2026-09-06)
> Phát hiện khi rà lộ trình: Change Detection chưa từng dạy như khái niệm độc lập dù đã dùng
> `markForCheck()` từ Lesson 3.2 và nhắc `OnPush` ba lần trước đó. Câu hỏi phỏng vấn senior kinh điển.
> Mở rộng thêm 3 lesson theo yêu cầu "đào sâu Performance".
>
> ### Lesson 8.5.1 — Change Detection cơ bản: Zone.js, dirty checking, `ApplicationRef.tick()`
> ### Lesson 8.5.2 — `OnPush` thực chiến — điều kiện an toàn để bật
> ### Lesson 8.5.3 — Phân tích bundle: `source-map-explorer`, lazy-load ảnh/font
> ### Lesson 8.5.4 — Core Web Vitals cho Angular SPA (LCP/INP/CLS, Lighthouse)
> ### Lesson 8.5.5 — RxJS + Performance: `shareReplay`, tránh subscribe thừa
> ### Lesson 8.5.6 — `@defer` — deferred loading views (đã verify: stable ở v22, giảm bundle ban đầu)
> ### Lesson 8.5.7 — `NgOptimizedImage` — tối ưu LCP cho ảnh khoá học/avatar
> ### Lesson 8.5.8 — Chrome DevTools Performance — đọc flame graph, tìm bottleneck thật
> - ✅ Đo trước/sau bằng Lighthouse; giải thích được Zone.js gây re-render thừa ở đâu.

---

> ## 🆕 PHASE 8.6 — Realtime với WebSocket/SSE (thêm 2026-09-06)
> Tận dụng nền RxJS đã vững từ Phase 0 — `rxjs/webSocket` là một Observable khác, nhưng vòng đời
> và cách xử lý lỗi khác hẳn HTTP.
>
> ### Lesson 8.6.1 — `rxjs/webSocket` — kết nối, nhận message dạng Observable
> ### Lesson 8.6.2 — Reconnect & backoff khi mất kết nối
> ### Lesson 8.6.3 — Đồng bộ realtime vào state ("có học viên mới enroll")
> - ✅ Ngắt mạng giữa chừng, app tự kết nối lại, không mất event.

---

## PHASE 9 — NgRx sâu

### Lesson 9.1 — Khi nào cần NgRx thay vì Service + BehaviorSubject
- 📚 Redux pattern (Action/Reducer/Selector/Effect) và khi nào đáng đánh đổi.
- 🛠 Migrate `CartService` sang NgRx: `cart.actions|reducer|selectors|effects.ts`.
- ✅ Hoạt động y hệt, xem state qua Redux DevTools.

> 🆕 Mở rộng 2026-09-06 theo yêu cầu: "nhiều bài toán lớn dùng NgRx cần đào sâu cả cách dùng,
> generic setup, lẫn câu hỏi phỏng vấn". Đã tra docs `ngrx.io/guide/entity`: `createEntityAdapter<T>()`
> là pattern generic CHÍNH THỨC của NgRx — cùng tư duy `GenericApiService<T>` đã học ở Lesson 1.3,
> lần này áp cho state thay vì HTTP.
>
> ### Lesson 9.5 — `@ngrx/entity`: `createEntityAdapter<T>()`, setup generic cho MỌI collection
> - 📚 So sánh trực tiếp với `GenericApiService<T>` (Lesson 1.3) — cùng một tư duy, khác tầng.
> ### Lesson 9.6 — Selector composition & memoization sâu
> - 📚 `createSelector`, vì sao selector không tính lại khi state không đổi.
> ### Lesson 9.7 — Effects nâng cao
> - 📚 debounce/switchMap trong effect (nối Lesson 0.1), cancellation, `catchError` đúng chỗ.
> ### Lesson 9.8 — Testing NgRx
> - 🛠 Test reducer/selector thuần; marble testing effect với `provideMockActions`.
> ### Lesson 9.9 — Góc phỏng vấn NgRx
> - 🛠 Bộ câu hỏi tình huống: khi nào NgRx là lựa chọn SAI, debug store không cập nhật, vì sao
>   selector chạy lại, Effect vs Component gọi service trực tiếp.
> - ✅ Trả lời được cả 5 câu tình huống không cần tra lại tài liệu.

---

## PHASE 10 — Testing Classic

### Lesson 10.1 — Unit test Service/Component (Karma+Jasmine hoặc Jest)
- ✅ Coverage phần core > 80%.

### Lesson 10.2 — Test Custom Form Control
- ✅ Test pass cho `writeValue`, `registerOnChange`.

---

> ## 🆕 PHASE 10.5 — Design System cho EduCommerce (thêm 2026-09-06)
> KHÔNG xây thư viện UI mới — tổng hợp component đã tự viết (SharedModule 1.1, RatingInput/TagInput
> 3.2, DynamicForm 3.4) thành hệ thống nhất quán có token, có trang catalogue.
>
> ### Lesson 10.5.1 — Design tokens qua CSS custom properties (màu, spacing, typography)
> ### Lesson 10.5.2 — Style guide page — catalogue mọi custom control đã xây
> ### Lesson 10.5.3 — Theming sáng/tối — áp token, không sửa từng component
> - ✅ Đổi theme không sửa component nào, chỉ đổi giá trị token.

---

> ## 🆕 PHASE 10.6 — i18n (thêm 2026-09-06, mức khảo sát)
> Thật với việc maintain app cũ nhưng ít chiều sâu phỏng vấn hơn — gộp 2 bài thay vì một module lớn.
>
> ### Lesson 10.6.1 — `@angular/localize` — extract, dịch, build nhiều locale
> ### Lesson 10.6.2 — `DatePipe`/`CurrencyPipe` theo locale — đổi `VndPipe` (Lesson 1.1) ra sao
> - ✅ Build ra được 2 locale, giá tiền/ngày tháng hiển thị đúng theo từng locale.
>
> 🆕 Mở rộng 2026-09-06 — Timezone. Bug timezone âm thầm, khó tái hiện, hay hỏi phỏng vấn thực
> chiến. Đã tra docs `angular.dev/api/common/DatePipe`: mặc định dùng LOCAL timezone của trình
> duyệt (KHÔNG phải UTC) — hiểu nhầm phổ biến nhất.
>
> ### Lesson 10.6.3 — Timezone cơ bản: lưu UTC ở server, hiển thị theo timezone người dùng
> - 📚 `DatePipe` mặc định LOCAL, không phải UTC — bẫy hay gặp nhất khi maintain codebase cũ.
> ### Lesson 10.6.4 — `DATE_PIPE_DEFAULT_OPTIONS` & lịch live-class nhiều timezone
> - 🛠 EduCommerce: "lớp học live bắt đầu lúc X" hiển thị đúng giờ cho học viên toàn cầu.
> - ✅ Học viên ở 2 timezone khác nhau thấy đúng giờ local của họ cho CÙNG một buổi học.

---

> ## 🆕 PHASE 10.7 — CDK & Material sâu (thêm 2026-09-06 theo yêu cầu)
> "Hiểu và viết thành thạo, cần cho Senior" — Material chỉ là bộ component dựng sẵn TRÊN CDK.
> Hiểu CDK là hiểu cách tự xây component như Material xây, không chỉ dùng lại. Kỹ năng phân biệt
> senior với người chỉ biết import `MatButtonModule`.
>
> ### Lesson 10.7.1 — CDK Overlay + Portal — xây Custom Modal/Dialog từ đầu
> - 📚 Positioning engine đứng sau dialog/menu/tooltip của Material; backdrop, scroll strategy.
> ### Lesson 10.7.2 — CDK A11y — `FocusTrap`/`LiveAnnouncer`/`FocusMonitor`
> - 🛠 Áp vào Modal vừa xây ở Lesson trước — đóng vòng lặp a11y đã rải rác từ Lesson 3.2.
> ### Lesson 10.7.3 — CDK Overlay nâng cao — Custom Dropdown/Autocomplete (connected positioning)
> ### Lesson 10.7.4 — CDK Virtual Scrolling sâu — custom scroll strategy, quay lại Lesson 8.2
> ### Lesson 10.7.5 — CDK Layout — `BreakpointObserver`, responsive logic trong TS
> ### Lesson 10.7.6 — Material theming — áp design token (Phase 10.5) vào theme Material
> - ✅ Tự xây được Modal + Dropdown accessible từ CDK primitive, không phụ thuộc component Material dựng sẵn.

---

> ## 🆕 PHASE 10.8 — Advanced Forms (thêm 2026-09-06, đào sâu Forms theo yêu cầu)
> Lesson 3.1–3.5 đã rất sâu về cơ chế Forms/CVA; hai lesson này thêm hai tình huống thực chiến
> chưa chạm tới: upload file, và form ở QUY MÔ LỚN.
>
> ### Lesson 10.8.1 — File upload CVA — custom control với progress bar
> - 📚 RxJS + `HttpClient` progress events (`reportProgress: true`, `HttpEventType.UploadProgress`).
> ### Lesson 10.8.2 — Form performance ở quy mô lớn
> - 📚 `OnPush` cho form phức tạp, tối ưu `FormArray` dài (nối Phase 8.5).
> - ✅ Upload thật qua MSW, progress bar chạy đúng; form 50+ field không giật khi gõ.

---

# GIAI ĐOẠN 2 — ANGULAR MODERN (Migrate lên v17+)

> Không build lại app — **migrate chính app Classic vừa xong**, từng phần.

## PHASE 11 — Standalone Components Migration
### Lesson 11.1 — Chuyển từng Feature Module sang Standalone (`ng generate @angular/core:standalone`)
### Lesson 11.2 — `bootstrapApplication` & xóa `AppModule` → `app.config.ts`

## PHASE 12 — Signals cơ bản đến nâng cao

> 🔄 **TÁCH RIÊNG 2026-09-06** theo phản hồi trực tiếp: "từ NgModule qua Modern khá khó khăn để
> tiếp Signal — cần học cơ bản đến nâng cao, đủ khả năng cho dự án MỚI + phỏng vấn". KHÔNG dạy
> Signals như "so sánh nhanh với `BehaviorSubject` rồi migrate" — bốn lesson này đứng ĐỘC LẬP với
> việc migrate, giống cách Phase 0 dạy RxJS trước khi chạm NgModule. Việc migrate app Classic
> sang Signals chuyển hết sang Phase 12.5 bên dưới.

### Lesson 12.1 — Signals cơ bản: `signal()`, `computed()` — mental model reactive
- 📚 Khác Observable ở đâu: pull vs push, không cần subscribe, đọc trực tiếp trong template.
### Lesson 12.2 — `effect()` sâu
- 📚 Injection context, cleanup function, khi nào effect chạy lại, vòng lặp vô hạn hay gặp.
### Lesson 12.3 — Signals nâng cao
- 📚 `untracked()`, `linkedSignal`, bẫy đọc signal sai chỗ (constructor vs field initializer).
### Lesson 12.4 — Góc phỏng vấn Signals
- 🛠 Bộ câu hỏi tình huống: signal vs observable dùng khi nào, `computed` có cache không,
  `effect` vs `computed` khác nhau ở đâu, Signals có thay được RxJS hoàn toàn không.
- ✅ Trả lời được cả bộ câu hỏi không cần tra lại tài liệu; viết được signal/computed/effect
  đúng mà không copy từ ví dụ.

---

## PHASE 12.5 — Signals & NgRx Migration thực chiến

> Sau khi vững nền tảng ở Phase 12, giờ mới áp dụng vào việc MIGRATE app Classic đã xây. Đã tra
> docs: `@angular/forms/signals` (hàm `form()`, experimental v21+) và `@ngrx/signals`
> (SignalStore, đã xác nhận là hướng khuyến nghị cho app mới) — đối xứng hoàn chỉnh: Reactive
> Forms/NgRx Store (Classic) ↔ Signal Forms/SignalStore (Modern).

### Lesson 12.5.1 — `BehaviorSubject` → `signal()`/`computed()`, `toSignal()` — so sánh code cũ
### Lesson 12.5.2 — Viết lại `AuthService` + `CartService`
### Lesson 12.5.3 — `computed()` cho Progress Tracking (so với Subject ở 7.2)
### Lesson 12.5.4 — Angular Signal Forms — hàm `form()`, so với Reactive Forms
### Lesson 12.5.5 — Migrate một phần Course Builder (Lesson 3.3) sang Signal Forms
- ✅ So sánh boilerplate trước/sau; giải thích API còn experimental, rủi ro dùng ở production.
### Lesson 12.5.6 — NgRx SignalStore — `withState`/`withComputed`/`withMethods`
- 📚 So với `@ngrx/store` Classic: bớt boilerplate action/reducer, viết native trên signal.
### Lesson 12.5.7 — Migrate `CartService` (đã qua 2 lần: BehaviorSubject → NgRx) sang SignalStore
- ✅ Khép vòng lặp state management: cùng một tính năng, 3 cách viết, hiểu rõ đánh đổi mỗi cách.

## PHASE 13 — Control Flow mới (`@if`/`@for`/`@switch`)
- ✅ Chạy `ng generate @angular/core:control-flow` rồi review diff.

## PHASE 14 — Functional Guard/Interceptor
- 🛠 `AuthGuard` → `CanActivateFn`; `AuthInterceptor` → `HttpInterceptorFn`; dùng `inject()`.

## PHASE 15 — `resource()`/`rxResource()` cho Data Fetching
- ✅ So sánh code trước/sau, viết nhận xét ưu nhược điểm.

## PHASE 16 — Zoneless Change Detection
- ✅ Giải thích rủi ro/lợi ích, chỗ nào code cũ có thể gãy.
- ⚠️ Lưu ý (2026-09-06): project đã zoneless từ Lesson 0 (Angular 22 `ng new` mặc định vậy) —
  phase này thành "hiểu vì sao nó đã bật sẵn" chứ không phải "thử bật lên". Xem Lesson 3.2.

---

> ## 🆕 PHASE 16.5 — Animation: Classic → Modern (thêm 2026-09-06)
> Đã tra docs chính thức: `@angular/animations` (trigger/state/transition, cần
> `BrowserAnimationsModule`) giờ là API **legacy**; Angular khuyến nghị `animate.enter`/
> `animate.leave` — API biên dịch native, không cần NgModule, và KHÔNG tương thích chung
> component với animation cũ. Ví dụ Classic→Modern rõ nhất của cả khoá.
>
> ### Lesson 16.5.1 — `@angular/animations` Classic: `trigger`/`state`/`transition`
> ### Lesson 16.5.2 — Migrate sang `animate.enter`/`animate.leave`
> - ✅ So sánh code trước/sau, giải thích vì sao hai cách không dùng chung được trong 1 component.

---

> ## 🆕 PHASE 16.6 — SSR sâu: thêm Server-Side Rendering vào app đã có (thêm 2026-09-06, mở rộng 2026-09-06)
> Đã tra docs: `ng add @angular/ssr` dùng được trên app ĐÃ TỒN TẠI, không chỉ lúc `ng new` —
> đúng tình huống senior thật ("sếp muốn SEO tốt hơn cho app cũ"). Mở rộng từ 2 lesson khảo sát
> thành 5 lesson theo yêu cầu "đào sâu SSR" — chạm cả SEO, debug hydration thật, đo hiệu năng.
>
> ### Lesson 16.6.1 — `ng add @angular/ssr` vào app Classic đã có — hybrid rendering, `RenderMode`
> ### Lesson 16.6.2 — Hydration & bẫy thường gặp (`window`/`document`, `TransferState`)
> ### Lesson 16.6.3 — SEO thực chiến — meta tags động, `Title`/`Meta` service cho SSR/Prerender
> ### Lesson 16.6.4 — Debug hydration mismatch thật — tái hiện & sửa lỗi kinh điển
> - 📚 `Date.now()`/`Math.random()` trong template, truy cập `window` lúc constructor.
> ### Lesson 16.6.5 — Performance SSR — TTFB, so sánh CSR/SSR/Prerender bằng Lighthouse
> - ✅ App chạy được cả 3 chế độ SSR/CSR/Prerender theo route, không lỗi hydration mismatch,
>   và đo được TTFB/LCP khác nhau giữa 3 chế độ.

---

## PHASE 17 — Tổng kết: Viết Migration Guide
- ✅ Gửi document, AI phản biện như review kế hoạch migration thật.

---

## Checklist tiến độ

**Giai đoạn 1 — Classic:**
- [ ] Phase 0 (0.1-0.3) — RxJS, Generics, DI/Decorator
- [ ] Phase 1 (1.1-1.3) — Setup NgModule + Generic Service
- [ ] Phase 2 (2.1-2.2) — Routing Classic
- [ ] Phase 3 (3.1-3.5) — Reactive Forms + Custom Complex Forms ⭐
- [ ] Phase 4 (4.1-4.3) — Auth Classic
- [ ] Phase 5 (5.1-5.3) — Course Listing + Generic List Component
- [ ] Phase 6 (6.1-6.3) — Cart & Checkout
- [ ] Phase 7 (7.1-7.2) — Học bài & Progress
- [ ] Phase 8 (8.1-8.2) — Dashboard Admin
- [ ] Phase 8.5 — Change Detection & Performance sâu 🆕 (8 lesson)
- [ ] Phase 8.6 — Realtime WebSocket/SSE 🆕
- [ ] Phase 9 (9.1-9.9) — NgRx sâu 🆕 mở rộng (entity generic, effects nâng cao, testing, phỏng vấn)
- [ ] Phase 10 (10.1-10.2) — Testing
- [ ] Phase 10.5 — Design System 🆕
- [ ] Phase 10.7 — CDK & Material sâu 🆕 (6 lesson — senior UI skill)
- [ ] Phase 10.8 — Advanced Forms 🆕 (file upload, form quy mô lớn)
- [ ] Phase 10.6 — i18n & Timezone 🆕 (4 lesson)

**Giai đoạn 2 — Modern (Migration):**
- [ ] Phase 11 (11.1-11.2) — Standalone Migration
- [ ] Phase 12 (12.1-12.4) — Signals cơ bản đến nâng cao 🔄 tách riêng (đứng độc lập, có góc phỏng vấn)
- [ ] Phase 12.5 (12.5.1-12.5.7) — Signals & NgRx Migration thực chiến + Signal Forms + SignalStore 🆕
- [ ] Phase 13 — Control Flow mới
- [ ] Phase 14 — Functional Guard/Interceptor
- [ ] Phase 15 — resource() API
- [ ] Phase 16 — Zoneless (nâng cao)
- [ ] Phase 16.5 — Animation Classic → Modern 🆕
- [ ] Phase 16.6 — SSR sâu trên app đã có 🆕 (5 lesson)
- [ ] Phase 17 — Migration Guide tổng kết
