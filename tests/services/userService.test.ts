import { describe, it, expect } from '@jest/globals';
import { generateUsers, filterUsers } from '@/services/userService';
import { UserSchema, User } from '@/models/userModel';

describe('generateUsers', () => {
  it('devrait générer le bon nombre d\'utilisateurs', () => {
    const count = 10;
    const users = generateUsers(count);

    expect(users).toHaveLength(count);
  });

  it('chaque utilisateur doit respecter le schéma défini par Zod', () => {
    const users = generateUsers(5);

    users.forEach(user => {
      expect(() => UserSchema.parse(user)).not.toThrow();
    });
  });

  it('les âges doivent être entre 18 et 65 ans', () => {
    const users = generateUsers(10);

    users.forEach(user => {
      expect(user.age).toBeGreaterThanOrEqual(18);
      expect(user.age).toBeLessThanOrEqual(65);
    });
  });

  it('les salaires doivent être entre 20 000 et 120 000', () => {
    const users = generateUsers(10);

    users.forEach(user => {
      expect(user.salary).toBeGreaterThanOrEqual(20000);
      expect(user.salary).toBeLessThanOrEqual(120000);
    });
  });

  it('chaque utilisateur doit avoir une ville et un avatar non vides', () => {
    const users = generateUsers(5);

    users.forEach(user => {
      expect(user.city).toBeTruthy();
      expect(user.avatar).toBeTruthy();
    });
  });
});

describe('filterUsers', () => {
  const mockUsers: User[] = [
    { id: '1', firstName: 'Alice', lastName: 'Martin', email: 'alice@example.com', phone: '0601020304', city: 'Paris', age: 25, salary: 40000, avatar: '' },
    { id: '2', firstName: 'Bob', lastName: 'Durand', email: 'bob@example.com', phone: '0605060708', city: 'Lyon', age: 35, salary: 50000, avatar: '' },
    { id: '3', firstName: 'Charlie', lastName: 'Dupont', email: 'charlie@example.com', phone: '0611121314', city: 'Paris', age: 45, salary: 60000, avatar: '' },
  ];

  it('devrait filtrer par ville', () => {
    const result = filterUsers(mockUsers, { city: 'Paris' });
    expect(result).toHaveLength(2);
    expect(result.every(user => user.city === 'Paris')).toBe(true);
  });

  it('devrait filtrer par âge minimum', () => {
    const result = filterUsers(mockUsers, { minAge: 30 });
    expect(result).toHaveLength(2);
    expect(result.every(user => user.age >= 30)).toBe(true);
  });

  it('devrait filtrer par âge maximum', () => {
    const result = filterUsers(mockUsers, { maxAge: 30 });
    expect(result).toHaveLength(1);
    expect(result.every(user => user.age <= 30)).toBe(true);
  });

  it('devrait filtrer par plage d\'âge', () => {
    const result = filterUsers(mockUsers, { minAge: 30, maxAge: 40 });
    expect(result).toHaveLength(1);
    expect(result.every(user => user.age >= 30 && user.age <= 40)).toBe(true);
  });

  it('devrait filtrer par salaire minimum', () => {
    const result = filterUsers(mockUsers, { minSalary: 50000 });
    expect(result).toHaveLength(2);
    expect(result.every(user => user.salary >= 50000)).toBe(true);
  });

  it('devrait filtrer par salaire maximum', () => {
    const result = filterUsers(mockUsers, { maxSalary: 45000 });
    expect(result).toHaveLength(1);
    expect(result.every(user => user.salary <= 45000)).toBe(true);
  });

  it('devrait filtrer par plage de salaire', () => {
    const result = filterUsers(mockUsers, { minSalary: 40000, maxSalary: 50000 });
    expect(result).toHaveLength(2);
    expect(result.every(user => user.salary >= 40000 && user.salary <= 50000)).toBe(true);
  });

  it('ne doit pas filtrer si aucun filtre n\'est appliqué', () => {
    const result = filterUsers(mockUsers, {});
    expect(result).toHaveLength(mockUsers.length);
  });
});
