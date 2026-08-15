const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

faker.seed(42); // seed cố định để data ổn định giữa các lần chạy lại

const OUT_DIR = path.join(__dirname, 'out');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------- CATEGORIES ----------
const categoryDefs = [
  { name: 'Web Development', icon: 'code' },
  { name: 'Data Science', icon: 'bar-chart' },
  { name: 'Mobile Development', icon: 'smartphone' },
  { name: 'UI/UX Design', icon: 'figma' },
  { name: 'DevOps & Cloud', icon: 'server' },
  { name: 'Artificial Intelligence', icon: 'cpu' },
  { name: 'Business & Marketing', icon: 'briefcase' },
  { name: 'Personal Development', icon: 'user' },
];

const categories = categoryDefs.map((c, i) => ({
  id: `cat_${i + 1}`,
  name: c.name,
  slug: faker.helpers.slugify(c.name).toLowerCase(),
  icon: c.icon,
  courseCount: 0, // fill sau
}));

// ---------- INSTRUCTORS ----------
const instructorTitles = [
  'Senior Software Engineer', 'Data Scientist', 'Product Designer',
  'Cloud Architect', 'AI Researcher', 'Marketing Director',
  'Full-stack Developer', 'Mobile Engineer', 'Career Coach', 'CTO',
];

const instructors = Array.from({ length: 12 }).map((_, i) => {
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  return {
    id: `inst_${i + 1}`,
    name: `${first} ${last}`,
    email: faker.internet.email({ firstName: first, lastName: last }).toLowerCase(),
    avatar: `https://i.pravatar.cc/150?u=inst_${i + 1}`,
    title: faker.helpers.arrayElement(instructorTitles),
    bio: faker.lorem.sentences(2),
    rating: Number(faker.number.float({ min: 4.2, max: 5.0, fractionDigits: 1 })),
    studentCount: faker.number.int({ min: 500, max: 80000 }),
    courseCount: 0, // fill sau
  };
});

// ---------- COURSES ----------
const courseTopics = [
  'The Complete React Developer Course',
  'Mastering TypeScript for Real Projects',
  'Node.js & NestJS: Build Production APIs',
  'Python for Data Analysis',
  'Machine Learning A-Z: Hands-On Python',
  'Flutter & Dart: Build iOS and Android Apps',
  'UI/UX Design Fundamentals with Figma',
  'AWS Certified Solutions Architect',
  'Docker & Kubernetes: The Practical Guide',
  'Deep Learning with PyTorch',
  'Digital Marketing Masterclass',
  'React Native: Build Mobile Apps from Scratch',
  'SQL & Database Design Bootcamp',
  'Vue.js 3: The Complete Guide',
  'System Design Interview Preparation',
  'GraphQL with Apollo & Node.js',
  'Public Speaking & Communication Skills',
  'Cybersecurity Fundamentals',
  'Product Management Foundations',
  'Advanced CSS & Animation',
  'Golang: From Zero to Hero',
  'Data Structures & Algorithms in JavaScript',
  'Figma to Code: Design Systems',
  'Google Analytics & SEO Mastery',
  'Rust Programming for Beginners',
  'DevOps with Terraform & CI/CD',
  'Next.js 14: Full-Stack React Framework',
  'Excel & Power BI for Business Analysts',
  'iOS Development with SwiftUI',
  'Leadership & Team Management',
  'Test-Driven Development in JavaScript',
  'Blockchain & Smart Contracts with Solidity',
  'Photography & Photo Editing Basics',
  'Copywriting That Converts',
  'Kubernetes for Beginners',
  'Natural Language Processing with Python',
  'Freelancing: Build Your Client Base',
  'Redux Toolkit & Modern State Management',
  'Cloud Security Essentials',
  'Agile & Scrum Master Certification Prep',
];

const levels = ['beginner', 'intermediate', 'advanced'];

