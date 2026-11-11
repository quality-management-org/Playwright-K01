
import { Account } from "../data-types/user.type";

// Đọc biến trường được load từ .env trong playwright.config.ts
// Báo lỗi nếu thiếu biến, thay vì để test fail khó hiểu
function getEnv(name: string) :string {
    const value = process.env[name];
    if(!value) {
        throw new Error(`Missing env variable "${name} - please check .env file"`);
    }
    return value;
}

export const sharedAccount : Account = {
    email: getEnv("EMAIL"),
    password: getEnv("PASSWORD")
}