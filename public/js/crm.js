var alreadyWatched = false;
var hash = window.location.hash.substring(1);

function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function sendPostRequest(full_name, phone, success_message, error_message) {
  const requestData = {
    full_name,
    phone,
    utm_source: getUrlParameter("utm_source"),
    utm_medium: getUrlParameter("utm_medium"),
    utm_campaign: getUrlParameter("utm_campaign"),
    utm_content: getUrlParameter("utm_content"),
  };

  fetch("/api/crmRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then(() => {
      localStorage.setItem("formSubmitted", "1");
      error_message.text("");
      success_message.text("Заявка була успішно відправлена");

      // pop up success
      document.querySelector(".mailer_form").reset();
      window.location.href = "successPage.html";
      // $('#success_pop_up').css('display', 'flex');
      // $("#root").css("filter", "brightness(0.5) blur(5px)");

      $("#form_popup").hide();
    })
    .catch((error) => console.error("Error making API request:", error));
}

$(document).ready(function () {
  $("#success_pop_up .closeBtn").click(function () {
    $("#root").css("filter", "none");
    $("#success_pop_up").hide();
  });

  localStorage.setItem("formSubmitted", "0");
  var background_video = $("#videoForm");

  if (!alreadyWatched) {
    background_video.get(0).addEventListener("timeupdate", timeUpdateHandler);
  }

  function timeUpdateHandler() {
    if (this.currentTime >= 2.8) {
      this.pause();
      background_video
        .get(0)
        .removeEventListener("timeupdate", timeUpdateHandler);
    }
  }

  $(".mailer_form").submit(function (e) {
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

    if (!alreadyWatched) {
      background_video.get(0).play();
      alreadyWatched = true;
    }

    sendPostRequest(
      full_name_value,
      phone_value,
      success_message,
      error_message
    );
  });
});
