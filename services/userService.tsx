import { fakerFR as faker } from "@faker-js/faker";
import { UserSchema, User } from "@/models/userModel";

export const generateUsers = (count: number = 25): User[] => {
    return Array.from({ length: count }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        const user = {
            id: faker.string.uuid(),
            firstName: firstName,
            lastName: lastName,
            email: faker.internet.email({
                firstName: firstName.toLowerCase(),
                lastName: lastName.toLowerCase(),
            }),
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

export const filterUsers = (
    users: User[],
    filters: {
        city?: string;
        minAge?: number;
        maxAge?: number;
        minSalary?: number;
        maxSalary?: number;
    }
): User[] => {
    return users.filter((user) => {
        const isCityMatch = filters.city
            ? user.city.toLowerCase().includes(filters.city.toLowerCase())
            : true;

        const isAgeMatch =
          (filters.minAge === undefined || user.age >= filters.minAge) &&
          (filters.maxAge === undefined || user.age <= filters.maxAge);

        const isSalaryMatch =
          (filters.minSalary === undefined || user.salary >= filters.minSalary) &&
          (filters.maxSalary === undefined || user.salary <= filters.maxSalary);

        return isCityMatch && isAgeMatch && isSalaryMatch;
    });
};
