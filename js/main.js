let isFullPageScrollEnabled = true;
let fullPageInstance;
let sectionIndex = 0;

let isModalOpen = false; // 변수를 추가하여 현재 모달이 열려있는지 여부

const openModal = (pcardClass, modalClass) => {
  if (isModalOpen) return; // 이미 모달이 열려있으면 중복 실행을 방지

  modalOpen(modalClass);
  disableFullPageScroll();
  isModalOpen = true; // 모달이 열렸음을 표시
  if (isModalOpen) {
    disableFullPageScroll();
  }
};

const closeModal = (modalClass) => {
  modalClose(modalClass);
  enableFullPageScroll();
  isModalOpen = false; // 모달이 닫혔음을 표시

  if (!isModalOpen) {
    enableFullPageScroll();
  }
};

// 각 PcardWrap 요소에 클릭 이벤트를 추가
document.querySelector(".PcardWrap1").addEventListener("click", () => {
  openModal("PcardWrap1", "detailModalWrap1");
});
document.querySelector(".PcardWrap2").addEventListener("click", () => {
  openModal("PcardWrap2", "detailModalWrap2");
});
document.querySelector(".PcardWrap3").addEventListener("click", () => {
  openModal("PcardWrap3", "detailModalWrap3");
});
document.querySelector(".PcardWrap4").addEventListener("click", () => {
  openModal("PcardWrap4", "detailModalWrap4");
});

// 닫기 버튼 클릭 이벤트를 추가
const modalCloseButtons = document.querySelectorAll(".modalClose");
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalClass = button.getAttribute("data-modal");
    closeModal(modalClass);
  });
});

function modalOpen(modalClass) {
  const detailModalWrap = document.querySelector(`.${modalClass}`);

  setTimeout(() => {
    detailModalWrap.classList.add("on");
    enableModalScroll(modalClass); // Pass modalClass here
  }, 1000);

  disableFullPageScroll();
  enableModalScroll();
}

function modalClose(modalClass) {
  const detailModalWrap = document.querySelector(`.${modalClass}`);

  detailModalWrap.classList.remove("on");
  disableModalScroll(modalClass);

  enableFullPageScroll();
  disableModalScroll();
  setTimeout(() => {
    refreshFullPage();
  }, 100);
}

function disableFullPageScroll() {
  if (isFullPageScrollEnabled && typeof fullPageInstance !== "undefined") {
    fullPageInstance.setAllowScrolling(false);
    isFullPageScrollEnabled = false;
    document.body.style.overflow = "hidden";
  }
}

function enableFullPageScroll() {
  if (!isFullPageScrollEnabled && typeof fullPageInstance !== "undefined") {
    fullPageInstance.setAllowScrolling(true);
    isFullPageScrollEnabled = true;
    document.body.style.overflow = "auto";
  }
}

function enableModalScroll(modalClass) {
  const modalDetail = document.querySelector(`.${modalClass} .modalDetail`);
  modalDetail.addEventListener("wheel", preventScrollPropagation);
}

function disableModalScroll(modalClass) {
  const modalDetail = document.querySelector(`.${modalClass} .modalDetail`);
  modalDetail.removeEventListener("wheel", preventScrollPropagation);
}

function preventScrollPropagation(event) {
  event.stopPropagation();
}

