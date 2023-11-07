window.addEventListener("load", function () {
  // console.log("티켓코딩");

  const fileName = "ticket.json";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);

  xhr.send();

  xhr.onreadystatechange = function (event) {
    // console.log("티켓 데이터 확인");
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    // console.log(_res);
    let htmlTicketTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;

      const obj = _res["ticket_" + index];

      let tempTag = ``;

      if (i === _res.total - 1) {
        tempTag = `
          <div class="swiper-slide">
            바로가기
          </div>
        `;
      } else {
        tempTag = `
      <div class="swiper-slide">
        <div class="ticket-slide-item">
          <a href="${obj.url}" class="ticket-link">
            <div class="ticket-img">
              <img src="${obj.image}" alt="" />
            </div>
            <div>
              <span class="ticket-rank">${obj.rank}</span>
            </div>
            <div class="ticket-info">
              <ul class="ticket-good-list">
                <li>
                  <span class="ticket-info-desc">
                    ${obj.title}
                    <b>${obj.place}</b>
                    <p>${obj.date}</p>
                  </span>
                </li>
                <li>
                  <p class="ticket-seat">${obj.special}</p>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
      `;
      }

      htmlTicketTag += tempTag;
      // console.log(htmlTicketTag);
    }
    showHtmlTag(htmlTicketTag);
  }

  function showHtmlTag(_html) {
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }

  function makeSwiper() {
    const swiperTicket = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
      navigation: {
        nextEl: ".ticket-slide-wrap .slide-next-bt",
        prevEl: ".ticket-slide-wrap .slide-prev-bt",
      },

      slidesPerGroup: 4,
    });
  }
});
