var drinkVal = 80;
var monthVal = 12;
var cofVal = 1;

let lang = localStorage.getItem("language");

function formatCurrencyPln(amount) {
  const plnAmount = amount * 0.0983;
  return plnAmount.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
function formatCurrencyUah(amount) {
  const plnAmount = amount;
  return plnAmount.toLocaleString("ua-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
function formatCurrencyUsd(amount) {
  const plnAmount = amount * 0.024;
  return plnAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
function getCurrentLanguage() {
  return localStorage.getItem("language");
}
function setTotalForMonth() {
  var result = 16 * drinkVal * 30 * cofVal;
  let lang = getCurrentLanguage();
  if (lang === "ua") {
    document.getElementById("cleanForMonth").textContent =
      formatCurrencyUah(result);
    console.log(result);
  } else if (lang === "pl") {
    document.getElementById("cleanForMonth").textContent =
      formatCurrencyPln(result);
    console.log(result);
  } else {
    document.getElementById("cleanForMonth").textContent =
      formatCurrencyUsd(result);
    console.log(result);
  }
}

function setTotalForPeriod() {
  var result = 16 * drinkVal * 30 * monthVal * cofVal;
  let lang = getCurrentLanguage();
  if (lang === "ua") {
    document.getElementById("cleanForPeriod").textContent =
      formatCurrencyUah(result);
    console.log(result);
  } else if (lang === "pl") {
    document.getElementById("cleanForPeriod").textContent =
      formatCurrencyPln(result);
    console.log(result);
  } else {
    document.getElementById("cleanForPeriod").textContent =
      formatCurrencyUsd(result);
    console.log(result);
  }
}
function drinkRangeChange(val) {
  drinkVal = val;
  setTotalForMonth();
  setTotalForPeriod();
  document.getElementById("drink_value").textContent = val;
}

function monthRangeChange(val) {
  monthVal = val;
  setTotalForPeriod();
  document.getElementById("coffee_value").textContent = val;
}

function cofRangeChange(val) {
  cofVal = val;
  setTotalForMonth();
  setTotalForPeriod();
  document.getElementById("coffee_value").textContent = val;
}
setTotalForMonth();
setTotalForPeriod();
function scrollToTop() {
  $("html, body").animate({ scrollTop: 0 }, "fast");
}

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top - 50;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

document.querySelector(".choose_btn1").addEventListener("click", function () {
  document.querySelector(".left_panel").style.transform = "translateX(0)";
});

document.querySelector(".choose_btn2").addEventListener("click", function () {
  document.querySelector(".right_panel").style.transform = "translateX(0)";
});

document.querySelectorAll(".close_btn").forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.parentElement.classList.contains("left_panel")) {
      button.parentElement.style.transform = "translateX(-100%)";
    } else if (button.parentElement.classList.contains("right_panel")) {
      button.parentElement.style.transform = "translateX(100%)";
    }
  });
});

function toggleContent(element) {
  const allContents = document.querySelectorAll(".content");
  allContents.forEach((content) => {
    if (content !== element.querySelector(".content")) {
      content.style.maxHeight = "0";
      content.style.padding = "0 10px";
      content.classList.remove("expanded");
    }
  });

  const content = element.querySelector(".content");

  if (content.style.maxHeight === "0px" || !content.style.maxHeight) {
    content.style.maxHeight = content.scrollHeight + 15 + "px";
    content.style.padding = "10px 10px";
    content.classList.add("expanded");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".input_with_checkark");
  inputs.forEach((input) => {
    const checkmark = input.parentElement.querySelector(".checkmark");
    if (input.checked) {
      checkmark.style.opacity = "1";
    }

    input.addEventListener("change", () => {
      inputs.forEach((i) => {
        const checkmark = i.parentElement.querySelector(".checkmark");
        if (i.checked) {
          checkmark.style.opacity = "1";
        } else {
          checkmark.style.opacity = "0";
        }
      });
    });
  });
});
// document.addEventListener("DOMContentLoaded", function () {
//   const dispencerBlock = document.getElementById("dispencer-block");
//   const coinReceiverBlock = document.getElementById("coin-receiver-block");
//   const dispencerCheckbox = document.getElementById("dispencer-checkbox");
//   const coinReceiverCheckbox = document.getElementById(
//     "coin-receiver-checkbox"
//   );
//   const dispencerImg = document.getElementById("dispencer-img");
//   const coinReceiverImg = document.getElementById("coin-receiver-img");

//   function toggleSelection(checkbox, img, selectedSrc, unselectedSrc) {
//     if (checkbox.checked) {
//       img.src = selectedSrc;
//     } else {
//       img.src = unselectedSrc;
//     }
//   }

//   dispencerBlock.addEventListener("click", function () {
//     dispencerCheckbox.checked = !dispencerCheckbox.checked;
//     toggleSelection(
//       dispencerCheckbox,
//       dispencerImg,
//       dispencerImg.getAttribute("data-src-selected"),
//       dispencerImg.getAttribute("data-src-unselected")
//     );
//   });

