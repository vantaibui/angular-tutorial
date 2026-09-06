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
