//validate length password

function isValidPassword(password: string): boolean {
  if (password.length >= 7) {
    return true;
  } else {
    console.log("Password less than 7 chars");
    return false;
  }
}
console.log(isValidPassword("124564545"));

// Get discount

function getDiscountPrice(price: number, percent: number = 10): number {
  price = (price * (100 - percent)) / 100;
  return price;
}
console.log(getDiscountPrice(200));

// format user info

function formatUserInfo(user: { name: string; age: number }): string {
  const { age, name } = user;
  return name + " " + "(" + age + " tuổi)";
}
console.log(formatUserInfo({ name: "Linh", age: 25 }));

// get max number
function getMaxNumber(numbers: number[]): number {
  let max = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
   
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}
console.log(getMaxNumber([4, 5, 7, 1, 4, 8]));

//countAccountsCanLogin
function countAccountsCanLogin(accounts: { username: string; canLogin: boolean }[]): number{
    let count =0
    for(let i = 0; i < accounts.length; i++)
        if(accounts[i].canLogin === true){
            count++;
        }
    ;
    return count;


}
console.log(countAccountsCanLogin([{username: "ngoc", canLogin: true},{username: "ngoc", canLogin: false},{username: "ngoc", canLogin: false}]));