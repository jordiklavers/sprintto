// LENIS SMOOTH SCROLL

let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
    syncTouch: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
}

gsap.registerPlugin(ScrollTrigger, Draggable);

const body = document.body;
const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
const initialShadow = () => (isMobile() ? "1rem" : "2rem");

if (body.classList.contains("vacancy-color")) {
  console.log("✅ .vacancy-color found on <body>");

  const colorElement = document.querySelector(".color-code");

  if (colorElement) {
    const hexColor = colorElement.textContent.trim();
    console.log("🎨 Found color from .color-code:", hexColor);

    // Set the CSS variable globally
    document.documentElement.style.setProperty("--box-shadow-color", hexColor);

    // Apply it directly as text color as well (optional for visual override)
    const scrollBorder = document.querySelector(".scroll-border");
    if (scrollBorder) {
      scrollBorder.style.color = hexColor;
      scrollBorder.style.boxShadow = `inset 0 0 0 ${initialShadow} ${hexColor}`;
    }
  } else {
    console.warn("⚠️ .vacancy-color found but no .color-code element present.");
  }
} else {
  console.log("ℹ️ .vacancy-color not present on this page.");
}

// Get current values of elements
const getCurrentValues = () => {
  const pageWrapper = document.querySelector(".page-wrapper");
  const scrollBorderCutout = document.querySelector(".scroll-border_cutout");
  const scrollBorder = document.querySelector(".scroll-border");
  const navComponent = document.querySelector(".nav_component");

  return {
    pageWrapper: {
      marginTop: window.getComputedStyle(pageWrapper).marginTop,
      marginRight: window.getComputedStyle(pageWrapper).marginRight,
      marginLeft: window.getComputedStyle(pageWrapper).marginLeft,
    },
    scrollBorderCutout: {
      scale: window.getComputedStyle(scrollBorderCutout).transform,
    },
    scrollBorder: {
      boxShadow: window.getComputedStyle(scrollBorder).boxShadow,
      color: window.getComputedStyle(scrollBorder).color,
    },
    navComponent: {
      paddingTop: window.getComputedStyle(navComponent).paddingTop,
      paddingLeft: window.getComputedStyle(navComponent).paddingLeft,
      paddingRight: window.getComputedStyle(navComponent).paddingRight,
    },
  };
};

// Define the animation properties for header timeline
const headerAnimationProperties = {
  pageWrapper: {
    marginTop: "0",
    marginRight: "0",
    marginLeft: "0",
    ease: "power2.out",
  },
  scrollBorderCutout: {
    scale: 0,
    ease: "power2.out",
  },
  scrollBorder: {
    boxShadow: "inset 0 0 0 0rem var(--box-shadow-color)",
    ease: "power2.out",
  },
  navComponent: {
    paddingTop: "1.5rem",
    paddingLeft: "0",
    paddingRight: "0",
    ease: "power2.out",
  },
};

// Create header timeline
const headerTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-wrapper",
    start: "top top",
    end: "+=300",
    scrub: 1,
    onUpdate: (self) => {
      // Reset scroll-border properties when header timeline is at start
      if (self.progress === 0) {
        gsap.set(".scroll-border", {
          bottom: 0,
          height: "100dvh",
        });
      }
    },
  },
});

// Add animations to header timeline
headerTimeline
  .to(".page-wrapper", headerAnimationProperties.pageWrapper)
  .to(
    ".scroll-border_cutout",
    headerAnimationProperties.scrollBorderCutout,
    "<",
  )
  .to(".scroll-border", headerAnimationProperties.scrollBorder, "<")
  .to(".nav_component", headerAnimationProperties.navComponent, "<");

// Create footer timeline with current values
const createFooterTimeline = () => {
  const currentValues = getCurrentValues();

  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_footer",
      start: "top bottom", // When top of footer enters bottom of viewport
      end: "top top", // When top of footer reaches top of viewport
      scrub: 1,
      onUpdate: (self) => {
        // Set extended values when footer timeline is active
        if (self.progress > 0) {
          gsap.set(".scroll-border", {
            bottom: "-2rem",
            height: "calc(100dvh + 2rem)",
          });
        } else {
          // Reset only when completely out of the footer section
          gsap.set(".scroll-border", {
            bottom: 0,
            height: "100dvh",
          });
        }
      },
    },
  });

  footerTimeline
    .to(".page-wrapper", {
      marginTop: currentValues.pageWrapper.marginTop,
      marginRight: currentValues.pageWrapper.marginRight,
      marginLeft: currentValues.pageWrapper.marginLeft,
      ease: "power2.out",
    })
    .to(
      ".scroll-border_cutout",
      {
        scale: 1,
        ease: "power2.out",
      },
      "<",
    )
    .to(
      ".scroll-border",
      {
        boxShadow: `inset 0 0 0 ${initialShadow()} var(--box-shadow-color)`,
        ease: "power2.out",
      },
      "<",
    )
    .to(
      ".nav_component",
      {
        paddingTop: currentValues.navComponent.paddingTop,
        paddingLeft: currentValues.navComponent.paddingLeft,
        paddingRight: currentValues.navComponent.paddingRight,
        ease: "power2.out",
      },
      "<",
    );

  return footerTimeline;
};

