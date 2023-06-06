
const form = {
  name: document.getElementById("FullName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmpassword: document.getElementById("confirmpassword"),
  phone: document.getElementById("phone"),
  submit: document.getElementById("signin-btn-submit"),
};


function signin() {
      $.ajax({
        url: "/user/signin",
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
        success: function (response) {
            if (response.usertype == "user") {
              window.location.replace('/');
            }else if(response.usertype == "admin"){
              window.location.replace('/admin');
            }
        },
        error:function(response){  
          document.getElementById("errormassage").innerHTML= response.responseJSON.message
        }}
      )

  }