//   coinReceiverBlock.addEventListener("click", function () {
//     coinReceiverCheckbox.checked = !coinReceiverCheckbox.checked;
//     toggleSelection(
//       coinReceiverCheckbox,
//       coinReceiverImg,
//       coinReceiverImg.getAttribute("data-src-selected"),
//       coinReceiverImg.getAttribute("data-src-unselected")
//     );
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".image-block");

  function toggleSelection(checkbox, img, selectedSrc, unselectedSrc) {
    if (checkbox.checked) {
      img.src = selectedSrc;
    } else {
      img.src = unselectedSrc;
    }
  }

  blocks.forEach(function (block) {
    const checkbox = block.querySelector('input[type="checkbox"]');
    const img = block.querySelector("img");

    block.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      toggleSelection(
        checkbox,
        img,
        img.getAttribute("data-src-selected"),
        img.getAttribute("data-src-unselected")
      );
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  fetchCities();
});

function fetchCities() {
  fetch("./citiesUKR.json")
    .then((response) => response.json())
    .then((data) => {
      const dropdownContent = document.getElementById("dropdownContent");
      data.forEach((city) => {
        const a = document.createElement("a");
        a.textContent = capitalizeFirstLetter(city.object_name.toLowerCase());
        a.href = "#";
        a.onclick = function () {
          document.getElementById("citySearch").value = this.textContent;
          dropdownContent.classList.remove("show");
        };
        dropdownContent.appendChild(a);
      });
    })
    .catch((error) => console.error("Error fetching cities:", error));
}

