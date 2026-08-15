// types.ts
// Interfaces khớp 1-1 với các file JSON mock data đi kèm (categories, instructors,
// courses, lessons, users, reviews, enrollments, coupons).
// Copy file này vào src/types/ trong project EduCommerce Frontend.

export type UserRole = 'student' | 'instructor' | 'admin';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  courseCount: number;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  bio: string;
  rating: number;
  studentCount: number;
  courseCount: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  instructorId: string;
  level: CourseLevel;
  language: string;
  price: number;
  discountPrice: number | null;
  rating: number;
  reviewCount: number;
  studentCount: number;
  totalLessons: number;
  totalDurationMinutes: number;
  isBestseller: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface Lesson {
  id: string;
  courseId: string;
  sectionIndex: number;
  sectionTitle: string;
  order: number;
  title: string;
  durationSeconds: number;
  videoUrl: string;
  isFreePreview: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  password: string; // CHỈ dùng cho mock login — không phản ánh cách xử lý password thật
  createdAt: string;
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number; // 0-100
  completedLessonIds: string[];
  enrolledAt: string;
  lastAccessedAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  expiresAt: string;
  maxUses: number;
  usedCount: number;
}

// ---- Cart & Order (chưa có sẵn data mẫu — bạn sẽ tự tạo khi làm Phase 5) ----
export interface CartItem {
  courseId: string;
  addedAt: string;
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  userId: string;
  items: { courseId: string; price: number }[];
  couponCode?: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

// ---- Chuẩn response API mock (khớp với những gì MSW handlers nên trả về) ----
export interface ApiListResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}
