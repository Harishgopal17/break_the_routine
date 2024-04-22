const btn = document.querySelector(".activity_btn");
const btn_close = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btn_scroll = document.querySelector(".btn_scroll_to");
const section1 = document.querySelector(".section1");
const header = document.querySelector(".header");
const logo = document.querySelector(".nav_logo");
const routine_break = document.querySelector(".routine_break_section");

btn.addEventListener("click", function () {
  modal.classList.toggle("visibility_hidden");
  overlay.classList.toggle("visibility_hidden");
});

btn_close.addEventListener("click", function () {
  modal.classList.toggle("visibility_hidden");
  overlay.classList.toggle("visibility_hidden");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("visibility_hidden")) {
    modal.classList.toggle("visibility_hidden");
    overlay.classList.toggle("visibility_hidden");
    btn.blur();
  }
});

btn_scroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    console.log("Intersection observer entries:", entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        routine_break.classList.toggle("section--hidden");
      }
      // if (!entry.isIntersecting) observer.unobserve(entry);
    });
  },
  {
    root: null,
    threshold: 0.1,
  }
);

observer.observe(routine_break);
