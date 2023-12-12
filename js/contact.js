const footerTextElement = document.getElementById('footerText');
const currentYear = new Date().getFullYear();
footerTextElement.textContent = `meteo-Tunisie.net © ! أفضل معلومات الطقس. ${currentYear}!`;
let selectElement = document.getElementById("languageSelect");
const searchResultsElement = document.getElementById("searchResults");
const mainContainer = document.querySelector("body");


let toggleBtn = document.querySelector("#navbar-toggle");
let collapse = document.querySelector("#navbar-collapse");

toggleBtn.onclick = () => {
  collapse.classList.toggle("hidden");
  collapse.classList.toggle("flex");
};





let translations;

async function loadTranslations() {
  const response = await fetch('./locales/translations.json');
  translations = await response.json();
  lang = localStorage.getItem("lang")
  changeLanguage(lang || 'ar');
}

function changeLanguage() {
  let selectedValue = selectElement.value;
  console.log(selectedValue)
  document.documentElement.lang = selectedValue;
  localStorage.setItem("lang",selectedValue)
  const elements = document.querySelectorAll('[data-translation]');
  elements.forEach(element => {
    const translationKey = element.dataset.translation;
    element.textContent = translations[selectedValue][translationKey] || '';
  });
  change_dir(selectedValue)
}



loadTranslations()
document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar"
  theme = localStorage.getItem("theme") || "light"
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  changeLanguage();
  
});



function searchCities(text) {
  if (!text.length<= 0) {
    const results = filterCities(text);
    displayResults(results);
  } else{
    searchResultsElement.style.display = "none";
  }
}
function filterCities(text) {
  text = text.toLowerCase();
  const sliceLength = lang === "ar" ? 4 : 6;
  if (lang == "ar") {
      return arTun.filter(city_name => city_name.city.toLowerCase().slice(sliceLength).includes(text));
  } else {
      return frTun.filter(city_name => city_name.city.toLowerCase().slice(sliceLength).includes(text));
  }
}
function displayResults(results) {
console.log(results)
  searchResultsElement.innerHTML = "";

  results.forEach(result => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <a href="./index.html?lat=${result.lat}&lng=${result.lng}&city=${result.city}"
    class="inline-block w-full  result_item" >
    ${result.city}
    </a>`;
    searchResultsElement.appendChild(listItem);
  });
  searchResultsElement.style.display = results.length > 0 ? "flex" : "none";
}
const themeToggleBtn = document.querySelector(".theme_toggler");
themeToggleBtn.addEventListener("click", changeTheme);
glass_element = document.querySelectorAll(".glass");

function change_glass(theme) {
  
  if (theme == "dark") {
    glass_element.forEach(function(element) {
      element.classList.add("glass_dark");
      element.classList.remove("glass_light");
    });
  } else{
    glass_element.forEach(function(element) {
      element.classList.add("glass_light");
      element.classList.remove("glass_dark");
    });
  }
}

change_glass(localStorage.getItem("theme"))

function changeTheme() {
  if (mainContainer.classList.contains("light")) {
    mainContainer.classList.add("dark");
    mainContainer.classList.remove("light");
    localStorage.setItem("theme", "dark")
    change_glass("dark")
  } else {
    mainContainer.classList.add("light");
    mainContainer.classList.remove("dark");
    localStorage.setItem("theme", "light")
    change_glass("light")
  }
}

let fields = document.querySelectorAll(".field");

function change_dir(lang) {
  fields.forEach(field => {
    if (lang === "ar") {
      field.classList.add("items-start");
      field.classList.remove("items-end");
    } else {
      field.classList.remove("items-start");
      field.classList.add("items-end");
    }
  });
}