function filterFunction() {
  var input, filter, div, a, i;
  input = document.getElementById("citySearch");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdownContent");
  a = div.getElementsByTagName("a");

  if (filter.length > 0) {
    div.classList.add("show");
  } else {
    div.classList.remove("show");
  }
  input.addEventListener("keyup", logKey);

  function logKey(e) {
    if (e.keyCode === 13) {
      div.classList.remove("show");
    }
  }
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
$(".coffemachine_form").submit(function (e) {
  e.preventDefault();
  var form = $(this);

  var full_name = form.find("#name");
  var full_name_value = full_name.val();
  var phone = form.find("#phone");
  var phone_value = phone.val();
  var error_message = form.find(".error");
  var success_message = form.find(".success");

  const phoneRegex =
    /^([+]?[\s0-9]+)?(\(\d{2,}\)|[(]?[0-9]+[)])?([-]?[\s]?[0-9]+[-]?\s?)+$/;

  if (!phone_value.match(phoneRegex) || phone_value.length < 7) {
    phone.focus();
    error_message.text("Невірний номер телефону");
    success_message.text("");
    return;
  }
});
let insideOrOutside = "";
function confirmInsideMachine() {
  form = document.querySelector(".confirm_popup_cont");
  form.style.display = "flex";

  var machineType = document.getElementsByName("inside_machine");
  var condition = document.getElementsByName("inside_newby");
  var city = document.getElementById("citySearch").value;
  var helpLocation = document.getElementsByName("inside_location");
  var quantity = document.getElementById("quantInput").value;
  for (i = 0; i < machineType.length; i++) {
    if ((machineType[i].type = "radio")) {
      if (machineType[i].checked) console.log(machineType[i].value);
    }
  }
  for (i = 0; i < condition.length; i++) {
    if ((condition[i].type = "radio")) {
      if (condition[i].checked) console.log(condition[i].value);
    }
  }
  for (i = 0; i < helpLocation.length; i++) {
    if ((helpLocation[i].type = "radio")) {
      if (helpLocation[i].checked) console.log(helpLocation[i].value);
    }
  }
  console.log(city);
  console.log(quantity);
}
function closeConfirmPopup() {
  form = document.querySelector(".confirm_popup_cont");
  form2 = document.querySelector(".confirm_popup_cont2");

  form.style.display = "none";
  form2.style.display = "none";
}
function confirmOutsideMachine() {
  form = document.querySelector(".confirm_popup_cont2");
  form.style.display = "flex";

  var machineType = document.getElementsByName("outside_machine");
  var condition = document.getElementsByName("outside_newby");
  var city = document.getElementById("citySearch").value;
  var helpLocation = document.getElementsByName("outside_location");
  var quantity = document.getElementById("quantInput2").value;

  for (i = 0; i < machineType.length; i++) {
    if ((machineType[i].type = "radio")) {
      if (machineType[i].checked) console.log(machineType[i].value);
    }
  }
  for (i = 0; i < condition.length; i++) {
    if ((condition[i].type = "radio")) {
      if (condition[i].checked) console.log(condition[i].value);
    }
  }
  for (i = 0; i < helpLocation.length; i++) {
    if ((helpLocation[i].type = "radio")) {
      if (helpLocation[i].checked) console.log(helpLocation[i].value);
    }
  }
  console.log(city);
  console.log(quantity);
}
function increment() {
  let input = document.getElementById("quantInput");
  let currentValue = parseInt(input.value);
  if (currentValue < input.max) {
    input.value = currentValue + 1;
  }
}

function decrement() {
  let input = document.getElementById("quantInput");
  let currentValue = parseInt(input.value);
  if (currentValue > input.min) {
    input.value = currentValue - 1;
  }
}
function increment2() {
  let input = document.getElementById("quantInput2");
  let currentValue = parseInt(input.value);
  if (currentValue < input.max) {
    input.value = currentValue + 1;
  }
}

function decrement2() {
  let input = document.getElementById("quantInput2");
  let currentValue = parseInt(input.value);
  if (currentValue > input.min) {
    input.value = currentValue - 1;
  }
}
$(document).ready(function () {
  // calculator
  $("#drinkRange").val(80);
  $("#monthRange").val(12);
  $("#cofRange").val(1);

  $("#cleanForMonth").text(setTotalForMonth());
  $("#cleanForPeriod").text(setTotalForPeriod());

  // coffee machine
  $(".exchangeFrames").click(function () {
    $("#coffeemachine_instruments").removeAttr("hidden");
    $("#coffeemachine_variants").attr("hidden", true);
    $("#container_coffeemachine_video").get(0).play();
  });

  // pop ups
  var targetDiv = $("#container_partner");
  var alreadyShown = false;
  var loopingInterval;

  function checkViewport() {
    if (alreadyShown || localStorage.getItem("formSubmitted") == "1") {
      clearInterval(loopingInterval);
      return;
    }

    if (!targetDiv.isInViewport()) {
      // show div
      $("#root").css("filter", "brightness(0.5) blur(5px)");
      $("#form_popup").css("display", "flex");
      $(".right_panel").hide();
      alreadyShown = true;
    }
  }

  function repeatCheck() {
    loopingInterval = setInterval(function () {
      checkViewport();
    }, 40000);
  }

  $("#form_popup .closeBtn").click(function () {
    $("#form_popup").hide();
    $("#root").css("filter", "none");
    $(".right_panel").css("display", "flex");
  });

  repeatCheck();

  // main video observer

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Trigger when 30% of the target is visible
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.play();
        observer.unobserve(video);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  $(".lazy-load").each(function () {
    observer.observe(this);
  });

  // about_us && title

  var container_title_video = document.querySelector("#container_title video");

  window.addEventListener("resize", function () {
    if (container_title_video != null) {
      if (window.innerWidth <= 920) {
        container_title_video.style.width = "100%";
        container_title_video.style.maxWidth = "none";
        container_title_video.style.height = "100vh";
      } else {
        container_title_video.style.width = "100%";
        container_title_video.style.maxWidth = "100%";
        container_title_video.style.height = "auto";
      }
    }
  });

  window.dispatchEvent(new Event("resize"));

  $(".defaultButton").click(function () {
    if (!$(this).hasClass("activeButton")) {
      let previousActive;

      if ($("#firstSliderButton").hasClass("activeButton")) {
        previousActive = $("#firstSliderButton");
      } else if ($("#secondSliderButton").hasClass("activeButton")) {
        previousActive = $("#secondSliderButton");
      } else {
        previousActive = $("#thirdSliderButton");
      }

      previousActive.css("color", "white");
      previousActive.removeClass("activeButton");
      previousActive.removeClass("activeButton");

      $(this).css("color", "#FAB619");
      $(this).addClass("activeButton");
    }
  });

  // headers

  // on page load
  if ($(window).width() > 1200) {
    if (!$("#container_title").isInViewport()) {
      $("#secondary_nav").css({
        display: "block",
        position: "fixed",
      });

      $("#scroll-button").css({ display: "block" });
    } else {
      $("#secondary_nav").css({
        display: "none",
      });

      $("#scroll-button").css({ display: "none" });
    }

    // on resize action
    $(window).on("resize scroll", function () {
      // if not in viewport our header then
      if (!$("#container_title").isInViewport()) {
        $("#secondary_nav").css({
          display: "block",
          position: "fixed",
        });
        $("#scroll-button").css({ display: "block" });
      } else {
        $("#secondary_nav").css({
          display: "none",
        });
        $("#scroll-button").css({ display: "none" });
      }
    });
  } else {
    $("#secondary_nav").css({
      display: "none",
    });

    $("#primary_nav").css({
      display: "none",
    });

    $(window).on("resize scroll", function () {
      if (!$("#container_title").isInViewport()) {
        $("#scroll-button").css({ display: "block" });
      } else {
        $("#scroll-button").css({ display: "none" });
      }
    });
  }
});

window.addEventListener("hashchange", function () {
  hash = window.location.hash.substring(1);
  setTotalForMonth();
  setTotalForPeriod();
});
