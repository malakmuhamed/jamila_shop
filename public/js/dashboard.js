const ThemeToggler = document.querySelector(".theme-toggler");

ThemeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");
  ThemeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  ThemeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

const form = {
  name: document.getElementById("name"),
  desc: document.getElementById("desc"),
  image: document.getElementById("image"),
};

async function addproduct() {
  // const valid = validate();
  // if (valid == true) {
  const action = await axios.post("/user/addproduct", {
    name: form.name.value,
    desc: form.desc.value,
    image: form.image.value,
  });
  // .then(function (response) {
  //   if (response.status == 200) {
  //     window.location.replace("/");
  //   }
  // })
  // .catch(function (error) {
  //   console.log(error);
  //   alert(error.response.data.message);
  // });
}
