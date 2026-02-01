// USER PASSWORD TOGGLE
function togglePassword(){
  const p = document.getElementById("password");
  p.type = p.type === "password" ? "text" : "password";
}

// PASSWORD STRENGTH
const pwd = document.getElementById("password");
if(pwd){
  pwd.addEventListener("input", ()=>{
    const s = document.getElementById("strength");
    if(pwd.value.length < 6) s.innerText="Weak password";
    else if(pwd.value.match(/[A-Z]/) && pwd.value.match(/[0-9]/))
      s.innerText="Strong password";
    else s.innerText="Medium password";
  });
}

// SAVE USER
function saveUser(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  if(!email || !password) return alert("Fill all fields");

  let users=JSON.parse(localStorage.getItem("users"))||[];
  users.push({email,password});
  localStorage.setItem("users",JSON.stringify(users));
  alert("Saved");
}

// ADMIN LOGIN
function adminLogin(){
  if(
    document.getElementById("adminEmail").value==="hello@123.com" &&
    document.getElementById("adminPass").value==="hello123"
  ){
    sessionStorage.setItem("admin","true");
    window.location="admin.html";
  } else alert("Wrong admin login");
}

// ADMIN AUTH
if(location.pathname.includes("admin.html")){
  if(sessionStorage.getItem("admin")!=="true")
    location="admin-login.html";
}

// LOAD USERS
const table=document.getElementById("table");
if(table){
  let users=JSON.parse(localStorage.getItem("users"))||[];
  users.forEach((u,i)=>{
    let r=table.insertRow();
    r.insertCell(0).innerText=u.email;
    r.insertCell(1).innerText=u.password;
    r.insertCell(2).innerHTML=
      `<button onclick="del(${i})">❌</button>`;
  });
}

function del(i){
  let users=JSON.parse(localStorage.getItem("users"));
  users.splice(i,1);
  localStorage.setItem("users",JSON.stringify(users));
  location.reload();
}

function clearAll(){
  if(confirm("Delete all?")){
    localStorage.removeItem("users");
    location.reload();
  }
}

function logout(){
  sessionStorage.removeItem("admin");
  location="login.html";
}

function searchUser(){
  let f=document.getElementById("search").value.toLowerCase();
  [...table.rows].forEach((r,i)=>{
    if(i>0)
      r.style.display=r.cells[0].innerText.toLowerCase().includes(f)?"":"none";
  });
}

function exportCSV(){
  let users=JSON.parse(localStorage.getItem("users"))||[];
  let csv="Email,Password\n";
  users.forEach(u=>csv+=`${u.email},${u.password}\n`);
  let a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  a.download="users.csv";
  a.click();
}
