const form = {
  name: document.getElementById("FullName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmpassword: document.getElementById("confirmpassword"),
  phone: document.getElementById("phone"),
  submit: document.getElementById("signin-btn-submit"),
};

const input = document.getElementById("FullName");
const log = document.getElementById("FullNameError");

input.addEventListener("change", updateFullName);

function updateFullName() {
  if (form.name.value == "") {
    document.getElementById("FullNameError").innerHTML =
      "You Must Enter a FullName.";
    return "You Must Enter a FullName.";
  } else document.getElementById("FullNameError").innerHTML = "";
  return "";
}

const inputemail = document.getElementById("email");
const logemail = document.getElementById("EmailError");

inputemail.addEventListener("change", updateEmail);

function updateEmail() {
  if (form.email.value == "") {
    logemail.innerHTML = "You Must Enter a Email.";
    return "You Must Enter a Email.";
  } else {
    const email = form.email.value.split("");
    const valemail = email.filter((x) => x == "@");
    const valemail2 = email.filter((x) => x == ".");
    if (valemail.length != 1 && valemail2.length >= 1) {
      logemail.innerHTML = "You Must Enter a valid Email.";
    } else {
      logemail.innerHTML = "";
      return "";
    }
  }
}

const inputpassword = document.getElementById("password");
const inputconfirmpassword = document.getElementById("confirmpassword");
const logpassword = document.getElementById("passwordError");

function validatePassword() {
  if (form.password.value == "" || form.confirmpassword.value == "") {
    logpassword.innerHTML = "You must enter a password";
    return "You must enter a password";
  } else if (form.password.value != form.confirmpassword.value) {
    logpassword.innerHTML = "You must enter a matching password";
    return "You must enter a matching password.";
  } else return "";
}

function valiatepass() {
  var decimal =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (form.password.value.match(decimal)) {
    return "";
  } else if (!form.password.value.match(decimal)) {
    logpassword.innerHTML =
      "You must enter a passwod 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ";
    return "You must enter ";
  }
}

function validateDOB(field3) {
  let dob = new Date(field3);
  let diff = Date.now() - dob.getTime();
  let age = new Date(diff);
  if (Math.abs(age.getUTCFullYear() - 1970) >= 18) {
    return "";
  } else {
    document.getElementById("a4").innerHTML =
      "You Must be-older than 18 years.";
    return "You Must be-older than 18 years.";
  }
}

function validate() {
  let fail = "";
  fail += updateFullName();
  fail += updateEmail();
  fail += validatePassword();
  fail += valiatepass();
  if (fail == "") {
    return true;
  } else {
    return false;
  }
}

// function signup(){}
// const form = {
//     name: document.querySelector("#b"),
//     email: document.querySelector("#b1"),
//     password: document.querySelector("#b2"),
//     phone: document.querySelector("#b2"),
//     submit: document.querySelector("#signin-btn-submit"),
//     messages: document.getElementById("a2"),
// };
// let button = form.submit.addEventListener("click", (e) => {
//   e.preventDefault();
//   const valid = validate();
//   if (valid == true) {
//     const signup = "http://localhost:3000/user/signup";

//     fetch(signup, {
//       method: "POST",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         fullname: form.name.value,
//         email: form.email.value,
//         password: form.password.value,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         localStorage.setItem("fullname", data.signup.fullname);
//         localStorage.setItem("email", data.signup.email);
//         localStorage.setItem("token", data.accesstoken);
//         // code here //
//         if (data.error) {
//           alert(response.data.message); /*displays error message*/
//         } else {
//           // window.open("index.html", "_self"); /*opens the target page while Id & password matches*/
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// });

async function signup() {
  const valid = validate();
  if (valid == true) {
    const action = await axios
      .post("/user/signup", {
        fullname: form.name.value,
        email: form.email.value,
        typeofuser: "user",
        password: form.password.value,
      })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          window.location.replace(response.request.responseURL);
        }
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  }
}

function signout() {
  axios.post("/logout");
}
