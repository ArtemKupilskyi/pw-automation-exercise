import { faker } from '@faker-js/faker';
import { UserData } from '../types/user';

export async function generateRandomUserData(): Promise<UserData> {
    const title = faker.helpers.arrayElement(['Mr.', 'Mrs.']);
    const name = faker.internet.username();
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password({ length: 12 });

    const day = String(faker.number.int({ min: 1, max: 28 }));
    const month = String(faker.number.int({ min: 1, max: 12 }));
    const year = String(faker.number.int({ min: 1980, max: 2010 }));

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const address = faker.location.streetAddress();
    const country = faker.helpers.arrayElement(['India', 'Canada', 'United States', 'Australia']);
    const state = faker.location.state();
    const city = faker.location.city();
    const zipcode = faker.location.zipCode();
    const mobileNumber = faker.phone.number();

    return {
        title,
        name,
        email,
        password,
        day,
        month,
        year,
        firstName,
        lastName,
        address,
        country,
        state,
        city,
        zipcode,
        mobileNumber,
    };
}