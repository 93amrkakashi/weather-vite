const footerTextElement = document.getElementById('footerText');
const currentYear = new Date().getFullYear();
footerTextElement.textContent = `meteo-Tunisie.net © ! أفضل معلومات الطقس. ${currentYear}!`;
let selectElement = document.getElementById("languageSelect");
const searchResultsElement = document.getElementById("searchResults");
const mainContainer = document.querySelector("body");
let the_main = document.querySelector(".the_main")
let content_here = document.querySelector(".content_here")

let index = 0;
let slides = document.querySelectorAll(".slides");
let dot = document.querySelectorAll(".dot");

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
  populateCities(selectedValue);
  change_content(selectedValue)
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
  populateCities(lang)
  change_content(lang)
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



function populateCities(lang) {
  console.log(lang)
  const citiesList = document.querySelector(".cities_list");
  citiesList.innerHTML = "";
  if (lang === "ar") {
    arTun.forEach((city) => {
      const cityTemplate = `
      <a href="./index.html?lat=${city.lat}&lng=${city.lng}&city=${city.city}" 
      class="bg-gray-50 m-auto flex justify-center items-center font-bold h-[50px] border-2 rounded-lg text-center text-sm md:text-base w-[100px] md:w-[150px] py-1 px-2 "
                data-lat="${city.lat}" 
                data-lng="${city.lng}"
                data-city="${city.city}"
            >
                <span class="w-full text-black ">
                    ${city.city}
                </span>
            </a>
        `;

      citiesList.innerHTML += cityTemplate;
    });
  }else{
    frTun.forEach((city) => {
      const cityTemplate = `
            <a href="./index.html?lat=${city.lat}&lng=${city.lng}&city=${city.city}" 
                class="bg-gray-50 m-auto flex justify-center items-center font-bold border-2 rounded-lg text-center text-sm md:text-base w-[100px] md:w-[150px] py-1 px-2 "
                data-lat="${city.lat}" 
                data-lng="${city.lng}"
                data-city="${city.city}"
                
            >
                <span class="w-full text-black ">
                ${city.city}
                </span>
            </a>
        `;
  
      citiesList.innerHTML += cityTemplate;
    });
  }

}

function handleCityClickOtherwhere(event) {
  event.preventDefault();
  const lat = event.currentTarget.getAttribute("data-lat");
  const lng = event.currentTarget.getAttribute("data-lng");
  const city = event.currentTarget.getAttribute("data-city");
  console.log(first)
  window.location.href = `${location.protocol}//${location.host}${location.pathname}/index.html?lat=${lat}&lng=${lng}&city=${city}`;
  city_name.innerText = city;
}

function change_content(lang) {
  if (lang === "ar") {
    content_here.innerHTML= arPolitique
    the_main.classList.add("md:flex-row")
    the_main.classList.remove("md:flex-row-reverse")
  } else {
    content_here.innerHTML= frPolitique
    the_main.classList.remove("md:flex-row")
    the_main.classList.add("md:flex-row-reverse")
  }
  
}


