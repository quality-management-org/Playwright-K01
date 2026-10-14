async function getUsers() {
  const response= await fetch("https://jsonplaceholder.typicode.com/users");
  type Users= {id: number, email: string, name: string};
  const Users:Users[]= await response.json();
  const filterEmail= Users.filter((u)=>u.email.endsWith(".biz"));
  const listName= Users.map((u)=> u.name);
  console.log("So luong user co email ket thuc bang .biz: "+ filterEmail.length);
  console.log("Tong so name: "+listName.length, listName);


}
getUsers();
