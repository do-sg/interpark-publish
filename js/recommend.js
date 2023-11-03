//모든 js는 html 태그를 로드 완료하고 실행해야 안전하다.
//그런데 현재 js 파일을 head 태그에서 불러들이므로 안전하다.
// 오류가 날 확률이 무척 높다.
// 아래의 window는 웹브라우저다.
// onload는 무조건 소문자로 작성, 약속되어 있는 것
// 아래 문장 해석
// 웹 브라우저에 html, css, js, image..
// 로드 완료 하면 function을 한다고 약속하였다.
// window.onload = function (){} 이 방법X

// 웹 브라우저용 코딩은 하는 위치가 정히져 있다.
// window.load = funtion () {코딩자리}
// window.addEventListener("load", function(){코딩}) 제일 좋은 방법
// $(document).ready(function(){코딩자리})

window.addEventListener("load", function () {
  // 숫자에 콤마 출력하는 함수
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // console.log("추천상품코딩");
  // 추천 상품  슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드
  // 1. 외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "recommend.json";

  // 외부 데이터 가져올 때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 Get 방식으로 열어준다.
  xhr.open("GET", fileName);
  // 실제로 실행하자
  xhr.send();
  // 데이터의 전송 상태를 체크
  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인",event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response);
      // 코드가 가독성이 떨어지므로 변수에 담는다.
      // 규칙은 const부터 작성하자.
      // const가 문제가 된다면 let으로 변경한다.
      const res = event.target.response;
      // res를 전달해서 html 태그를 만든다. 태그 이름은 다 알 수 있도록 정하기
      // 데이터를 전달할 때 정리해서 전달해야 한다.
      // 기능 작성
      // console.log(_res);
      // 전달받은 문자열을 js에서 사용하도록 JSON 데이터로 해석하여 객체화{원시데이터 묶음} 한다.
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    // console.log(_res);
    // 2. html 태그를 백틱(``)을 이용해서 만든다.
    let htmlRecommendTag = ``;
    // _res에 담겨진 객체에서 total을 보관한다.

    // 몇번 반복(total)해야 하는지 알면 for / 모르면 while
    // for (초기값; 조건; 증감) {반복하고 싶은 일}
    for (let i = 0; i < _res.total; i++) {
      // 가독성이 떨어집니다.
      const index = i + 1;
      // _res.good_1;
      // _res["good_2"];
      // _res["good_" + 3];
      const obj = _res["good_" + index];
      // console.log(obj);
      let tempTag = ``;

      // 마지막 json에서는 url만 읽어들인다.
      // 그렇지 않으면 일반적으로 모두 출력한다.
      if (i === _res.total - 1) {
        // i가 같을 때 바로가기 버튼 출력
        tempTag = `
          <div class="swiper-slide">
            바로가기
          </div>
        `;
      } else {
        // i가 같지 않을 때 일반적인 코드 출력
        tempTag = `
        <div class="swiper-slide">
          <div class="recommend-slide-item">
            <a href="${obj.url}" class="recommend-link">
              <div class="recommend-img">
                <img src="${obj.image}" alt="${obj.desc}" />
              </div>
              <div class="recommend-info">
                <ul class="recommend-good-list">
                  <li>
                    <span class="recommend-good-info-price">
                      <b>${obj.discount === 0 ? "" : obj.discount + "%"}</b>
                      <em>${numberWithCommas(obj.price)}</em>
                      원
                    </span>
                  </li>
                  <li>
                    <p class="recommend-good-info-desc">
                    ${obj.desc}
                    </p>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
        `;
      }

      // console.log(tempTag);
      // htmlRecommendTag = htmlRecommendTag + tempTag;
      htmlRecommendTag += tempTag;
    }
    // console.log(htmlRecommendTag);

    showHtmlTag(htmlRecommendTag);
  }
  // html 출력 전용 기능을 만들자.
  function showHtmlTag(_html) {
    // swiper 태그에 백틱을 배치한다.
    const recommendSlide = ".recommend-slide .swiper-wrapper";
    const tag = document.querySelector(recommendSlide);
    tag.innerHTML = _html;

    // swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    // swiper 작동시킨다.
    const swiperRecommend = new Swiper(".recommend-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".recommend-slide-wrap .slide-next-bt",
        prevEl: ".recommend-slide-wrap .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 4,
    });
  }
});
