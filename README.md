# angular-tutorial

Workspace học **Angular Senior-track: Classic (NgModule) → Modern (Standalone/Signals)**,
xây dựng qua dự án xuyên suốt **EduCommerce** — nền tảng e-learning kiêm bán khoá học,
dữ liệu giả lập bằng MSW.

Khoá học được soạn và chấm bằng skill [`/teach`](https://github.com/mattpocock/skills).

## Bắt đầu từ đâu

Mở mục lục lộ trình trong trình duyệt:

```bash
open lessons/index.html
```

## Cấu trúc

| Thư mục / file | Nội dung |
|---|---|
| `lessons/` | Bài học dạng HTML, mở bằng trình duyệt. `index.html` là mục lục + thanh tiến độ. |
| `reference/` | Cheat-sheet cô đọng để ôn nhanh (in ra được), có mục "góc phỏng vấn". |
| `mock-data/` | Dữ liệu giả cho EduCommerce (courses, users, reviews…) + `types.ts`. Chỉ là data demo. |
| `MISSION.md` | Vì sao học — mọi bài đều bám vào file này. |
| `lo-trinh-angular-classic-to-modern.md` | Lộ trình gốc, là nguồn sự thật của khoá. |
| `NOTES.md` | Quy ước làm việc + bảng khác biệt Angular v12–v16 ↔ v22. |
| `educommerce-ng-classic/` | Project Angular thật (tạo ở Bài 00, không commit `node_modules`). |

## Tiến độ

- **Module 0–1 (Bài 00–07)** — đã soạn: setup, RxJS (switchMap, takeUntil, Subject, combineLatest),
  TypeScript Generics, Angular DI.
- Tổng lộ trình: ~62 bài / 17 module, chia 2 giai đoạn (Classic → Migration lên Modern).

## Môi trường đã kiểm chứng

Angular **22.1.4** chạy chế độ NgModule (`--no-standalone`) · Node **v24.18.0** ·
**pnpm 11.13.1** · TypeScript **6.0.2** · RxJS **7.8.2** · Vitest **4.1.10**.

Trình quản lý gói của khoá là **pnpm** (`package.json` ghim `"packageManager"`), không dùng npm.

> Angular 16 "Classic" thật không chạy được trên Node 24, nên khoá dùng Angular mới nhất ở chế độ
> NgModule. Mọi chỗ v22 đã khác v12–v16 đều được chỉ đích danh trong bài và trong `NOTES.md`.
