let cursorDiv = document.querySelector(".cursor-div");
let cursorText = document.querySelector(".cursor-div span");
let links = document.querySelectorAll(".nav-link");
let btn = document.querySelector(".btn");
window.addEventListener("mousemove", showCursor);

function showCursor(e) {
  cursorDiv.style.top = e.pageY + "px";
  cursorDiv.style.left = e.pageX + "px";
  if (e.target.classList.contains("nav-link")) {
    let temp = e.target;
    temp.style.color = "white";
    cursorDiv.classList.add("cursor-link");
  } else {
    cursorDiv.classList.remove("cursor-link");
    links.forEach((link) => {
      link.style.color = "black";
    });
  }
  if (e.target.classList.contains("logo")) {
    cursorDiv.classList.add("cursor-logo");
  } else {
    cursorDiv.classList.remove("cursor-logo");
  }
  if (e.target.classList.contains("exp-logo")) {
    cursorDiv.classList.add("white");
  } else {
    cursorDiv.classList.remove("white");
  }
}

function showAnimation() {
  let newtl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power2.inOut",
    },
  });
  newtl.fromTo(".nav-bar", { y: "-100%" }, { y: "0%" }, "-=.5");
  newtl.to(".reveal-text", 1, { x: "100%" });
  //   newtl.formTo(".text-div", 1, { height: "0%" }, { height: "100%" });
  newtl.to("title", 1, { scale: "2" }, "-=.7");
  newtl.to(".img-reveal", 1, { x: "100%" }, "-=.75");
  // newtl.fromTo(".fashion-img", 1, { width: "0%" }, { width: "100%" }, "-=.55");
  newtl.to(".fashion-img", 1, { scale: "1.5" }, "-=.75");
  newtl.fromTo(btn, 0.5, { y: "180%" }, { y: "0%" }, "-=.5");
}

function secondaryAnimation() {
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power2.inOut",
    },
  });
  tl.fromTo(".text-content", { x: "-150%" }, { x: "0%" }), "-=1";
  tl.fromTo(".secondary-main img", { x: "150%" }, { x: "0%" }), "-=1";
  // tl.fromTo(".text-content", { width: "0%" }, { width: "100%" });
}

// ADDING BARBA

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        showAnimation();
      },
    },

    {
      namespace: "page",
      beforeEnter() {
        secondaryAnimation();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        const done = this.async();
        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: "power2.inOut",
          },
        });
        tl.fromTo(current.container, 0.5, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".slide",
          1,
          { y: "100%" },
          { y: "0%", onComplete: done },
          "-=.5"
        );
      },
      enter({ current, next }) {
        const done = this.async();
        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: "power2.inOut",
          },
        });
        tl.fromTo(
          ".slide",
          1,
          { y: "0%" },
          { y: "-100%", stagger: 0.25, onComplete: done },
          "-=.5"
        );
        tl.fromTo(next.container, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});
