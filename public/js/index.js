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


function addtobag(image) {
    var data = JSON.parse(localStorage.getItem("bag") || "[]");
    var esl = JSON.parse(image)
    var total = esl.price - esl.price * esl.offer / 100
    Object.assign(esl, { total: total });

    data.push(esl);
    localStorage.setItem("bag", JSON.stringify(data, total));
    window.location.reload();
    const arr = JSON.parse(localStorage.getItem("bag"))

    $.ajax({
        url: "/addcart",
        method: 'post',
        contentType: 'application/json',
        data: localStorage.getItem("bag"),
        success: function (response) {
        },
    }
    )
}