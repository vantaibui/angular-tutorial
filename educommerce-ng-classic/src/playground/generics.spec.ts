import { describe, expect, it } from 'vitest';

interface Course {
  id: string;
  title: string;
  price: number;
}

interface User {
  id: string;
  name: string;
}

function dauTien<T>(ds: T[]): T | undefined {
  return ds[0];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

function layId<T extends { id: string }>(obj: T): string {
  return obj.id;
}

function layTruong<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function cap<A, B = A>(a: A, b: B): [A, B] {
  return [a, b];
}

describe('TypeScript Generics', () => {
  it('TC1 - dauTien<T> returns T | undefined', () => {
    const courses: Course[] = [
      {
        id: 'c1',
        title: 'TypeScript Generics',
        price: 100,
      },
    ];

    const course = dauTien(courses);

    expect(course?.title).toBe('TypeScript Generics');

    if (course) {
      const title: string = course.title;

      expect(title).toBe('TypeScript Generics');

      // @ts-expect-error Course does not have property "tittle"
      course.tittle;
    }
  });

  it('TC2 - TypeScript infers T automatically', () => {
    const courses: Course[] = [
      {
        id: 'c1',
        title: 'Angular',
        price: 200,
      },
    ];

    // TS tự suy ra T = Course
    const course = dauTien(courses);

    if (course) {
      const title: string = course.title;

      expect(title).toBe('Angular');
    }
  });

  it('TC3 - ApiResponse<T> works with Course[] and User', () => {
    const courseResponse: ApiResponse<Course[]> = {
      success: true,
      data: [
        {
          id: 'c1',
          title: 'React',
          price: 150,
        },
      ],
    };

    const userResponse: ApiResponse<User> = {
      success: true,
      data: {
        id: 'u1',
        name: 'Tai',
      },
    };

    expect(courseResponse.data[0].title).toBe('React');
    expect(userResponse.data.name).toBe('Tai');

    const invalidResponse: ApiResponse<Course[]> = {
      success: true,
      data: [
        {
          id: 'c2',

          // @ts-expect-error Course.title must be string
          title: 123,

          price: 200,
        },
      ],
    };

    expect(invalidResponse.success).toBe(true);
  });

  it('TC4 - layId requires object containing id', () => {
    const course: Course = {
      id: 'course-1',
      title: 'TypeScript',
      price: 100,
    };

    const user: User = {
      id: 'user-1',
      name: 'Tai',
    };

    expect(layId(course)).toBe('course-1');
    expect(layId(user)).toBe('user-1');

    const objectWithoutId = {
      name: 'No ID',
    };

    // @ts-expect-error object does not contain id
    layId(objectWithoutId);
  });

  it('TC5 - layTruong returns correct property type', () => {
    const course: Course = {
      id: 'c1',
      title: 'Generics',
      price: 300,
    };

    const t: string = layTruong(course, 'title');
    const p: number = layTruong(course, 'price');

    expect(t).toBe('Generics');
    expect(p).toBe(300);

    // @ts-expect-error "description" is not keyof Course
    layTruong(course, 'description');
  });

  it('TC6 - generic default parameter B = A', () => {
    const sameType = cap<string>('hello', 'world');

    const first: string = sameType[0];
    const second: string = sameType[1];

    expect(first).toBe('hello');
    expect(second).toBe('world');

    const differentType = cap<string, number>('age', 26);

    expect(differentType).toEqual(['age', 26]);

    // @ts-expect-error B defaults to string
    cap<string>('age', 26);
  });
});
