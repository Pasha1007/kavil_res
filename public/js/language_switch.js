const radioInputs = document.querySelectorAll('input[name="radio"]');
const allLang = ["ua", "pl", "en"];
const bgImages = {
  ua: "url('/img/coffee_choose_bg.webp')",
  pl: "url('/img/choose_coffee_pl.webp')",
  en: "url('/img/choose_coffee_en.webp')",
};
const choise_camera = {
  ua: "/img/camera3602.webp",
  pl: "/img/camera360_pl.webp",
  en: "/img/camera360_en.webp",
};
const choise_mob_app = {
  ua: "/img/mob_app2.webp",
  pl: "/img/mob_app_pl.webp",
  en: "/img/mob_app_en.webp",
};
const choise_terminal = {
  ua: "/img/terminal.webp",
  pl: "/img/terminal_pl.webp",
  en: "/img/terminal_en.webp",
};
const choise_cash_receiver = {
  ua: "/img/cash_receiver2.webp",
  pl: "/img/cash_receiver_pl.webp",
  en: "/img/cash_receiver_en.webp",
};

radioInputs.forEach((radio) => {
  radio.addEventListener("change", changeURLLanguage);
});

function changeURLLanguage() {
  let lang = document.querySelector('input[name="radio"]:checked').value;
  localStorage.setItem("language", lang);
  changeLanguage();
}

function changeLanguage() {
  let lang = localStorage.getItem("language") || "ua";
  console.log(lang);

  if (!allLang.includes(lang)) {
    lang = "ua";
    localStorage.setItem("language", lang);
  }

  document.querySelector(`input[name="radio"][value="${lang}"]`).checked = true;

  for (let key in langArr) {
    let elems = document.querySelectorAll(".lng_" + key);
    elems.forEach(function (elem) {
      elem.innerHTML = langArr[key][lang];
    });
  }

  const choiseContainer = document.querySelector(".choise_container");
  const camera360 = document.querySelectorAll(".camera360");
  const mobApp = document.querySelectorAll(".mob_app");
  const terminal = document.querySelectorAll(".terminl_nfc");
  const cashReceiver = document.querySelectorAll(".cash_rec");

  if (choiseContainer) {
    choiseContainer.style.backgroundImage = bgImages[lang];
  }
  if (camera360.length > 0) {
    camera360.forEach(function (camera) {
      camera.src = choise_camera[lang];
    });
  }

  if (mobApp.length > 0) {
    mobApp.forEach(function (app) {
      app.src = choise_mob_app[lang];
    });
  }

  if (terminal.length > 0) {
    terminal.forEach(function (term) {
      term.src = choise_terminal[lang];
    });
  }

  if (cashReceiver.length > 0) {
    cashReceiver.forEach(function (receiver) {
      receiver.src = choise_cash_receiver[lang];
    });
  }
}

let savedLanguage = localStorage.getItem("language");
if (!allLang.includes(savedLanguage)) {
  localStorage.setItem("language", "ua");
  savedLanguage = "ua";
}
changeLanguage();
