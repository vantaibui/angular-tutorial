import {
  Course,
  InMemoryRepository,
  UnconstrainedRepository,
  User,
} from './repository';

import { describe, it, expect } from 'vitest';

describe('InMemoryRepository', () => {
  describe('TC1 - generic repository type safety', () => {
    it('should work correctly with Course', () => {
      const repo = new InMemoryRepository<Course>([
        {
          id: 1,
          name: 'TypeScript',
          price: 100,
        },
      ]);

      const course = repo.findById(1);

      expect(course).toBeDefined();
      expect(course?.name).toBe('TypeScript');
      expect(course?.price).toBe(100);

      // `price` tồn tại trên Course và phải có type number
      const price: number = course!.price;

      expect(price).toBe(100);
    });

    it('should work correctly with User', () => {
      const repo = new InMemoryRepository<User>([
        {
          id: 1,
          name: 'Tai',
          role: 'admin',
        },
      ]);

      const user = repo.findById(1);

      expect(user).toBeDefined();
      expect(user?.name).toBe('Tai');
      expect(user?.role).toBe('admin');

      const role: User['role'] = user!.role;

      expect(role).toBe('admin');
    });

    it('should reject adding User to Course repository at compile time', () => {
      const repo = new InMemoryRepository<Course>();

      const user: User = {
        id: 1,
        name: 'Tai',
        role: 'admin',
      };

      // @ts-expect-error User không phải Course vì thiếu field price
      repo.create(user);
    });
  });

  describe('TC2 - update with Partial<T>', () => {
    it('should update only specified field and keep other fields unchanged', () => {
      const repo = new InMemoryRepository<Course>([
        {
          id: 1,
          name: 'TypeScript',
          price: 100,
        },
      ]);

      const updated = repo.update(1, {
        price: 200,
      });

      expect(updated).toEqual({
        id: 1,
        name: 'TypeScript',
        price: 200,
      });

      expect(updated?.name).toBe('TypeScript');
      expect(updated?.price).toBe(200);
    });

    it('should reject unknown fields at compile time', () => {
      const repo = new InMemoryRepository<Course>([
        {
          id: 1,
          name: 'TypeScript',
          price: 100,
        },
      ]);

      repo.update(1, {
        // @ts-expect-error Course không có field "description"
        description: 'Invalid field',
      });
    });
  });

  describe('TC3 - update nonexistent id', () => {
    it('should not throw and should keep repository unchanged', () => {
      const originalCourse: Course = {
        id: 1,
        name: 'TypeScript',
        price: 100,
      };

      const repo = new InMemoryRepository<Course>([originalCourse]);

      expect(() => {
        repo.update(999, {
          price: 500,
        });
      }).not.toThrow();

      expect(repo.findAll()).toEqual([originalCourse]);

      expect(repo.findById(999)).toBeUndefined();
    });
  });

  describe('TC4 - remove', () => {
    it('should return true first time and false second time', () => {
      const repo = new InMemoryRepository<Course>([
        {
          id: 1,
          name: 'TypeScript',
          price: 100,
        },
      ]);

      const firstResult = repo.remove(1);
      const secondResult = repo.remove(1);

      expect(firstResult).toBe(true);
      expect(secondResult).toBe(false);

      expect(repo.findAll()).toEqual([]);
    });
  });

  describe('TC5 - generic without extends constraint', () => {
    it('should accept object without id', () => {
      type WithoutId = {
        name: string;
      };

      const repo = new UnconstrainedRepository<WithoutId>();

      repo.add({
        name: 'Object without id',
      });

      expect(repo.findAll()).toEqual([
        {
          name: 'Object without id',
        },
      ]);
    });

    it('demonstrates why findById cannot safely exist without constraint', () => {
      function getId<T>(value: T) {
        // @ts-expect-error T không đảm bảo có property "id"
        return value.id;
      }

      expect(typeof getId).toBe('function');
    });
  });

  describe('Challenge - create()', () => {
    it('should automatically generate id', () => {
      const repo = new InMemoryRepository<Course>([
        {
          id: 1,
          name: 'JavaScript',
          price: 100,
        },
      ]);

      const created = repo.create({
        name: 'TypeScript',
        price: 200,
      });

      expect(created).toEqual({
        id: 2,
        name: 'TypeScript',
        price: 200,
      });

      expect(repo.findById(2)).toEqual(created);
    });

    it('should not allow caller to provide id', () => {
      const repo = new InMemoryRepository<Course>();

      repo.create({
        // @ts-expect-error create() nhận Omit<Course, 'id'> nên không được truyền id
        id: 999,
        name: 'TypeScript',
        price: 200,
      });
    });
  });
});
