import { fail } from "node:assert";

// Bài 1
function isValidPassword(password: string): boolean {
    return password.length >= 8;
}
console.log(isValidPassword("HienNguyen12345"));

// Bài 2
function getDiscountPrice(price: number, percent: number = 10): number {
    return price - price*percent/100;
}
console.log(`Giá sau khi giảm là:`, getDiscountPrice(200));

// Bài 3
function formatUserInfo(user: { name: string; age: number }): string {
    const { name, age } = user;
    return `${name} (${age} tuổi)`;
}
console.log(formatUserInfo({name: "Linh", age: 25}));

// Bài 4
function getMaxNumber(numbers: number[]): number {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max=numbers[i];
        }
}
 return max;
}
console.log(`Số lớn nhất trong mảng là:`, getMaxNumber([3,1,7,0,4]));

// Bài 5
const accounts = [
  { username: "standard_user", password: "secret_sauce", canLogin: true },
  { username: "locked_out_user", password: "secret_sauce", canLogin: false },
  { username: "problem_user", password: "secret_sauce", canLogin: true },
  { username: "standard_user", password: "wrong_password", canLogin: false },
];

let countAccount =0;
for (const account of accounts) {
  const expected = account.canLogin ? "đăng nhập thành công" : "bị từ chối";
  console.log(`Đăng nhập với ${account.username}: mong đợi ${expected}`);
    if (account.canLogin){
        countAccount++;
    }
}
console.log(`Số account có thể login được là: : ${countAccount}`)

// Bài 5_2
function countAccountsCanLogin(accounts: { username: string; canLogin: boolean }[]): number {
    let count = 0;
    for (let i=0; i<accounts.length; i++)
    {
        if (accounts[i].canLogin) {
            count++;
        }
    };
    return count;
    
}
console.log(
    countAccountsCanLogin(
        [
         { username: "standard_user", canLogin: true },
        { username: "locked_out_user", canLogin: false },
        { username: "problem_user", canLogin: true },
        { username: "standard_user", canLogin: false },   
        ]
    )
)

//Bài lesson 2:
function countLoginResults(
  accounts: { username: string; canLogin: boolean }[]
): { passed: number; failed: number } {
  // duyệt array bằng for...of, đếm và trả về object gồm 2 field
  let countTrue=0;
  let countFalse=0;
  for (const account of accounts) {
    if (account.canLogin) {
            countTrue++;
        }
    else {
        countFalse++;
    }
};
    return {
    passed: countTrue,
    failed: countFalse,
  };
}

 console.log(
    countLoginResults(
        [
        { username: "standard_user", canLogin: true },
        { username: "locked_out_user", canLogin: false },
        { username: "problem_user", canLogin: true },
        { username: "standard_user", canLogin: false },   
        ]
    )
)

const { passed, failed } = countLoginResults(accounts);

console.log(`Passed: ${passed}, Failed: ${failed}`);