let arPolitique = `
<section dir="rtl" class="w-full pol_sec">
                  <a id="main-content"></a>
                    <h1 class="page-header"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">سياسة الخصوصية</font></font></h1>
                                                          <div class="region region-content">
    <section id="block-system-main" class="block block-system clearfix">

      
  <article id="node-29540" class="node node-page clearfix">
    <div class="field field-name-body field-type-text-with-summary field-label-hidden"><div class="field-items"><div class="field-item even"><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">لدى Meteo-Tunisie.net سياسة خصوصية تضمن حماية بياناتك الشخصية. </font><font style="vertical-align: inherit;">تتيح لك سياسات الخصوصية معرفة البيانات التي نجمعها وكيف نستخدمها وكيف نحميها.</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">تنطبق سياسة الخصوصية هذه على موقع الويب وتطبيقات الهاتف المحمول المرتبطة بـ Meteo-Tunisie.net.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">استخدام ملفات تعريف الارتباط</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يستخدم الموقع ملفات تعريف الارتباط لتحسين الخدمة المقدمة لمستخدميه وتقديم تجربة تصفح مخصصة. </font><font style="vertical-align: inherit;">أمثلة على الاستخدام:</font></font></p>
<ul><li>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">إعدادات الويب</font></font></p>
</li>
<li>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">تحسين المحتوى</font></font></p>
</li>
<li>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">محتوى يتكيف مع الملاحة الخاصة بك</font></font></p>
</li>
</ul><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ملفات تعريف الارتباط هي ملفات محفوظة على جهاز الكمبيوتر الخاص بالمستخدم ( </font></font><a href="https://en.wikipedia.org/wiki/HTTP_cookie"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">مزيد من المعلومات على ويكيبيديا</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> ).</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">المعلومات المحفوظة في ملفات تعريف الارتباط لا تهدف إلى تحديد هوية المستخدم شخصيًا ويتم استخدامها بشكل صارم من قبل Meteo-Tunisie.net.</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">تسمح لك متصفحات الويب مثل Google Chrome أو Mozilla Firefox بتهيئة استخدام ملفات تعريف الارتباط على جهاز الكمبيوتر الخاص بك. </font><font style="vertical-align: inherit;">لديك خيار تعطيل ملفات تعريف الارتباط وطلب إذنك في كل مرة يرسل موقعنا ملف تعريف ارتباط. </font><font style="vertical-align: inherit;">يمكن الوصول إلى هذه التفضيلات في قسم الإعدادات في متصفح الويب الخاص بك.</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يستخدم موقع Meteo-Tunisie.net ملف تعريف ارتباط يدوم لمدة 12 شهرًا لحفظ قائمة الصفحات المفضلة لديك وقائمة الصفحات الأكثر زيارة على الموقع.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">استخدام ملفات تعريف الارتباط الخاصة بالطرف الثالث</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يرجى ملاحظة أن Meteo-Tunisie.net يستخدم خدمات طرف ثالث لمعرفة استخدامك لهذا الموقع بشكل إجمالي، وذلك لتحسين تجربة المستخدم الخاصة بك. </font><font style="vertical-align: inherit;">قد تستخدم هذه الأطراف الثالثة أيضًا (مثل&nbsp; </font></font><a href="https://www.facebook.com/policies/cookies/"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Facebook</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> و&nbsp; </font></font><a href="https://policies.google.com/technologies/ads?hl=en"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Google AdSense</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> و&nbsp; </font></font><a href="https://www.google.com/policies/privacy/partners/"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Google Analytics</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> و&nbsp; </font></font><a href="https://www.google.com/policies/technologies/cookies/"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Google+</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> و&nbsp; </font></font><a href="https://www.google.com/about/company/user-consent-policy.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">reCAPTCHA</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> &nbsp;و&nbsp; </font></font><a href="https://help.twitter.com/rules-and-policies/twitter-cookies"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Twitter</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> ) ملفات تعريف الارتباط (يمكن أن تكون ملفات تعريف الارتباط دائمة (بحد أقصى 24 شهرًا)، أو مخزنة لفترة محددة جيدًا، أو مؤقتة (ملفات تعريف الارتباط للجلسة )) أننا لا السيطرة عليها.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">اللائحة العامة لحماية البيانات (GDPR)</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">تطبق سياسة Meteo-Tunisie.net متطلبات توجيه الخصوصية الإلكترونية للاتحاد الأوروبي واللائحة العامة لحماية البيانات (GDPR) من خلال عرض إعلانات غير مخصصة ( </font></font><a href="https://support.google.com/adsense/answer/7670013?hl=en-GB"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">مزيد من التفاصيل</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> ) لمستخدمي المنطقة الاقتصادية للاتحاد الأوروبي (EEA).</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يعتمد استهداف الإعلانات غير المخصصة على المعلومات السياقية بدلاً من السلوك السابق للمستخدم. </font><font style="vertical-align: inherit;">لا تستخدم هذه الإعلانات ملفات تعريف الارتباط للتخصيص. </font><font style="vertical-align: inherit;">ومع ذلك، فهم يستخدمونها للحد من عدد مرات التعرض، وإنشاء تقارير مجمعة عن الإعلانات، ومكافحة الاحتيال وإساءة الاستخدام.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">استخدام معالجات البيانات</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يجوز لموقع Meteo-Tunisie.net الاستعانة بالموردين والمقاولين من الباطن المعنيين بمعالجة البيانات والذين يلتزمون باللائحة العامة لحماية البيانات والذين قاموا بإعداد اتفاقية معالجة البيانات مع مقاوليهم من الباطن.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">كيفية إلغاء الموافقة؟</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">من الممكن إلغاء الموافقة على استخدام ملفات تعريف الارتباط باستخدام إحدى الطرق الموضحة أدناه في أي وقت.</font></font></p>
<h4><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ضبط تفضيلاتك على متصفحك</font></font></h4>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">إذا كنت ترغب في حذف ملفات تعريف الارتباط المخزنة على جهازك وتهيئة متصفحك لرفض ملفات تعريف الارتباط، فيمكنك القيام بذلك عبر تفضيلات متصفح الإنترنت الخاص بك. </font><font style="vertical-align: inherit;">عادةً ما توجد خيارات التنقل المتعلقة بملفات تعريف الارتباط هذه في قوائم "الخيارات" أو "الأدوات" أو "التفضيلات" في المتصفح الذي تستخدمه للوصول إلى هذا الموقع. </font><font style="vertical-align: inherit;">ومع ذلك، اعتمادًا على المتصفحات المختلفة المتاحة، يمكن استخدام وسائل مختلفة لتعطيل ملفات تعريف الارتباط. </font><font style="vertical-align: inherit;">لمعرفة المزيد يمكنك اتباع الروابط المشار إليها أدناه:</font></font></p>
<ul><li>
<p><a href="https://support.google.com/accounts/answer/61416?hl=fr"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">جوجل كروم</font></font></a></p>
</li>
<li>
<p><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ثعلب النار</font></font></a></p>
</li>
</ul><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يرجى ملاحظة أنه إذا رفضت، من متصفح الإنترنت الخاص بك، حفظ ملفات تعريف الارتباط على جهازك، فسيظل بإمكانك تصفح هذا الموقع، ولكن قد لا تعمل بعض الأجزاء والخيارات بشكل صحيح.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">الروابط الخارجية (الارتباطات التشعبية)</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">قد يحتوي الموقع على روابط خارجية لمواقع أخرى على شبكة الإنترنت. </font><font style="vertical-align: inherit;">لا تخضع مواقع الطرف الثالث لسيطرة Meteo-Tunisie.net ولا تدخل في نطاق سياسة الخصوصية هذه. </font><font style="vertical-align: inherit;">ولذلك، فإننا لسنا مسؤولين عن استخدام بياناتك أو المحتوى الذي تقدمه هذه المواقع.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">اتصال</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">بالنسبة لجميع طلبات الحصول على المعلومات، توفر لكم Meteo-Tunisie.net عنوان بريد إلكتروني "contact @ Meteo-Tunisie.net" ونموذج اتصال يمكن الوصول إليه عبر&nbsp; </font></font><a href="contact"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">هذا الرابط.</font></font></a></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">تاريخ آخر تحديث: 25 مايو 2018.</font></font></p>
</div></div></div>    </article>

</section>
  </div>
    </section>
`