function pickCategoryForTopic(topic) {
  const t = topic.toLowerCase();
  if (/react|typescript|node|vue|css|graphql|next\.js|design systems|test-driven|redux/.test(t)) return 'cat_1';
  if (/data analysis|machine learning|deep learning|sql|excel|nlp|algorithms/.test(t)) return 'cat_2';
  if (/flutter|react native|ios|swiftui/.test(t)) return 'cat_3';
  if (/ui\/ux|figma/.test(t)) return 'cat_4';
  if (/aws|docker|kubernetes|devops|terraform|cloud security/.test(t)) return 'cat_5';
  if (/machine learning|deep learning|pytorch|blockchain|solidity|nlp/.test(t)) return 'cat_6';
  if (/marketing|seo|copywriting|freelancing|product management/.test(t)) return 'cat_7';
  return 'cat_8';
}

const courses = courseTopics.map((title, i) => {
  const categoryId = pickCategoryForTopic(title);
  const instructor = faker.helpers.arrayElement(instructors);
  const price = faker.helpers.arrayElement([19.99, 24.99, 29.99, 34.99, 39.99, 49.99, 59.99, 79.99]);
  const hasDiscount = faker.datatype.boolean(0.6);
  const totalLessons = faker.number.int({ min: 24, max: 120 });
  const avgLessonMinutes = faker.number.int({ min: 6, max: 14 });
  const reviewCount = faker.number.int({ min: 12, max: 4200 });
  const studentCount = reviewCount * faker.number.int({ min: 3, max: 12 });

  return {
    id: `course_${i + 1}`,
    slug: faker.helpers.slugify(title).toLowerCase(),
    title,
    subtitle: faker.lorem.sentence({ min: 8, max: 14 }),
    description: faker.lorem.paragraphs(3, '\n\n'),
    thumbnail: `https://picsum.photos/seed/course${i + 1}/640/360`,
    categoryId,
    instructorId: instructor.id,
    level: faker.helpers.arrayElement(levels),
    language: 'English',
    price,
    discountPrice: hasDiscount ? Number((price * faker.number.float({ min: 0.4, max: 0.75, fractionDigits: 2 })).toFixed(2)) : null,
    rating: Number(faker.number.float({ min: 3.8, max: 5.0, fractionDigits: 1 })),
    reviewCount,
    studentCount,
    totalLessons,
    totalDurationMinutes: totalLessons * avgLessonMinutes,
    isBestseller: faker.datatype.boolean(0.2),
    isFeatured: faker.datatype.boolean(0.15),
    tags: faker.helpers.arrayElements(
      ['javascript', 'career', 'hands-on', 'project-based', 'certificate', 'beginner-friendly', 'in-demand'],
      faker.number.int({ min: 2, max: 4 })
    ),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    updatedAt: faker.date.recent({ days: 60 }).toISOString(),
  };
});

// cập nhật courseCount cho category/instructor
categories.forEach((c) => {
  c.courseCount = courses.filter((co) => co.categoryId === c.id).length;
});
instructors.forEach((ins) => {
  ins.courseCount = courses.filter((co) => co.instructorId === ins.id).length;
});

// ---------- LESSONS (chi tiết đầy đủ cho 6 course đầu — đủ dùng cho Lesson 4.3, 6.1, 6.2) ----------
const sectionsPerCourseTemplate = [
  'Introduction & Setup',
  'Core Concepts',
  'Building the Project',
  'Advanced Topics',
  'Testing & Deployment',
  'Wrap Up & Next Steps',
];

const lessons = [];
courses.slice(0, 6).forEach((course) => {
  let order = 1;
  const numSections = faker.number.int({ min: 4, max: 6 });
  sectionsPerCourseTemplate.slice(0, numSections).forEach((sectionTitle, sIdx) => {
    const lessonsInSection = faker.number.int({ min: 3, max: 6 });
    for (let l = 0; l < lessonsInSection; l++) {
      lessons.push({
        id: `${course.id}_lesson_${order}`,
        courseId: course.id,
        sectionIndex: sIdx + 1,
        sectionTitle,
        order: order,
        title: faker.lorem.sentence({ min: 4, max: 8 }).replace(/\.$/, ''),
        durationSeconds: faker.number.int({ min: 180, max: 900 }),
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', // video demo public domain
        isFreePreview: order <= 2,
      });
      order++;
    }
  });
});

