const form = {
  name: document.getElementById("FullName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmpassword: document.getElementById("confirmpassword"),
  phone: document.getElementById("phone"),
  submit: document.getElementById("signin-btn-submit"),
};

// function validatePassword(field1, field2) {
//   if (field1 == "" || field2 == "") {
//     document.getElementById("b2").style.borderColor = "red";
//     document.getElementById("a2").innerHTML = "You must enter a password";
//     return "You must enter a password";
//   } else return "";
// }

// function validate1(err) {
//   document.getElementById("a2").style.borderColor = "red";
//   document.getElementById("a2").innerHTML = err;
//   return err;
// }

// function validateEmail(field4) {
//   if (field4 == "") {
//     document.getElementById("b1").style.borderColor = "red";
//     document.getElementById("a1").innerHTML = "You Must Enter an email";
//     return "You Must Enter a email";
//   } else return "";
// }

// function validate(form) {
//   let fail = "";
//   fail += validatePassword(form.password.value);
//   fail += validateEmail(form.Email.value);

//   if (fail == "") {
//     return true;
//   } else {
//     return false;
//   }
// }

// let button = form.submit.addEventListener("click", (e) => {
//   e.preventDefault();
//   const login = "http://localhost:3000/user/signin";

//   fetch(login, {
//     method: "POST",
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: form.email.value,
//       password: form.password.value,
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       // console.log(response.message);
//       localStorage.setItem("fullname", response.user.fullname);
//       localStorage.setItem("email", response.user.email);
//       localStorage.setItem("token", response.accesstoken);
//       window.location.replace("./index.html");
//       // code here //
//       // if (data.error) {
//       //   alert(data.errors[1].msg);
//       // } else if (data.user.role === "admin") {
//       //   console.log(data.user.role);
//       //   window.open("./Project/Admin Dashboard.html", "_self");
//       // } else if (data.user.role === "user") {
//       //   window.open("index.html", "_self");
//       // }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

async function signin() {
  // const valid = validate();
  // if (valid == true) {
  const action = await axios
    .post("/user/signin", {
      email: form.email.value,
      password: form.password.value,
    })
    .then(function (response) {
      if (response.status == 200) {
        window.location.replace(response.request.responseURL);
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error.response.data.message);
    });
}

function signout() {
  axios.post("/logout");
}
