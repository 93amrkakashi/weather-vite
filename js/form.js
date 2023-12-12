const footerTextElement = document.getElementById("footerText");
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
  const response = await fetch("./locales/translations.json");
  translations = await response.json();
  lang = localStorage.getItem("lang");
  changeLanguage(lang || "ar");
}

function changeLanguage() {
  let selectedValue = selectElement.value;
  console.log(selectedValue);
  document.documentElement.lang = selectedValue;
  localStorage.setItem("lang", selectedValue);
  const elements = document.querySelectorAll("[data-translation]");
  elements.forEach((element) => {
    const translationKey = element.dataset.translation;
    element.textContent = translations[selectedValue][translationKey] || "";
  });
}

loadTranslations();
document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  changeLanguage(lang);
});

function searchCities(text) {
  if (!text.length <= 0) {
    const results = filterCities(text);
    displayResults(results);
  } else {
    searchResultsElement.style.display = "none";
  }
}
function filterCities(text) {
  text = text.toLowerCase();
  const sliceLength = lang === "ar" ? 4 : 6;
  if (lang == "ar") {
    return arTun.filter((city_name) =>
      city_name.city.toLowerCase().slice(sliceLength).includes(text)
    );
  } else {
    return frTun.filter((city_name) =>
      city_name.city.toLowerCase().slice(sliceLength).includes(text)
    );
  }
}

function displayResults(results) {
  searchResultsElement.innerHTML = "";
  results.forEach((result) => {
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
    glass_element.forEach(function (element) {
      element.classList.add("glass_dark");
      element.classList.remove("glass_light");
    });
  } else {
    glass_element.forEach(function (element) {
      element.classList.add("glass_light");
      element.classList.remove("glass_dark");
    });
  }
}

change_glass(localStorage.getItem("theme"));

function changeTheme() {
  if (mainContainer.classList.contains("light")) {
    mainContainer.classList.add("dark");
    mainContainer.classList.remove("light");
    localStorage.setItem("theme", "dark");
    change_glass("dark");
  } else {
    mainContainer.classList.add("light");
    mainContainer.classList.remove("dark");
    localStorage.setItem("theme", "light");
    change_glass("light");
  }
}

const toolbar = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link"],
];
var ar_body = new Quill("#ar_body", {
  theme: "snow",
  modules: {
    toolbar: toolbar,
  },
});

var fr_body = new Quill("#fr_body", {
  theme: "snow",
  modules: {
    toolbar: toolbar,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var fileInput = document.getElementById("file-input");
  var filePreview = document.getElementById("file-preview");

  fileInput.addEventListener("change", function () {
    filePreview.innerHTML = "جارى المعالجة";

    var files = fileInput.files;
    filePreview.innerHTML = "";
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var previewItem = document.createElement("div");
      previewItem.classList.add("p-3");
      var image = document.createElement("img");
      image.classList.add("file-preview-image");
      previewItem.appendChild(image);
      image.src = URL.createObjectURL(file);
      image.classList.add("uploaded_file")
      filePreview.appendChild(previewItem);
    }
  });

  var dropzone = document.getElementById("file-upload");

  dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropzone.classList.remove("drag-over");

    var files = e.dataTransfer.files;
    fileInput.files = files;

    // Trigger the change event to update the file preview
    var event = new Event("change");
    fileInput.dispatchEvent(event);
  });
});
