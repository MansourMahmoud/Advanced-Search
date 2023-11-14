let sectionCards = document.querySelector(".section_Cards");
let shahedAlTafasel = document.querySelector(".shahedaltafasel");
let search = document.querySelector(".search");
let btnSearch = document.querySelector(".btnSearch");
let doms;
// data

window.addEventListener("DOMContentLoaded", () => {
  btnSearch.setAttribute("disabled", "");
});

fetch(
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bd551351d613eae72b5219e295facfeb&page1"
)
  .then((e) => e.json())
  .then((data) => {
    if (data.results) {
      data.results.forEach((result) => {
        sectionCards.innerHTML += `
                    <!-- section 1 -->
                    <!-- card 1 -->
                    <div class="card mb-3 col-10 h-100 col-sm-5 col-lg-3 p-0 cardStyle text-white">
                    <div class="containerImageStyle"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                      result.backdrop_path
                    }" class="rounded-top imageStyle col-12" alt="..."></div>
                        <div class="card-body d-flex flex-column gap-1">
                            <h5>العنوان : <span class="text-info">${
                              result.title
                            }</span></h5>
                            <p class="styleText" data-fulltext="${
                              result.overview
                            }">الوصف : <span class="overflowTexts text-info">${truncateText(
          result.overview,
          100
        )}</span> <button class="btn p-0 text-danger btnsShowOrLess">عرض المزيد</button> </p>
                            <p>مقيم للبالغين فقط : <span class="text-info">${
                              result.adult === false ? "لا" : "نعم"
                            }</span></p>
                            <p> الشهرة : <span class="text-info">${
                              result.popularity
                            }</span></p>
                            <p>تاريخ الاصدار : <span class="text-info">${
                              result.release_date
                            }</span></p>
                            <p> التقييم : <span class="text-info">${
                              result.vote_average
                            }</span></p>
                            <p> عدد الأصوات: <span class="text-info">${
                              result.vote_count
                            } صوت</span></p>
                            <p>اللغة : <span class="text-info">${
                              result.original_language
                            }</span></p>
                            <button class="btn btn-light btn_informathion" onclick=(detailsView())>شاهد التفاصيل</button>
                        </div>
                    </div>
                    <!-- end card 1 -->
                    <!--  end section 1 -->
                    `;
      });
    } else {
      sectionCards.innerHTML += `
      <div class="loaderStyleDiv d-flex justify-content-center align-items-center"><span class="loader"></span></div>
      `;
    }
    let btnsShowOrLess = document.querySelectorAll(".btnsShowOrLess");
    let overflowTexts = document.querySelectorAll(".overflowTexts");

    btnsShowOrLess.forEach((btn, btnIndex) => {
      const cardBody = btn?.parentNode;
      const fullText = cardBody?.dataset.fulltext; // قم بتخزين النص الكامل في الـ data attribute

      btn.addEventListener("click", () => {
        overflowTexts.forEach((text, textIndex) => {
          if (btnIndex === textIndex) {
            if (text.textContent.trim().length < 105) {
              text.innerHTML = `
            ${fullText}
            `;
              btn.innerHTML = "عرض اقل";
            } else {
              const truncatedText = truncateText(text.textContent.trim(), 100);
              text.innerHTML = `
            ${truncatedText}
            `;
              btn.innerHTML = "عرض المزيد";
            }
          }
        });
      });
    });
  });

// search
search.addEventListener("keyup", () => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=bd551351d613eae72b5219e295facfeb&query=${search.value.toLowerCase()}`
  )
    .then((data) => data.json())
    .then((data) => {
      if (data.results.length > 0) {
        let valueInputSearch = search.value;
        btnSearch.removeAttribute("disabled", "");
        btnSearch.addEventListener("click", () => {
          sectionCards.innerHTML = `
          <div>
          <h1 class="text-light text-center">you're searching for <span class="text-info">[${valueInputSearch}]</span></h1>
          </div>
          `;
          btnSearch.setAttribute("disabled", "");
          search.value = "";
          data.results.forEach((result) => {
            sectionCards.innerHTML += `
            <!-- section 1 -->
            <!-- card 1 -->
            <div class="card mb-3 col-10 h-100 col-sm-5 col-lg-3 p-0 cardStyle text-white">
            <div class="containerImageStyle"><img src="${
              result.backdrop_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.backdrop_path}`
                : `../imgs/noImageAvailable.jpg`
            }" class="rounded-top imageStyle col-12" alt="..."></div>
                <div class="card-body d-flex flex-column gap-1">
                    <h5>العنوان : <span class="text-info">${
                      result.title
                    }</span></h5>
                    <p class="styleText" data-fulltext="${
                      result.overview
                    }">الوصف : <span class="overflowTexts text-info">${
              result.overview.length > 15
                ? truncateText(result.overview, 15)
                : "There is no Overflow"
            }</span> ${
              result.overview.length > 15
                ? `<button class="btn p-0 text-danger btnsShowOrLess">عرض المزيد</button>`
                : ""
            } </p>
                    <p>مقيم للبالغين فقط : <span class="text-info">${
                      result.adult === false ? "لا" : "نعم"
                    }</span></p>
                    <p> الشهرة : <span class="text-info">${
                      result.popularity
                    }</span></p>
                    <p>تاريخ الاصدار : <span class="text-info">${
                      result.release_date
                    }</span></p>
                    <p> التقييم : <span class="text-info">${
                      result.vote_average
                    }</span></p>
                    <p> عدد الأصوات: <span class="text-info">${
                      result.vote_count
                    } صوت</span></p>
                    <p>اللغة : <span class="text-info">${
                      result.original_language
                    }</span></p>
                    <button class="btn btn-light btn_informathion" onclick=(detailsView())>شاهد التفاصيل</button>
                </div>
            </div>
            <!-- end card 1 -->
            <!--  end section 1 -->
            `;
          });

          sectionCards.innerHTML += `
          <div class="text-center">
          <button onclick="handleBack()" class=" btn px-5 btn-outline-light text-center my-4">Go step Back </span></button>
          </div>
          `;

          let btnsShowOrLess = document.querySelectorAll(".btnsShowOrLess");
          let overflowTexts = document.querySelectorAll(".overflowTexts");

          btnsShowOrLess.forEach((btn, btnIndex) => {
            const cardBody = btn?.parentNode;
            const fullText = cardBody?.dataset.fulltext; // قم بتخزين النص الكامل في الـ data attribute

            btn.addEventListener("click", () => {
              overflowTexts.forEach((text, textIndex) => {
                if (btnIndex === textIndex) {
                  if (text.textContent.trim().length < 20) {
                    console.log("yes");
                    text.innerHTML = `
                  ${fullText}
                  `;
                    btn.innerHTML = "عرض اقل";
                  } else {
                    const truncatedText = truncateText(
                      text.textContent.trim(),
                      15
                    );
                    text.innerHTML = `
                  ${truncatedText}
                  `;
                    btn.innerHTML = "عرض المزيد";
                  }
                }
              });
            });
          });
        });
      } else {
        btnSearch.setAttribute("disabled", "");
      }
    });
});

function handleBack() {
  window.location.href = "index.html";
}
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    const truncatedText = text.substring(0, maxLength);

    return `${truncatedText}...`;
  }
  return text;
}

function detailsView() {
  alert("Not available yet!");
}
