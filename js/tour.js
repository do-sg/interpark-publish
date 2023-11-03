window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // console.log("투어코딩");

  const fileName = "tour.json";

  // 외부 데이터 가져올 때 작성법
  const xhr = new XMLHttpRequest();
  // 외부 파일을 Get 방식으로 열어준다
  xhr.open("GET", fileName);
  // 실제로 실행
  xhr.send();
  // 데이터의 전송 상태 체크
  xhr.onreadystatechange = function (event) {
    // console.log("투어 데이터 전송 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response);

      const res = event.target.response;

      // console.log(_res);

      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    // console.log(_res);
    // 2. html 태그를 백틱(``)을 이용해서 만든다.
    let htmlTourTag = ``;
    // _res에 담겨진 객체에서 total을 보관한다.

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;

      const obj = _res["tour_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="tour-slide-item">
          <a href="${obj.url}" class="tour-link">
            <div class="tour-img">
              <img src="${obj.image}" alt="" />
            </div>
            <div class="tour-info">
              <ul class="tour-good-list">
                <li>
                  <span class="tour-good-info-desc">
                    <em>${obj.desc}</em>
                    <p>${obj.title}</p>
                    <b>${numberWithCommas(obj.price)}원~</b>                
                  </span>
                </li>
              </ul>
            </div>
            <button class="tour-plus">${obj.special}</button>
          </a>
        </div>
      </div>               
      `;

      htmlTourTag += tempTag;
    }
    // console.log(htmlTourTag);

    showHtmlTag(htmlTourTag);
  }
  // html 출력 전용 기능을 만들자.
  function showHtmlTag(_html) {
    // swiper 태그에 백틱을 배치한다.
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;

    // swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 26,

      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-bt",
        prevEl: ".tour-slide-wrap .slide-prev-bt",
      },

      slidesPerGroup: 3,
    });
  }
});