// Create and store the footer timeline
if (document.querySelector(".section_footer")) {
  const footerTimeline = createFooterTimeline();
}

  document.addEventListener("DOMContentLoaded", function () {
    let menuOpen = false;
    const menuButton = document.querySelector(".nav_menu-button");
    const menuPanel = document.querySelector(".nav_menu-panel");
    const menuText = document.querySelectorAll(".nav_menu-button-text");
    const menuItems = document.querySelectorAll(".nav_menu-links a, .nav_menu-socials div");

    // Ensure the menu starts hidden
    gsap.set(menuPanel, { y: 50, opacity: 0, display: "none" });
    gsap.set(menuItems, { y: 20, opacity: 0 });

    menuButton.addEventListener("click", () => {
      menuOpen = !menuOpen;

      if (menuOpen) {
        // Set display to flex before animating
        menuPanel.style.display = "flex";

        gsap.to(menuPanel, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            // Ensure it's fully visible after animation
            menuPanel.style.display = "flex";
          }
        });

        gsap.to(menuItems, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        });
      } else {
        gsap.to(menuPanel, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            // Hide after animation completes
            menuPanel.style.display = "none";
          }
        });

        gsap.to(menuItems, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "power2.in"
        });
      }

      // Animate text up/down
      gsap.to(menuText, {
        y: menuOpen ? -26 : 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    });
  });

//scrollbar --------------------------------------------------------------------

// Cache element references
const scrollWrap = document.querySelector('.scroll_wrap');
const scrollbar = document.querySelector('[scrollbar]');
let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
let isDragging = false;

console.log(scrollbar);

function initScrollBar() {

  if (!scrollWrap) return;

  // Function to update the page scroll
  const updatePageScroll = (yPosition) => {
    const scrollWrapHeight = scrollWrap.clientHeight;
    const scrollPercent = yPosition / (scrollWrapHeight - scrollbar.offsetHeight);
    const newScroll = scrollPercent * maxScroll;
    window.scrollTo({ top: newScroll, behavior: 'auto' });
  };

  // ScrollTrigger setup
  ScrollTrigger.create({
    start: 0,
    end: maxScroll,
    onUpdate: self => {
      const scrollbarY = self.progress * (scrollWrap.clientHeight - scrollbar.offsetHeight);
      gsap.set(scrollbar, { y: scrollbarY });
      checkIfScrollbarVisible()
    }
  });

  // Draggable setup
  Draggable.create(scrollbar, {
    type: "y",
    bounds: scrollWrap,
    onPress: () => {
      isDragging = true; // Set dragging flag
      gsap.to(scrollWrap, { x: "0rem", duration: 0.1 }); // Move scrollbar to the left
    },
    onRelease: () => {
      isDragging = false; // Reset dragging flag
      checkMousePosition(); // Check position when dragging ends
    },
    onDrag: function () {
      updatePageScroll(this.y);
    },
    onDragEnd: function () {
      isDragging = false; // Reset dragging flag
      ScrollTrigger.refresh();
      checkMousePosition(); // Check position when dragging ends
    }
  });

  document.addEventListener('mousemove', throttle(checkMousePosition, 50));
  checkIfScrollbarVisible();
}

function checkMousePosition(event) {
  checkIfScrollbarVisible();
  if (isDragging) return; // Do nothing if dragging is in progress

  const mouseX = event ? event.clientX : lastMouseX;
  const scrollbarRect = scrollbar.getBoundingClientRect();
  const distanceToScrollbar = Math.abs(mouseX - scrollbarRect.right);

  if (distanceToScrollbar <= 50) {
    gsap.to(scrollWrap, { x: "0rem", duration: 0.1 });
  } else {
    gsap.to(scrollWrap, { x: "0.625rem", duration: 0.1 });
  }
}

function checkIfScrollbarVisible() {
  if (!($(window).outerHeight() < $("body").outerHeight() - 1)) {
    gsap.to(".scroll_wrap", { opacity: 0, "pointer-events": "none", duration: 0.1 })
  } else {
    gsap.to(".scroll_wrap", { opacity: 1, "pointer-events": "auto", duration: 0.1 })
  }
}

let lastMouseX; // Store the last mouse X position
function throttle(fn, wait) {
  let lastCall = 0;
  return function (...args) {
    lastMouseX = args[0].clientX; // Update last mouse X position
    const now = new Date().getTime();
    if (now - lastCall < wait) return;
    lastCall = now;
    return fn.apply(this, args);
  };
}


initScrollBar();

// Select the element you want to add the class to by its class name
const scrollElement = document.querySelector('.nav_brand');

// Define the scroll threshold in pixels
const scrollThreshold = 300; // Change this value to the number of pixels you want

// Add an event listener for scroll
window.addEventListener('scroll', () => {
  // Check if the page has been scrolled past the threshold
  if (window.scrollY > scrollThreshold) {
    // Add the .is-scrolled class if the scroll position exceeds the threshold
    scrollElement.classList.add('is-scrolled');
  } else {
    // Remove the .is-scrolled class if the scroll position is less than the threshold
    scrollElement.classList.remove('is-scrolled');
  }
});

// Count the number of elements with the class `.vacancy-count`
const vacancyCount = document.querySelectorAll('.vacancy-count').length;

// Select the element with the class `.nav_vac-count`
const navVacCount = document.querySelector('.nav_vac-count');

// Update the text content with the total count
if (navVacCount) {
  navVacCount.textContent = vacancyCount;
}