import { faker } from '@faker-js/faker';
import { UserSchema, User } from '@/models/userModel';

export const generateUsers = (count: number = 50): User[] => {
  return Array.from({ length: count }, () => {
    const user = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      city: faker.location.city(),
      age: faker.number.int({ min: 18, max: 65 }),
      salary: faker.number.int({ min: 20000, max: 120000 }),
      avatar: faker.image.avatar(),
    };

    // Validation avec Zod
    return UserSchema.parse(user);
  });
};
