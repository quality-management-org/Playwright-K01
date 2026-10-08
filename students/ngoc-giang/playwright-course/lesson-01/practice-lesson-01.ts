// Bài 2: ôn lại vòng lặp và destructuring của Buổi 1
function countLoginResults(
  accounts: { username: string; canLogin: boolean }[],
): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;
  for (let i = 0; i < accounts.length; i++) {
    const { canLogin } = accounts[i];
    if (canLogin) {
      passed++;
    } else failed++;
  }
  return { passed: passed, failed: failed };
}
console.log(
  countLoginResults([
    { username: "Ngoc", canLogin: true },
    { username: "Hien", canLogin: false },
    { username: "Linh", canLogin: false },
    { username: "Meo", canLogin: false },
  ]),
);
