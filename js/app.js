const weatherKey = process.env.WEATHER_KEY;
const googleMapsApiKey = process.env.GOOGLE_KEY;


function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
  script.defer = true;
  document.head.appendChild(script);
}

window.initMap = function () {
  const mapElement = document.getElementById("googleMap");
  const map = new google.maps.Map(mapElement, {
    center: { lat: 33.8869, lng: 9.5375 },
    zoom: 8,
  });

  google.maps.event.addListener(map, "click", async function (event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(geocodingUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.status}`);
      }

      const data = await response.json();
      const city = data.address.county;

      let lang = localStorage.getItem("lang");
      await callWeatherAPI(lat, lng, lang);
      city_name.innerText = city;

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: `الطقس في ${lat}, ${lng}`,
      });
    } catch (error) {
      console.error("error", error);
    }
  });
};

loadGoogleMapsScript();

// constant vars
const city_name = document.querySelector(".city_name");
const footerTextElement = document.getElementById("footerText");
const currentYear = new Date().getFullYear();
footerTextElement.textContent = `meteo-Tunisie.net © ! أفضل معلومات الطقس. ${currentYear}!`;
// const selectElement = document.getElementById("languageSelect");
const searchResultsElement = document.getElementById("searchResults");
const mainContainer = document.querySelector("body");
const toggleBtn = document.querySelector("#navbar-toggle");
const collapse = document.querySelector("#navbar-collapse");
const daysOfWeekArabic = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const daysOfWeekFrench = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const daysOfWeek = daysOfWeekFrench;
const currentURL = new URL(window.location.href);
const parameters = extractParametersFromURL(currentURL);

const today = new Date().getDay();
const daysList = [];
for (let i = 0; i < daysOfWeek.length; i++) {
  const dayIndex = (today + i) % daysOfWeek.length;
  daysList.push(daysOfWeek[dayIndex]);
}
// collapse navbar
toggleBtn.onclick = () => {
  collapse.classList.toggle("hidden");
  collapse.classList.toggle("flex");
};

// to get initial location of user ==> to get weather in this location
function getInitialLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        let lang = localStorage.getItem("lang");
        callWeatherAPI(lat, lng, lang);
      },
      function (error) {
        console.error("err", error.message);
      }
    );
  } else {
    console.error("wrong");
  }
}

// get url params so that can get weather for selected cities in other pages
function extractParametersFromURL(url) {
  const urlSearchParams = new URLSearchParams(url.search);
  const lat = urlSearchParams.get("lat");
  const lng = urlSearchParams.get("lng");
  const city = urlSearchParams.get("city");
  return { lat, lng, city };
}

// to perform a search and choose a city
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
  console.log(results);
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

const selectElement = document.getElementById("languageSelect");
  selectElement.addEventListener("change", function () {
    changeLanguage(this);
  });

// to change language ==> getting translations and change page content
let changeLanguage= function changeLanguage(selectElement) {
  const selectedValue =
    selectElement.value || localStorage.getItem("lang") || "ar";

  console.log(selectedValue);

  document.documentElement.lang = selectedValue;
  localStorage.setItem("lang", selectedValue);

  const elements = document.querySelectorAll("[data-translation]");
  elements.forEach((element) => {
    const translationKey = element.dataset.translation;
    element.textContent = translations[selectedValue][translationKey] || "";
  });

  populateCities(selectedValue);
  if (parameters != null) {
    getRandomCity(selectedValue);
  } else {
    getInitialLocation();
  }
}

// the main function that takes lat, lng and call api to get weather data
async function callWeatherAPI(lat, lng, lang) {
  try {
    lang = localStorage.getItem("lang");
    const days_cohosed = lang == "ar" ? daysOfWeekArabic : daysOfWeekFrench;
    const key = weatherKey;
    const units = "metric";
    const url =
      lang == "ar"
        ? `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=ar`
        : `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=fr`;
    const response = await fetch(url);
    if (!response.ok) {
      const weatherContainer = document.querySelector(".tol");
    weatherContainer.innerHTML = "errrrrrrrrrrr";
      throw new Error(`Failed to fetch weather data: ${response.status}`);
      
    }
    const data = await response.json();
    const weatherContainer = document.querySelector(".tol");
    weatherContainer.innerHTML = "";
    days_cohosed.forEach((dayName, index) => {
      const day = data.daily[index];
      const dayElement = document.createElement("div");
      dayElement.classList.add(
        "flex",
        `${lang == "ar" ? "." : "flex-row-reverse"}`,
        "justify-around",
        "items-center",
        "w-[300px]",
        "gap-2",
        "h-[55px]"
      );
      // inner html for days list on homepage that shows days with weather data for each day
      dayElement.innerHTML = `
        <p class="text-xl text-black font-bold">${dayName}</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          class="w-[70px] h-[70ox] mx-4 " alt="${day.weather[0].description}"
        />
        <p dir="rtl" class=" text-black text-bold text-lg font-bold">${day.temp.max}&deg;</p>
        <p dir="rtl" class=" text-black text-bold text-md font-md">${day.temp.min}&deg;</p>
      `;
      weatherContainer.appendChild(dayElement);
    });
    const ariana_con = document.querySelector(".ariana_con");
    ariana_con.innerHTML = "";
    const firstDay = data.daily[0];
    // display weather data for main secion in home
    // display photo , change city name
    const ariana_w = `
      <h3 class="font-bold text-2xl md:text-4xl font-md">${
        firstDay.weather[0].description
      }</h3>
      <p dir="rtl" class="font-bold text-2xl md:text-4xl font-md">${
        firstDay.temp.max
      }&deg;C</p>
      <p class="text-xl font-bold">${new Date(
        firstDay.dt * 1000
      ).toLocaleDateString("fr-FR")}</p>
    `;
    ariana_con.innerHTML += ariana_w;
    document.querySelector(
      ".img"
    ).src = `http://openweathermap.org/img/wn/${firstDay.weather[0].icon}@4x.png`;
  } catch (error) {
    console.error("err", error);
    const ariana_con = document.querySelector(".ariana_con");
    const weatherContainer = document.querySelector(".tol");
    let err_msg  = lang =="ar" ? `
    <div class="w-full font-bold text-2xl text-center flex flex-col justify-center items-center ">
      <p >حدث خطأ ولم نتمكن من جلب البيانات</p>
      <p>رجاء اعد تحميل الصفحة</p>
      <p>اذا استمرت المشكلة فتواصل معنا</p>
  </div>`: 
  `
    <div class="w-full font-bold text-2xl text-center flex flex-col justify-center items-center ">
      <p > Une erreur s'est produite et nous n'avons pas pu récupérer les données</p>
      <p>Veuillez recharger la page & Si le problème persiste, contactez-nous</p>
  </div>`
  ;
  weatherContainer.innerHTML= err_msg
  ariana_con.innerHTML = err_msg
    
    ;

  }
}

async function handleCityClick(event) {
  event.preventDefault();
  const lat = event.currentTarget.getAttribute("data-lat");
  const lng = event.currentTarget.getAttribute("data-lng");
  const city = event.currentTarget.getAttribute("data-city");

  await callWeatherAPI(lat, lng);
  city_name.innerText = city;
}

function populateCities(lang) {
  const citiesList = document.getElementById("citiesList");
  citiesList.innerHTML = "";

  const citiesArray = lang === "ar" ? arTun : frTun;

  citiesArray.forEach((city) => {
    const cityElement = document.createElement("a");
    cityElement.href = "#";
    cityElement.id = "city";
    cityElement.className = "bg-gray-50 m-auto flex justify-center items-center font-bold h-[50px] border-2 rounded-lg text-center text-sm md:text-base w-[100px] md:w-[150px] py-1 px-2";
    cityElement.dataset.lat = city.lat;
    cityElement.dataset.lng = city.lng;
    cityElement.dataset.city = city.city;

    const spanElement = document.createElement("span");
    spanElement.className = "w-full text-black";
    spanElement.textContent = city.city;

    cityElement.appendChild(spanElement);
    cityElement.addEventListener("click", handleCityClick);

    citiesList.appendChild(cityElement);
  });
}




// getting a random city from cities list to show weather data
function getRandomCity(lang) {
  if (lang === "ar") {
    const randomIndex = Math.floor(Math.random() * arTun.length);
    callWeatherAPI(arTun[randomIndex].lat, arTun[randomIndex].lng, lang);
    city_name.innerText = arTun[randomIndex].city;
    return arTun[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * frTun.length);
    callWeatherAPI(frTun[randomIndex].lat, frTun[randomIndex].lng, lang);
    city_name.innerText = frTun[randomIndex].city;
    return arTun[randomIndex];
  }
}



// to load translations file
let translations = {};
async function loadTranslations() {
  try {
    const response = await fetch("./locales/translations.json");
    if (!response.ok) {
      throw new Error(`Failed to load translations: ${response.status}`);
    }

    translations = await response.json();
    let lang = localStorage.getItem("lang") || "ar"
    changeLanguage(lang);
    console.log(translations);
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}



// to change page theme
const themeToggleBtn = document.querySelector(".theme_toggler");
themeToggleBtn.addEventListener("click", changeTheme);
let glass_element = document.querySelectorAll(".glass");

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

// main function that invokes ther functions
document.addEventListener("DOMContentLoaded", async function () {
  let lang = localStorage.getItem("lang") || "ar";
  let theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  populateCities(lang);
  if (lang) {
    selectElement.value = lang;
  }

  // await initMap();
  await loadTranslations();
  await getRandomCity(lang);
  await getInitialLocation();

  if (parameters.lat != null) {
    callWeatherAPI(parameters.lat, parameters.lng, lang);
    city_name.innerText = parameters.city;
  }
});


