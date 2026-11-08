interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers() {
try {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json(); 
  const bizUsers = users.filter((u) => u.email.endsWith(".biz")); 
  const names = bizUsers.map((u) => u.name); 

  console.log(`Số lượng user có email .biz  là: ${names.length}`); 
  console.log("Danh sách tên:", names);
}
catch (error) 
{ console.error("Gọi API thất bại:", error); }
}
getUsers();