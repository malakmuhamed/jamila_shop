// document.getElementById("Name").innerHTML = localStorage.getItem("fullname");
// if (localStorage.getItem("fullname")) {
//   alert(`Welcome ${localStorage.getItem("fullname")}`);
//   document.getElementById("signin").style.display = "none";
// }

// if (localStorage.getItem("token")) {
//   axios
//     .get("/user/users", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     })

//     .then(function (response) {
//       if (response.status == 200) {
//         console.log(response.data);
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//       alert(error.response.data.message);
//     });
// }
