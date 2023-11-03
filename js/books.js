window.addEventListener("load", function () {
  // console.log("도서코딩");
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fileName = "books.json";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);

  xhr.send();

  xhr.onreadystatechange = function (event) {
    // console.log("도서 데이터 확인");
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    // console.log(_res);
    let htmlBooksTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;

      const obj = _res["books_" + index];

      const tempTag = `
        <div class="swiper-slide">
                    <div class="books-slide-item">
                      <a href="${obj.url}" class="books-link">
                        <div class="books-img">
                          <img src="${obj.image}" alt="" />
                        </div>
                        <div class="books-info">
                          <ul class="books-good-list">
                            <li>
                              <p class="books-info-desc">
                              ${obj.title}
                              </p>
                            </li>
                            <li>
                              <span class="books-info-price">
                                <b>${numberWithCommas(obj.price)}</b>
                                원
                              </span>
                            </li>
                          </ul>
                        </div>
                      </a>
                    </div>
                  </div>
        `;
      htmlBooksTag += tempTag;
    }
    // console.log(htmlBooksTag);
    showHtmlTag(htmlBooksTag);
  }
  function showHtmlTag(_html) {
    const booksSlide = ".books-slide .swiper-wrapper";
    const tag = document.querySelector(booksSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }

  function makeSwiper() {
    const swiperBooks = new Swiper(".books-slide", {
      slidesPerView: 5,
      spaceBetween: 28,
      navigation: {
        nextEl: ".books-slide-wrap .slide-next-bt",
        prevEl: ".books-slide-wrap .slide-prev-bt",
      },

      slidesPerGroup: 5,
    });
  }
});
