# 0001 — Bài 00: Dựng sân tập EduCommerce

- **Ngày:** 2026-08-25
- **Bài:** 00 — Dựng sân tập EduCommerce (chế độ NgModule)
- **Kết quả:** ĐẠT

## Bằng chứng (chấm bằng file thật + lệnh thật, không chấm chay)
- `educommerce-ng-classic/` tạo bằng pnpm — `package.json` có `"packageManager": "pnpm@11.13.1"`
  → người học chạy đúng chuỗi lệnh `pnpm dlx`, không dùng nhầm npm.
- `src/app/app.module.ts` có đủ `declarations` / `imports` / `providers` / `bootstrap`.
- `src/app/app.component.ts` có `standalone: false` → hai mô hình khai báo không cãi nhau.
- Tên file kiểu `2016` (`app.component.ts`), SCSS đúng cờ.
- `pnpm test` → **2 files / 4 tests passed** (Vitest 4.1.11).
- `pnpm start` → HTTP 200 sau 3s, render `<app-root></app-root>`.

## Nắm được
- Chạy đúng lệnh `pnpm dlx @angular/cli@22 new ...` (không vấp bẫy `ng new`).
- Dựng được `src/playground/` làm sân tập tách khỏi Angular — nền cho Bài 01.

## Điểm cần theo dõi
- **Bỏ sót bước ở lần nộp đầu:** thiếu hẳn `src/playground/sanity.spec.ts` (mục 6) nhưng đã báo
  "xong bài". Sửa ngay sau khi được chỉ ra. → Lần sau nhắc **tự đối chiếu checklist cuối bài
  trước khi báo xong**; nếu lặp lại lần 2 thì đổi cách can thiệp (bắt tự liệt kê từng mục
  checklist kèm bằng chứng thay vì chỉ nói "xong").
- **Câu hỏi tư duy: trả lời ĐÚNG phần cốt lõi.** Người học nói: "Angular lo chuyện HTTP, RxJS lo
  mô hình stream bất đồng bộ mà Angular dùng để đưa kết quả HTTP cho bạn." Tách bạch đúng hai lớp,
  và nắm được RxJS là thư viện độc lập chứ không phải của Angular.
  **Chỗ còn thiếu:** mô hình đang là MỘT CHIỀU ("đưa kết quả cho bạn") — chưa thấy chiều ngược
  (`unsubscribe` đi ngược lên nguồn, Angular cắm `xhr.abort()` vào đó). Đã mài sắc lại thành
  "RxJS sở hữu VÒNG ĐỜI, không chỉ KẾT QUẢ".
  → Theo dõi ở Bài 01 (teardown) và Bài 02 (unsubscribe lan ngược): nếu vẫn tư duy một chiều thì
  luật "takeUntil đứng cuối" sẽ thành học thuộc thay vì hiểu.

## Chưa kiểm được
- Người học có thực sự đọc và hiểu `app.module.ts` không, hay chỉ chạy lệnh rồi qua.
  Bài 08 (CoreModule/SharedModule) sẽ lộ ra điều này.