// ---------- USERS (students) ----------
const roles = ['student', 'student', 'student', 'student', 'instructor', 'admin'];
const users = Array.from({ length: 15 }).map((_, i) => {
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  const role = i === 0 ? 'admin' : i === 1 ? 'instructor' : faker.helpers.arrayElement(roles);
  return {
    id: `user_${i + 1}`,
    name: `${first} ${last}`,
    email: faker.internet.email({ firstName: first, lastName: last }).toLowerCase(),
    avatar: `https://i.pravatar.cc/150?u=user_${i + 1}`,
    role,
    // Mock password chỉ để test flow — KHÔNG bao giờ dùng cách này trong app thật
    password: 'Password123!',
    createdAt: faker.date.past({ years: 1 }).toISOString(),
  };
});

// đảm bảo có 1 tài khoản demo cố định, dễ nhớ để bạn login test
users[0] = {
  id: 'user_admin_demo',
  name: 'Admin Demo',
  email: 'admin@demo.com',
  avatar: 'https://i.pravatar.cc/150?u=admin_demo',
  role: 'admin',
  password: 'Password123!',
  createdAt: faker.date.past({ years: 1 }).toISOString(),
};
users[1] = {
  id: 'user_student_demo',
  name: 'Student Demo',
  email: 'student@demo.com',
  avatar: 'https://i.pravatar.cc/150?u=student_demo',
  role: 'student',
  password: 'Password123!',
  createdAt: faker.date.past({ years: 1 }).toISOString(),
};

// ---------- REVIEWS ----------
const reviewComments = [
  'Great course, very clear explanations and hands-on projects!',
  'The instructor explains complex topics in a simple way.',
  'Loved the real-world project at the end of the course.',
  'Good content but could use more advanced examples.',
  'Exactly what I needed to level up my skills.',
  'Pace was a bit fast for a complete beginner, but manageable.',
  'Best course on this topic I have taken so far.',
  'Some sections felt outdated, would love an update.',
  'Practical, to the point, and well structured.',
  'Helped me pass my technical interview, highly recommend!',
];

const reviews = [];
courses.forEach((course) => {
  const numReviews = faker.number.int({ min: 3, max: 10 });
  for (let i = 0; i < numReviews; i++) {
    const user = faker.helpers.arrayElement(users);
    reviews.push({
      id: `${course.id}_review_${i + 1}`,
      courseId: course.id,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: faker.number.int({ min: 3, max: 5 }),
      comment: faker.helpers.arrayElement(reviewComments),
      createdAt: faker.date.recent({ days: 180 }).toISOString(),
    });
  }
});

// ---------- ENROLLMENTS (cho student demo, để có sẵn data test Dashboard/Progress) ----------
const demoEnrolledCourses = faker.helpers.arrayElements(courses, 4);
const enrollments = demoEnrolledCourses.map((course, idx) => {
  const courseLessons = lessons.filter((l) => l.courseId === course.id);
  const progress = idx === 0 ? 100 : faker.number.int({ min: 10, max: 80 });
  const completedCount = courseLessons.length
    ? Math.round((progress / 100) * courseLessons.length)
    : 0;
  return {
    id: `enroll_${idx + 1}`,
    userId: 'user_student_demo',
    courseId: course.id,
    progress,
    completedLessonIds: courseLessons.slice(0, completedCount).map((l) => l.id),
    enrolledAt: faker.date.past({ years: 1 }).toISOString(),
    lastAccessedAt: faker.date.recent({ days: 10 }).toISOString(),
  };
});

// ---------- COUPONS ----------
const coupons = [
  { code: 'WELCOME10', discountPercent: 10, expiresAt: faker.date.future({ years: 1 }).toISOString(), maxUses: 1000, usedCount: 231 },
  { code: 'SAVE20', discountPercent: 20, expiresAt: faker.date.future({ years: 1 }).toISOString(), maxUses: 500, usedCount: 498 },
  { code: 'EXPIRED5', discountPercent: 5, expiresAt: faker.date.past({ years: 0.1 }).toISOString(), maxUses: 100, usedCount: 40 },
];

// ---------- WRITE FILES ----------
const files = { categories, instructors, courses, lessons, users, reviews, enrollments, coupons };
Object.entries(files).forEach(([name, data]) => {
  fs.writeFileSync(path.join(OUT_DIR, `${name}.json`), JSON.stringify(data, null, 2));
});

console.log('Generated:', Object.fromEntries(Object.entries(files).map(([k, v]) => [k, v.length])));
