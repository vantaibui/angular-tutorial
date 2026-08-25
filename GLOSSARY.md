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
