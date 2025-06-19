
  gsap.registerPlugin(ScrollTrigger);

  // If you're using Lenis (or Locomotive), sync it like this:
  // lenis.on('scroll', ScrollTrigger.update); // Uncomment if Lenis is used

ScrollTrigger.create({
  trigger: ".content-main_recruiter-column",
  start: "top top+=164",
  end: () => {
    const col  = document.querySelector(".content-main_recruiter-column");
    const card = document.querySelector(".sticky-recruiter");

    return `+=${col.offsetHeight - card.offsetHeight - 100}`;
  },
  pin: ".sticky-recruiter",
  pinSpacing: true,
  scrub: false,
  invalidateOnRefresh: true,
  markers: false // true while debugging
});


const swiper = new Swiper('.swiper.job-steps', {
  slidesPerView: 1,
  spaceBetween: 16,
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});

document.querySelector('#share-job').addEventListener('click', function() {
  // Grab the URL of the current page
  let pageUrl = window.location.href;
  // Add the utm-source parameter
  let shareUrl = `${pageUrl}?utm-source=share`;

  // Check if the Web Share API is supported
  if (navigator.share) {
    navigator.share({
      title: 'Sprintto Vacature: {{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }} bij {{wf {&quot;path&quot;:&quot;werkgever&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}',
      text: 'Bekijk deze vacature op Sprintto!',
      url: shareUrl,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  } else {
    // Fallback for browsers that do not support the Web Share API
    // Check if Clipboard API is available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          alert('De link is gekopieerd! Je kan deze nu delen.');
        })
        .catch((error) => console.error('Could not copy text: ', error));
    } else {
      console.log('Clipboard API not supported');
    }
  }
});

$("#play-video").on('click', function() {
	$("#lightbox").click()
})

const testimonials = $("#testimonials")
const testimonialsPosition = $("p:contains('[testimonials]')")
if (testimonialsPosition.length) {
    testimonials.css("margin-top", "5.6rem")
    testimonialsPosition.text('');
    testimonialsPosition.append(testimonials);
    $(".colleague_image").css("height", "100%");
    $(".job-content_background").css("bottom", "0rem");
    $(".job-content_main").css("padding-bottom", "8rem");
}

const distribution = $("#distribution")
const distributionPosition = $("p:contains('werkverdeling]')")
if (distributionPosition.length) {
    distributionPosition.text('');
    distributionPosition.append(distribution);
}

if ($(".distribution_icon.w-richtext svg").length) {
$(".distribution_icon.w-richtext svg").width("3.4rem")
		.height("3.4rem")
}

  document.addEventListener("DOMContentLoaded", function () {
    var swiperEl = document.querySelector(".swiper.job-testimonial");

    if (swiperEl) {
      new Swiper(swiperEl, {
      	slidesPerView: 1,
      	spaceBetween: 16,	
        pagination: {
          el: ".job-testimonial_slider-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".job-testimonial_arrow.is-next",
          prevEl: ".job-testimonial_arrow.is-prev",
        },
      });
    }
  });



if (window.innerWidth <= 767) {
  const stickyRecruiter = document.querySelector(".content-main_recruiter.sticky-recruiter");

  if (stickyRecruiter) {
    gsap.set(stickyRecruiter, {
      opacity: 0,
      scale: 0.95,
      pointerEvents: "none"
    });

    ScrollTrigger.create({
      trigger: ".job_content-rt",
      start: "top 55%",
      end: "bottom center",

      onEnter: () => {
        gsap.to(stickyRecruiter, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => stickyRecruiter.style.pointerEvents = "auto"
        });
      },

      onLeave: () => {
        gsap.to(stickyRecruiter, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.in",
          onStart: () => stickyRecruiter.style.pointerEvents = "none"
        });
      },

      onEnterBack: () => {
        gsap.to(stickyRecruiter, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => stickyRecruiter.style.pointerEvents = "auto"
        });
      },

      onLeaveBack: () => {
        gsap.to(stickyRecruiter, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.in",
          onStart: () => stickyRecruiter.style.pointerEvents = "none"
        });
      }
    });
  }
}
