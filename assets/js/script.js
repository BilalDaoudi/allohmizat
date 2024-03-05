const traductions = {
    Français: {
      accueil: "Accueil",
      services: "Services",
      contact: "Contact",
      categories: "Catégories",
      titre: "AlloHmizat",
      vetements: "Couture des vêtements modernes",
    },
    Arabic: {
      accueil: "الصفحة الرئيسية",
      services: "الخدمات",
      contact: "تواصل معنا",
      categories: "الفئات",
      titre: "ألو هميزات",
      vetements: "خياطة الملابس العصرية",
    },
  };
  
  var articles = [
    [
      [
        ["./assets/img/img1.jpg", "titre1", "description1"],
        ["./assets/img/img2.jpg", "titre2", "description2"],
        ["./assets/img/img3.jpg", "titre3", "description3"],
        ["./assets/img/img4.jpg", "titre4", "description4"],
        ["./assets/img/img6.jpg", "titre6", "description6"],
      ],
      "Vêtements",
      { Français: "Confectionner des vêtements modernes qui répondent à vos envies et répondent à vos goûts raffinés", Arabic: "خياطة ملابس عصرية تلبي رغباتكم وتستجيب لاذواقكم الرفيعة" },
      ["أم تسنيم", "   -   "]
    ],
  ];
  
  var divpublications = document.getElementById("publications");
  var div;
  var articles_affiche = articles;
  
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  function checkcategorie(chek) {
    let langue =
      document.getElementById("langue").value === "Arabic"
        ? "Français"
        : "Arabic";
    if (chek.checked == false)
      articles_affiche = articles_affiche.filter((art) => art[1] != chek.value);
    else
      articles
        .filter((art) => art[1] == chek.value)
        .map((a) => articles_affiche.push(a));
  
    CreerDonnees(articles_affiche, langue);
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  function detail(id) {
    $(document).ready(function () {
      $(`#div${id}`).toggle(1000);
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  function ChangeLangue(btn) {
    setLanguage(btn.value);
    CreerDonnees(articles_affiche, btn.value);
    btn.textContent = btn.value == "Arabic" ? "Français" : "العربية";
    btn.value = btn.value == "Arabic" ? "Français" : "Arabic";
    document.querySelector('title').textContent = btn.value == "Arabic" ? traductions["Français"]["titre"] : traductions["Arabic"]["titre"]; 
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  const setLanguage = (language) => {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const translationKey = element.getAttribute("data-i18n");
      element.textContent = traductions[language][translationKey];
    });
    document.body.dir = language === "Arabic" ? "rtl" : "ltr";
  };
  
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  function CreerDonnees(arts, langue) {
    divpublications.innerHTML = "";
    if (arts.length != 0) {
      arts.map((art, k) => {
        div = `<div class="col-md-6 w-100 mt-2">`;
        div += `<div id="carouselExampleIndicators${k}" class="carousel slide"data-bs-ride="carousel">`;
        div += `<div class="carousel-indicators">`;
        for (j = 0; j < art[0].length; j++) {
          if (j == 0)
            div += `<button type="button"  data-bs-target="#carouselExampleIndicators${k}" data-bs-slide-to="${j}" class='active bg-info' aria-current="true" aria-label="Slide ${j}" ></button>`;
          else
            div += `<button type="button" class="bg-info" data-bs-target="#carouselExampleIndicators${k}" data-bs-slide-to="${j}" aria-current="true" aria-label="Slide ${j}" ></button>`;
        }
        div += `</div>`;
        div += `<div class="carousel-inner">`;
        for (i = 0; i < art[0].length; i++) {
          if (i == 0) div += `<div class="carousel-item active">`;
          else div += `<div class="carousel-item">`;
          div += `<div>`;
          div += `<img onclick='detail(${k})' src="${art[0][i][0]}" class="d-block w-100 img-publications" alt="${i}" />`;
          //  div += `<div class="carousel-caption">`;
          //  div += `<h5>${art[0][i][1]}</h5>`;
          //  div += `<p>${art[0][i][2]}</p>`;
          //  div += `</div>`;
          div += `</div>`;
          div += `</div>`;
        }
        div += `</div>`;
        div += `<button class="carousel-control-prev" type="button"  data-bs-target="#carouselExampleIndicators${k}" data-bs-slide="prev" >`;
        div += `<span class="carousel-control-prev-icon" aria-hidden="true"></span>`;
        div += `<span class="visually-hidden">Previous</span>`;
        div += `</button>`;
        div += `<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${k}" data-bs-slide="next" >`;
        div += `<span class="carousel-control-next-icon" aria-hidden="true" ></span>`;
        div += `<span class="visually-hidden">Next</span>`;
        div += `</button>`;
        div += `</div>`;
        div += `<div class='border p-1'>
                  <div class='d-flex'><p style='width:80%;' class='fw-bold description_publication'>${art[2][langue]}</p>
                    <p class="text-primary" onclick='detail(${k})'><span> `;
        div += langue === "Arabic" ? "أكثر" : `Plus`;
        div += `</span> <i class="bi bi-arrow-down-circle"></i></p> </div>`;
        div += `<div class='' style='display:none' id='div${k}'>
                     <div class="fw-bold d-flex"> <p class="w-25">`;
        div += langue === "Arabic" ? "الاسم" : `Nom`;
        div += `</p><p>: ${art[3][0]}</p></div>`;
        div += `<div class="fw-bold d-flex"><p class="w-25">`;
        div += langue === "Arabic" ? "رقم الهاتف" : `Téléphone`;
        div += `</p><p>: ${art[3][1]}</p>`;
        div += `</div>`;
        div += `</div>`;
        div += `</div>`;
        div += `</div>`;
  
        divpublications.innerHTML += div;
      });
    } else {
      let message = langue === "Arabic" ? "لا توجد بيانات!" : "Aucun données !";
      divpublications.innerHTML = `<div class='alert alert-danger w-100 container fw-bold text-center'>${message}</div>`;
    }
  }
  document.body.addEventListener(
    "load",
    CreerDonnees(articles_affiche, "Arabic")
  );
  