let frPolitique = `
<section dir="ltr" class="w-full pol_sec">
<h1 class="page-header">Politique de confidentialité</h1>
<div class="region region-content">
  <section id="block-system-main" class="block block-system clearfix">
    <article id="node-29540" class="node node-page clearfix">
      <div class="field field-name-body field-type-text-with-summary field-label-hidden">
        <div class="field-items">
          <div class="field-item even">
            <p>Meteo-Tunisie.net dispose d’une politique de confidentialité qui garantit la protection de vos
              données personnelles. Les règles de confidentialité vous permettent de savoir quelles sont les
              données que nous collectons, comment nous les utilisons et comment nous les protégeons.</p>
            <p>Cette politique de confidentialité s’applique au site web ainsi qu’aux applications mobiles
              associés à Meteo-Tunisie.net.</p>
            <h3>Utilisation des cookies</h3>
            <p>Le site utilise les cookies pour améliorer le service offert à ses utilisateurs et offrir une
              expérience de navigation personnalisée. &nbsp;Exemples d’utilisation :</p>
            <ul>
              <li>
                <p>Paramètres Web</p>
              </li>
              <li>
                <p>Optimisation du contenu</p>
              </li>
              <li>
                <p>Contenu adapté à votre navigation</p>
              </li>
            </ul>
            <p>Les cookies sont des fichiers enregistrés sur l’ordinateur de l’utilisateur (<a
                href="https://en.wikipedia.org/wiki/HTTP_cookie">plus d’information sur Wikipédia</a>).</p>
            <p>Les informations sauvegardées dans les cookies n’ont pas pour objectif d’identifier
              l’utilisateur personnellement et sont strictement utilisées par Meteo-Tunisie.net.</p>
            <p>Les navigateurs web comme Google Chrome ou Mozilla Firefox permettent de paramétrer
              l’utilisation des cookies sur votre ordinateur. Vous avez le choix de désactiver les cookies et
              de demander votre autorisation à chaque fois que notre site envoie un cookie. Ces préférences
              sont accessibles dans la rubrique des paramètres de votre navigateur web.</p>
            <p>Meteo-Tunisie.net utilise un cookie d’une durée de 12 mois pour sauvegarder la liste de vos
              pages préférées et la liste de vos pages les plus visitées sur le site.</p>
            <h3>Utilisation des cookies tiers</h3>
            <p>Veuillez noter que Meteo-Tunisie.net utilise les services de tiers pour connaître votre
              utilisation de ce site sous forme agrégée, ceci afin d’optimiser votre expérience utilisateur.
              Ces tierces parties (tels que&nbsp;<a
                href="https://www.facebook.com/policies/cookies/">Facebook</a>,&nbsp;<a
                href="https://policies.google.com/technologies/ads?hl=en">Google AdSense</a>,&nbsp;<a
                href="https://www.google.com/policies/privacy/partners/">Google Analytics</a>,&nbsp;<a
                href="https://www.google.com/policies/technologies/cookies/">Google+</a>,&nbsp;<a
                href="https://www.google.com/about/company/user-consent-policy.html">reCAPTCHA</a>&nbsp;et&nbsp;<a
                href="https://help.twitter.com/rules-and-policies/twitter-cookies">Twitter</a>, ) peuvent
              également utiliser des cookies (les cookies peuvent être permanents (max 24 mois), stockés
              pendant une durée bien définie, ou temporaires (cookies de session)) que nous ne maîtrisons pas.
            </p>
            <h3>General Data Protection Regulation (GDPR)</h3>
            <p>La politique de Meteo-Tunisie.net applique les exigences de la Directive ePrivacy de l’Union
              Européenne et de la General Data Protection Regulation (GDPR) en affichant des publicités
              non-personnalisées (<a href="https://support.google.com/adsense/answer/7670013?hl=en-GB">plus de
                détail</a>) pour les utilisateurs de l’Espace économique européen (EEA).</p>
            <p>Le ciblage des annonces non personnalisées dépend d'informations contextuelles plutôt que du
              comportement antérieur d'un utilisateur. Ces annonces n'utilisent pas de cookies pour la
              personnalisation. Toutefois, elles y font appel pour limiter le nombre d'expositions, créer des
              rapports agrégés sur les annonces, et lutter contre la fraude et les abus.</p>
            <h3>Utilisation de processeurs de données</h3>
            <p>Meteo-Tunisie.net peut utiliser des fournisseurs et des sous-traitants de traitement de données
              qui respectent le RGPD et qui mettent en place un accord de traitement des données avec leurs
              sous-traitants.</p>
            <h3>Comment révoquer le consentement?</h3>
            <p>Il est possible de révoquer le consentement à l’utilisation des cookies en appliquant l’une des
              méthodes ci-dessous à tout moment.</p>
            <h4>Paramétrage de vos préférences sur votre navigateur</h4>
            <p>Si vous souhaitez supprimer les cookies enregistrés sur votre terminal et paramétrer votre
              navigateur pour refuser les cookies, vous pouvez le faire via les préférences de votre
              navigateur internet. Ces options de navigation relatives aux cookies se trouvent habituellement
              dans les menus « Options », « Outils » ou « Préférences » du navigateur que vous utilisez pour
              accéder à ce site. Cependant, selon les différents navigateurs existants, des moyens différents
              peuvent être utilisés pour désactiver les cookies. Pour en savoir plus vous pouvez suivre les
              liens référencés ci-dessous :</p>
            <ul>
              <li>
                <p><a href="https://support.google.com/accounts/answer/61416?hl=fr">Google Chrome</a></p>
              </li>
              <li>
                <p><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies">Firefox</a></p>
              </li>
            </ul>
            <p>Veuillez noter que si vous refusez, depuis votre navigateur internet, l’enregistrement de
              cookies sur votre terminal, vous serez toujours en mesure de naviguer sur ce site, mais
              certaines parties et options pourraient ne pas fonctionner correctement.</p>
            <h3>Liens externes (hyperliens)</h3>
            <p>Le site peut contenir des liens externes vers d'autres site web sur internet. Les sites web
              tiers ne sont pas sous le contrôle de Meteo-Tunisie.net et ne sont pas dans le champs
              d’application la présente politique de confidentialité. Par conséquent, nous ne sommes pas
              responsable ni de l’utilisation de vos données ni du contenu proposé par ces sites.</p>
            <h3>Contact</h3>
            <p>Pour toutes demandes de renseignement, Meteo-Tunisie.net met à votre dispositions une adresse
              email "contact @ Meteo-Tunisie.net" et un formulaire de contact accessible sur&nbsp;<a
                href="contact">ce lien.</a></p>
            <p>Dernière date de mise à jour : 25 mai 2018.</p>
          </div>
        </div>
      </div>
    </article>

  </section>
</div>
</section>
`