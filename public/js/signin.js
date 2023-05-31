const form = {
  name: document.getElementById("FullName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmpassword: document.getElementById("confirmpassword"),
  phone: document.getElementById("phone"),
  submit: document.getElementById("signin-btn-submit"),
};



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
