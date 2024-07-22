const radioInputs = document.querySelectorAll('input[name="radio"]');
const allLang = ["ua", "pl"];

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
}

let savedLanguage = localStorage.getItem("language");
if (!allLang.includes(savedLanguage)) {
  localStorage.setItem("language", "ua");
  savedLanguage = "ua";
}
changeLanguage();