function refreshFullPage() {
  if (typeof fullPageInstance !== "undefined") {
    fullPageInstance.destroy("all");
  }
  fullPageInstance = new fullpage("#fullpage", {
    // options here
    autoScrolling: true,
    scrollHorizontally: true,
    scrollOverflow: true,
    scrollOverflowOptions: {
      scrollbars: false,
      mouseWheel: false,
      preventDefault: false,
    },
    afterLoad: function (origin, destination, direction) {
      const headerImage = document.querySelector(".hd_title");
      const sectionId = destination.item.getAttribute("id");

      switch (sectionId) {
        case "section1":
          headerImage.src = "./img/title.png";
          break;
        case "section2":
          headerImage.src = "./img/portfolio.png";
          break;
        case "section3":
          headerImage.src = "./img/profile.png";
          break;
        case "section4":
          headerImage.src = "./img/contact.png";
          break;
        default:
          headerImage.src = "./img/default.png";
      }
      if (destination.index === 1) {
        const PcardWrap1 = document.querySelector(".PcardWrap1");
        const PcardWrap2 = document.querySelector(".PcardWrap2");
        const PcardWrap3 = document.querySelector(".PcardWrap3");
        const PcardWrap4 = document.querySelector(".PcardWrap4");
        PcardWrap1.classList.add("animate");
        PcardWrap2.classList.add("animate");
        PcardWrap3.classList.add("animate");
        PcardWrap4.classList.add("animate");

        const modalCloseButtons = document.querySelectorAll(".modalClose");
        modalCloseButtons.forEach((button) => {
          button.addEventListener("click", function () {
            PcardWrap1.classList.remove("on");
            PcardWrap1.classList.add("off");
            PcardWrap2.classList.remove("on");
            PcardWrap2.classList.add("off");
            PcardWrap3.classList.remove("on");
            PcardWrap3.classList.add("off");
            PcardWrap4.classList.remove("on");
            PcardWrap4.classList.add("off");
          });
        });

        PcardWrap1.addEventListener("click", function () {
          PcardWrap1.classList.add("on");
          PcardWrap1.classList.remove("off");
        });
        PcardWrap2.addEventListener("click", function () {
          PcardWrap2.classList.add("on");
          PcardWrap2.classList.remove("off");
        });
        PcardWrap3.addEventListener("click", function () {
          PcardWrap3.classList.add("on");
          PcardWrap3.classList.remove("off");
        });
        PcardWrap4.addEventListener("click", function () {
          PcardWrap4.classList.add("on");
          PcardWrap4.classList.remove("off");
        });
      }
      if (destination.index === 2) {
        const sec3Title = document.querySelector(".sec3Title");
        const MStack = document.querySelector(".MStack");
        const SStack = document.querySelector(".SStack");
        const education = document.querySelector(".education");
        sec3Title.classList.add("animate");
        MStack.classList.add("animate");
        SStack.classList.add("animate");
        education.classList.add("animate");
      }
      if (destination.index === 3) {
        const sec4Main = document.querySelector(".sec4Main");
        const sec4Text1 = document.querySelector(".sec4Text1");
        const sec4Text2 = document.querySelector(".sec4Text2");
        const sec4Text3 = document.querySelector(".sec4Text3");
        const sec4Text4 = document.querySelector(".sec4Text4");
        sec4Main.classList.add("animate");
        sec4Text1.classList.add("animate");
        sec4Text2.classList.add("animate");
        sec4Text3.classList.add("animate");
        sec4Text4.classList.add("animate");
      }
    },
    afterRender: function () {
      // gnb
      const gnb = document.querySelector(".gnb");
      const btnGnb = document.querySelector(".btn_gnb");
      const btnGnb1 = document.querySelector(".btn_gnb1");
      const btnGnb2 = document.querySelector(".btn_gnb2");
      const btnGnb3 = document.querySelector(".btn_gnb3");

      btnGnb.addEventListener("click", function () {
        gnb.classList.toggle("on");
        btnGnb1.classList.toggle("on");
        btnGnb2.classList.toggle("on");
        btnGnb3.classList.toggle("on");
      });
      // 네비게이션 스크롤
      document
        .querySelector(".sec1Img2")
        .addEventListener("click", function (event) {
          event.preventDefault();
          fullpage_api.moveTo(2);
        });
      document
        .querySelector(".portfolrioLink")
        .addEventListener("click", function () {
          fullpage_api.moveTo(2);
          gnb.classList.remove("on");
        });
      document
        .querySelector(".profilLink")
        .addEventListener("click", function () {
          fullpage_api.moveTo(3);
          gnb.classList.remove("on");
        });
      document
        .querySelector(".contentLink")
        .addEventListener("click", function (nn) {
          fullpage_api.moveTo(4);
          gnb.classList.remove("on");
        });

      // sec1 애니메이션
      const introImgWrap = document.querySelector(".introImgWrap");
      const sec1MainWrap = document.querySelector(".sec1MainWrap");

      setTimeout(() => {
        introImgWrap.classList.add("on");
      }, 8200);

      setTimeout(() => {
        sec1MainWrap.classList.add("on");
      }, 8300);
      fullPageInstance.silentMoveTo(sectionIndex + 1); // 애니메이션 없이 원하는 섹션으로 이동
    },
  });
}

refreshFullPage();

// 애니메이션
const section1 = document.querySelector("#section1");
const section2 = document.querySelector(".PcardWrap");
window.addEventListener("scroll", () => {
  section2.classList.add("animate-active");
  // section1.classList.remove('animate', 'animate-active');
});
