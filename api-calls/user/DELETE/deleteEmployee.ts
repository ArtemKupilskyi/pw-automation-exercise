import { APIRequestContext, expect } from "@playwright/test";
import { UserData } from "../../../types/user";

export async function deleteUser(request: APIRequestContext, userdata: UserData) {
    const response = await request.delete(
        "https://automationexercise.com/api/deleteAccount",
        {
            data: {
                email: userdata.email,
                password: userdata.password,
            },
        }
    );

    expect(response.status()).toBe(200);

    return response;
}