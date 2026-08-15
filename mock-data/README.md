# Mock Data — EduCommerce Frontend

Bộ data này sinh bằng `@faker-js/faker` (seed cố định = 42, nên chạy lại script vẫn ra data giống hệt — tái lập được).

## Danh sách file & số lượng bản ghi

| File | Số lượng | Ghi chú |
|---|---|---|
| `categories.json` | 8 | Web Dev, Data Science, Mobile, UI/UX, DevOps, AI, Business, Personal Dev |
| `instructors.json` | 12 | Có `courseCount` tự tính đúng theo `courses.json` |
| `courses.json` | 40 | Có price/discountPrice, rating, tags, level... đủ field để build list/detail/filter |
| `lessons.json` | 145 | Chỉ 6 course đầu (`course_1`→`course_6`) có breakdown lesson đầy đủ theo section — đủ dùng cho Video Player & Progress (Phase 6) |
| `users.json` | 15 | Có sẵn 2 tài khoản demo cố định (xem bên dưới) |
| `reviews.json` | 239 | Rải đều theo từng course |
| `enrollments.json` | 4 | Gắn sẵn cho `user_student_demo`, 1 course đã 100% (test UI "hoàn thành") |
| `coupons.json` | 3 | Có 1 mã hợp lệ, 1 mã gần hết lượt, 1 mã hết hạn — để test validate coupon (Lesson 5.5-tương-đương) |
| `types.ts` | — | TypeScript interface khớp 1-1 với toàn bộ data trên |

## Tài khoản demo cố định (dùng cho Lesson 3.1-3.2)
```
Admin:   admin@demo.com   / Password123!
Student: student@demo.com / Password123!
```
(`password` trong `users.json` chỉ để mock flow login — logic thật của bạn không cần và không nên so sánh plain-text password kiểu này khi làm backend thật sau này.)

## Cách dùng trong project

1. Copy toàn bộ file `.json` vào `src/mocks/data/`.
2. Copy `types.ts` vào `src/types/`.
3. Import trực tiếp trong file `handlers.ts` của MSW (Lesson 1.2):

```ts
import courses from './data/courses.json';
import categories from './data/categories.json';
import type { Course, Category } from '@/types/types';

export const handlers = [
  http.get('/api/courses', () => {
    return HttpResponse.json({ data: courses, meta: { page: 1, limit: 20, total: courses.length, totalPages: 2 } });
  }),
];
```

4. Việc **viết handler MSW cho từng endpoint** (filter, pagination, lỗi giả lập...) vẫn là bài tập của bạn ở Lesson 1.2/1.3/3.x/5.x theo đúng lộ trình — bộ data này chỉ giải quyết phần "có data thật để dùng", không làm thay phần logic bạn cần học.

## Dữ liệu chưa có sẵn (đúng ý đồ, bạn tự tạo khi học tới)
- `cart_items` — sẽ sống trong Zustand store (Phase 5), không cần mock file riêng.
- `orders` / `payments` — bạn tự thiết kế và mock ở Lesson 5.2/5.3 (đã có sẵn `interface Order` trong `types.ts` để tham khảo).

## Regenerate / mở rộng data
Nếu muốn sinh thêm data (VD 100 courses thay vì 40), sửa mảng `courseTopics` trong `generate.js` rồi chạy lại:
```bash
npm install @faker-js/faker
node generate.js
```
