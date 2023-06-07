function signout() {
  axios.post("/logout");
}

const bag = JSON.parse(localStorage.getItem("bag")).length

if (bag > 0) {
  document.getElementById("bagnum").innerHTML = bag
}

$(window).scroll(function () {
  var $heightScrolled = $(window).scrollTop();
  var $defaultHeight = 200;
  var navElement = document.querySelector("nav");
  if ($heightScrolled < $defaultHeight) {

    $('#logo').removeClass("brand-logoa")
    $('#logo').addClass("brand-logo")
    navElement.style.opacity = 1
  }
  else {
    $('#logo').removeClass("brand-logo")
    $('#logo').addClass("brand-logoa")
    navElement.style.opacity = .8

  }

});