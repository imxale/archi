import { fakerFR as faker } from "@faker-js/faker";
import { UserSchema, User } from "@/models/userModel";

export const generateUsers = (count: number = 50): User[] => {
    return Array.from({ length: count }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        const user = {
            id: faker.string.uuid(),
            firstName: firstName,
            lastName: lastName,
            email: faker.internet.email({
                firstName,
                lastName,
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
        const isAgeMatch = filters.minAge
            ? user.age >= filters.minAge
            : true && filters.maxAge
            ? user.age <= filters.maxAge
            : true;
        const isSalaryMatch = filters.minSalary
            ? user.salary >= filters.minSalary
            : true && filters.maxSalary
            ? user.salary <= filters.maxSalary
            : true;

        return isCityMatch && isAgeMatch && isSalaryMatch;
    });
};
