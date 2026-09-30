export interface Entity {
  id: number;
}

export interface Course extends Entity {
  name: string;
  price: number;
}

export interface User extends Entity {
  name: string;
  role: 'admin' | 'student';
}

export class InMemoryRepository<T extends Entity> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }

  findAll(): T[] {
    return [...this.items];
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  update(id: number, patch: Partial<T>): T | undefined {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return undefined;
    }

    this.items[index] = {
      ...this.items[index],
      ...patch,
      id: this.items[index].id,
    };

    return this.items[index];
  }

  remove(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);
    return true;
  }

  create(data: Omit<T, 'id'>): T {
    const maxId = this.items.reduce(
      (max, item) => Math.max(max, item.id),
      0,
    );

    const item = {
      ...data,
      id: maxId + 1,
    } as T;

    this.items.push(item);

    return item;
  }
}

/**
 * Generic class WITHOUT `extends Entity`.
 *
 * Vì T không có constraint nên TypeScript không biết rằng T có field `id`.
 * Do đó không thể implement findById() an toàn.
 */
export class UnconstrainedRepository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findAll(): T[] {
    return [...this.items];
  }

  // Không thể viết:
  //
  // findById(id: number): T | undefined {
  //   return this.items.find((item) => item.id === id);
  // }
  //
  // Error:
  // Property 'id' does not exist on type 'T'.
}
