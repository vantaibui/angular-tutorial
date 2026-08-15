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

## PHASE 9 — NgRx

### Lesson 9.1 — Khi nào cần NgRx thay vì Service + BehaviorSubject
- 📚 Redux pattern (Action/Reducer/Selector/Effect) và khi nào đáng đánh đổi.
- 🛠 Migrate `CartService` sang NgRx: `cart.actions|reducer|selectors|effects.ts`.
- ✅ Hoạt động y hệt, xem state qua Redux DevTools.

---

## PHASE 10 — Testing Classic

### Lesson 10.1 — Unit test Service/Component (Karma+Jasmine hoặc Jest)
- ✅ Coverage phần core > 80%.

### Lesson 10.2 — Test Custom Form Control
- ✅ Test pass cho `writeValue`, `registerOnChange`.

---

# GIAI ĐOẠN 2 — ANGULAR MODERN (Migrate lên v17+)

> Không build lại app — **migrate chính app Classic vừa xong**, từng phần.

## PHASE 11 — Standalone Components Migration
### Lesson 11.1 — Chuyển từng Feature Module sang Standalone (`ng generate @angular/core:standalone`)
### Lesson 11.2 — `bootstrapApplication` & xóa `AppModule` → `app.config.ts`

## PHASE 12 — Signals Migration
### Lesson 12.1 — `BehaviorSubject` → `signal()`/`computed()`, `toSignal()`
### Lesson 12.2 — `computed()` cho Progress Tracking (so với Subject ở 7.2)

## PHASE 13 — Control Flow mới (`@if`/`@for`/`@switch`)
- ✅ Chạy `ng generate @angular/core:control-flow` rồi review diff.

## PHASE 14 — Functional Guard/Interceptor
- 🛠 `AuthGuard` → `CanActivateFn`; `AuthInterceptor` → `HttpInterceptorFn`; dùng `inject()`.

## PHASE 15 — `resource()`/`rxResource()` cho Data Fetching
- ✅ So sánh code trước/sau, viết nhận xét ưu nhược điểm.

## PHASE 16 — Zoneless Change Detection
- ✅ Giải thích rủi ro/lợi ích, chỗ nào code cũ có thể gãy.

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
- [ ] Phase 9 (9.1) — NgRx
- [ ] Phase 10 (10.1-10.2) — Testing

**Giai đoạn 2 — Modern (Migration):**
- [ ] Phase 11 (11.1-11.2) — Standalone Migration
- [ ] Phase 12 (12.1-12.2) — Signals Migration
- [ ] Phase 13 — Control Flow mới
- [ ] Phase 14 — Functional Guard/Interceptor
- [ ] Phase 15 — resource() API
- [ ] Phase 16 — Zoneless (nâng cao)
- [ ] Phase 17 — Migration Guide tổng kết
