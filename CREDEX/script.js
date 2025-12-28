const API = "http://localhost:3000";

// SIGNUP
function signup() {
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("emailSignup").value,
    password: document.getElementById("passwordSignup").value
  };

  fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      alert("Account created!");
      localStorage.setItem("user", JSON.stringify(data));
      window.location = "dashboard.html";
    });
}

// LOGIN
function login() {
  const body = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);

      localStorage.setItem("user", JSON.stringify(data));
      window.location = "dashboard.html";
    });
}

// ON DASHBOARD LOAD
if (window.location.pathname.includes("dashboard")) {
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("walletId").innerHTML = user.walletId;
  document.getElementById("balance").innerHTML = user.balance;
}

// SEND MONEY
function sendMoney() {
  const user = JSON.parse(localStorage.getItem("user"));

  const body = {
    fromWallet: user.walletId,
    toWallet: document.getElementById("receiver").value,
    amount: Number(document.getElementById("amount").value)
  };

  fetch(API + "/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      alert(JSON.stringify(data));
    });
}