# 0005 — Bài 04: `combineLatest` — luồng dẫn xuất

- **Ngày:** 2026-09-08
- **Kết quả:** ĐẠT (7/7 TC, gồm cả TC7 tuỳ chọn — "thử thách thêm")

## Bằng chứng
Đọc `combine.spec.ts` + tự chạy lại (không chỉ tin ảnh chụp màn hình người học gửi):
`pnpm exec ng test --include combine.spec.ts` → 1 file / 7 tests passed (Vitest 4.1.11),
khớp chính xác tên test và số lượng trong ảnh chụp. `pnpm exec tsc --noEmit` sạch.

Xác minh TC7 (bài quan trọng nhất theo lesson) là test canh gác thật: copy file ra sandbox,
xoá `distinctUntilChanged()` khỏi `page$.pipe(...)` → TC7 chuyển đỏ đúng như kỳ vọng
(`expected 1 times, but got 2 times`) — chứng minh assertion thật sự phân biệt được "có chặn"
và "không chặn", không phải test vô nghĩa luôn xanh.

## Nắm được
- TC1/TC2: đúng bản chất "im lặng cho tới khi đủ" của `combineLatest`, và "phát lại mỗi lần
  BẤT KỲ nguồn nào `next()`" — kiểm tra dãy kết quả đầy đủ qua từng bước, không chỉ kết quả cuối.
- TC3/TC4: hai cách chữa "im lặng" (`startWith` vs `BehaviorSubject`) được test tách biệt, đúng
  tinh thần "một mental model, hai cách hiện thực khác nhau."
- TC5 (bẫy phát trùng): tái hiện đúng kịch bản — set `page$` về ĐÚNG giá trị cũ (1) vẫn tính là
  emission mới, gây gọi "request" 2 lần với dữ liệu giống hệt nhau. Dùng `request.mockClear()`
  sau khi subscribe để loại bỏ emission khởi tạo của 2 `BehaviorSubject` trước khi đếm — chi
  tiết dễ bỏ sót, người học xử lý đúng ngay từ đầu.
- TC6 (`withLatestFrom`): test đầy đủ cả hai chiều — nguồn phụ đổi không kích hoạt (`page$.next(2)`
  trước khi có emission nào), nguồn chính đổi thì lấy đúng giá trị MỚI NHẤT của nguồn phụ tại
  thời điểm đó (không phải giá trị lúc subscribe). Chuỗi 4 bước kiểm tra rất chặt.
- TC7 (tự làm, không bắt buộc): thêm `distinctUntilChanged()` đúng vị trí (trên `page$`, không
  trên kết quả gộp) để chặn chính bẫy đã chứng minh ở TC5 — đóng vòng lặp "thấy bug → hiểu vì
  sao → tự vá."

## Không có gì phải sửa
Toàn bộ 7 test đều đúng cấu trúc, đúng assertion, không có `any`, không che giấu lỗi bằng
`.catch()`/`try-catch` thừa. Đây là bài thứ hai liên tiếp (sau Bài 03) không có lỗi hay code
smell nào cần chỉnh.

## Ghi chú về bản chất bài này (giống Bài 03, khác Bài 01-02)
Bài 04 kiểm đặc tính CỦA CHÍNH RxJS (`combineLatest`/`withLatestFrom`/`distinctUntilChanged`),
không phải logic tự viết — không có file implementation để "phá" theo kiểu Bài 01-02. Đã đổi
cách xác minh: probe trực tiếp vào TC7 (xoá operator, xem test có đỏ không) thay vì tự hỏi
"code của TÔI có lỗ hổng gì" — phù hợp hơn với bản chất bài toán này.

## Xác nhận xu hướng
Bốn bài liên tiếp từ Bài 01: lỗi thật → tự vá → sạch hoàn toàn → sạch hoàn toàn (kèm làm thêm
phần tuỳ chọn không bắt buộc). Quỹ đạo đi lên ổn định, giữ nguyên hướng đề mở, ít khung sườn.
