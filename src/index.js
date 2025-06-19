$("document").ready(function () {
  initRecruiterComponent();
  initRecruiterSlider();
});

function initRecruiterComponent() {
  let toggles = document.querySelectorAll("[data-recruiter-toggle]");
  const recruiterComponent = document.querySelector(".content-main_recruiter.sticky-recruiter");
  const colorElement = document.querySelector(".color-code");
  const hexColor = colorElement.textContent.trim();
  console.log(hexColor);

  // Check if mobile
  if (window.innerWidth < 768) {
    setTimeout(() => {
      console.log("Countdown finished");
      document
        .querySelector(".content-main_recruiter.sticky-recruiter")
        .classList.add("visible");
    }, 5000);

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        if (recruiterComponent.hasAttribute("collapsed")) {
          openRecruiterComponent();
        } else {
          closeRecruiterComponent();
        }
      });
    });
  }

  function openRecruiterComponent() {
    if (recruiterComponent && recruiterComponent.hasAttribute("collapsed")) {
      recruiterComponent.removeAttribute("collapsed");
      console.log("Recruiter component opened");
    }
  }

  function closeRecruiterComponent() {
    if (recruiterComponent && !recruiterComponent.hasAttribute("collapsed")) {
      recruiterComponent.setAttribute("collapsed", "");
      console.log("Recruiter component closed");
    }
  }
}

function initRecruiterSlider() {
  console.log("Recruiter slider initialized");
  const swiper = new Swiper('.swiper.job-steps', {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 2
      }
    },
    navigation: {
      nextEl: '[data-swiper-next]',
      prevEl: '[data-swiper-prev]',
    },

  });
}
