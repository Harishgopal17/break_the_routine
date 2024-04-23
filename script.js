const btn = document.querySelector(".activity_btn");
const btn_close = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btn_scroll = document.querySelector(".btn_scroll_to");
const section1 = document.querySelector(".section1");
const header = document.querySelector(".header");
const logo = document.querySelector(".nav_logo");
const routine_break = document.querySelector(".routine_break_section");
const how_it_works = document.querySelector(".how_it_works_section");
const activity_generator = document.querySelector(
  ".activity_generator_section"
);
const animate_section = document.querySelectorAll(".animate_section");
const activity_content = document.querySelector(".activity_content");
const food_image = document.querySelector(".food_image");
const food_name = document.querySelector(".food_name");
const quote_content = document.querySelector(".quote_content");
const fact_content = document.querySelector(".fact_content");

///////////////////////////////
////Modal window
///////////////////////////////
modal.classList.remove("visibility_hidden");
overlay.classList.remove("visibility_hidden");
function OpenCloseModal() {
  modal.classList.toggle("visibility_hidden");
  overlay.classList.toggle("visibility_hidden");
}

btn.addEventListener("click", function () {
  OpenCloseModal();
});

btn_close.addEventListener("click", function () {
  OpenCloseModal();
});
overlay.addEventListener("click", function () {
  OpenCloseModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("visibility_hidden")) {
    OpenCloseModal();
    btn.blur();
  }
});

btn_scroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////
////Image load
///////////////////////////////

let bgImg = new Image();

bgImg.src = "/img/u_got_this_img.jpg";

bgImg.onload = function () {
  document.querySelector(".how_it_works_img").style.backgroundImage =
    'url("' + bgImg.src.replace("\\", "\\\\").replace('"', '\\"') + '")';
  console.log("image loaded");
};

///////////////////////////////
////Section reveal
///////////////////////////////

const routine_break_observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("section--hidden", !entry.isIntersecting);
      if (entry.isIntersecting) routine_break_observer.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.2,
  }
);

routine_break_observer.observe(routine_break);

const how_it_works_observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.remove("hidden");
      if (entry.isIntersecting) entry.target.classList.add("animation1");
    });
  },
  {
    root: null,
    threshold: 0.25,
  }
);

how_it_works_observer.observe(how_it_works);
// animate_section.forEach((sec) => how_it_works_observer.observe(sec));

const activity_generator_observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.remove("hidden");
      if (entry.isIntersecting) entry.target.classList.add("animation2");
    });
  },
  {
    root: null,
    threshold: 0.25,
  }
);

activity_generator_observer.observe(activity_generator);

///////////////////////////////
////API
///////////////////////////////

async function BoredAPi() {
  try {
    // const randomActivity = await fetch(
    //   `https://www.boredapi.com/api/activity?type=recreational`
    // );
    const randomActivity = await fetch(
      `https://www.boredapi.com/api/activity/`
    );
    const data = await randomActivity.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

BoredAPi();
