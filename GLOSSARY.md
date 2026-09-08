# Angular Senior-track Glossary

Ngôn ngữ chung của khoá. Chỉ thêm thuật ngữ khi người học đã **dùng đúng**, không phải khi
vừa được giới thiệu. Mọi bài học và learning-record dùng thống nhất các từ ở đây.

## Terms

**NgModule**:
Đơn vị gom nhóm của Angular Classic, khai báo component/directive/pipe thuộc về nó
(`declarations`), kéo module khác vào (`imports`), và đăng ký service ở tầng injector của nó
(`providers`).
_Avoid_: module (quá chung — dễ lẫn với ES module)

**Standalone component**:
Component tự khai báo dependency của chính nó, không cần NgModule khai hộ. Từ Angular 19 là
mặc định; muốn dùng NgModule phải ghi `standalone: false` tường minh.
_Avoid_: component độc lập

**Sân tập** (`src/playground/`):
Thư mục chứa code thử nghiệm chạy bằng Vitest, tách khỏi app thật. Dùng để học một khái niệm
ở dạng cô lập trước khi ghép vào EduCommerce.
_Avoid_: thư mục test, scratch

**Teardown**:
Hàm trả về từ constructor của `Observable`, chạy khi có người `unsubscribe` **hoặc** khi
Observable `complete`. Phân biệt hai trường hợp đó phải tự làm bằng cờ.
_Avoid_: cleanup, hàm dọn dẹp

**Outer / Inner Observable**:
Trong `switchMap`/`mergeMap`, *outer* là nguồn phát giá trị vào operator; *inner* là Observable
được sinh ra từ mỗi giá trị đó. Chỉ inner mới bị huỷ khi có giá trị mới.
_Avoid_: observable cha/con

**Race condition (trong RxJS)**:
Nhiều request bay đi song song và về không đúng thứ tự phát, khiến kết quả cũ ghi đè kết quả mới.
_Avoid_: bug bất đồng bộ

**`destroy$` pattern**:
Một `Subject<void>` private trong component, `next()` rồi `complete()` trong `ngOnDestroy`,
dùng với `takeUntil` đặt ở **cuối** pipe để cắt mọi subscription khi component bị huỷ.
_Avoid_: cleanup subject, huỷ subscription

**Test canh gác (guarding test)**:
Test mà khi ta cố tình phá code thì nó chuyển sang đỏ. Test xanh nhưng không đỏ khi phá code
thì chưa chứng minh được điều nó tuyên bố.
_Avoid_: test tốt, test đầy đủ

**`combineLatest` im lặng**:
`combineLatest` không phát gì cho tới khi **MỌI** nguồn đã phát ít nhất một giá trị. Muốn phát
ngay từ nguồn chưa emit, phải cho nó giá trị khởi tạo (`startWith` hoặc `BehaviorSubject`).
_Avoid_: combineLatest bị treo, combineLatest lỗi

**Bẫy phát trùng (duplicate emission)**:
`combineLatest`/`Subject.next()` phát lại dù giá trị mới giống hệt giá trị cũ — ví dụ set lại
`page` về đúng giá trị đang có vẫn tính là một emission mới. Chặn bằng `distinctUntilChanged()`.
_Avoid_: bug gọi API 2 lần, race condition (đây không phải race — thứ tự vẫn đúng, chỉ là THỪA)

**`withLatestFrom` — nguồn chính/nguồn phụ**:
Chỉ nguồn ĐỨNG TRƯỚC `.pipe()` (nguồn chính) kích hoạt emission; nguồn truyền vào
`withLatestFrom(...)` (nguồn phụ) chỉ đóng vai trò cung cấp giá trị mới nhất, tự nó đổi
không kích hoạt gì. Khác `combineLatest` — ở đó mọi nguồn đều bình đẳng, đổi nguồn nào cũng kích hoạt.
_Avoid_: combineLatest một chiều
