import { APIRequestContext, expect } from "@playwright/test";
import { UserData } from '../../../types/user';

export async function createUser(request: APIRequestContext, userdata: UserData) {
    const response = await request.post(
        "https://automationexercise.com/api/createAccount",
        {
            form: {
                name: userdata.name,
                email: userdata.email,
                password: userdata.password,
                title: userdata.title,
                birth_date: userdata.day,
                birth_month: userdata.month,
                birth_year: userdata.year,
                firstname: userdata.firstName,
                lastname: userdata.lastName,
                company: "",
                address1: userdata.address,
                address2: "",
                country: userdata.country,
                zipcode: userdata.zipcode,
                state: userdata.state,
                city: userdata.city,
                mobile_number: userdata.mobileNumber,
            },
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe("User created!");

    return body;
}