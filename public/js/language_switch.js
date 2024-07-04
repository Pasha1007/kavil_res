const radioInputs = document.querySelectorAll('input[name="radio"]');
const allLang = ["ua", "pl"];

radioInputs.forEach((radio) => {
  radio.addEventListener("change", changeURLLanguage);
});

function changeURLLanguage() {
  let lang = document.querySelector('input[name="radio"]:checked').value;
  location.href =
    window.location.pathname + window.location.search + "#" + lang;
  changeLanguage();
}

function changeLanguage() {
  let hash = window.location.hash.substring(1);
  console.log(hash);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + window.location.search + "#ua";
    hash = "ua";
  }

  document.querySelector(`input[name="radio"][value="${hash}"]`).checked = true;

  for (let key in langArr) {
    let elems = document.querySelectorAll(".lng_" + key);
    elems.forEach(function (elem) {
      elem.innerHTML = langArr[key][hash];
    });
  }
}

if (!allLang.includes(window.location.hash.substring(1))) {
  location.href = window.location.pathname + window.location.search + "#ua";
  location.reload();
} else {
  changeLanguage();
}
