const btn = document.querySelector(".activity_btn");
const btn_close = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btn_scroll = document.querySelector(".btn_scroll_to");
const section1 = document.querySelector(".section1");
const header = document.querySelector(".header");
const logos = document.querySelectorAll(".nav_logo");
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
const to_top = document.querySelector(".to_top");
const loading = document.querySelector(".loading_div");

///////////////////////////////
////Modal window
///////////////////////////////
// modal.classList.remove("visibility_hidden");
// overlay.classList.remove("visibility_hidden");
function OpenCloseModal() {
  modal.classList.toggle("visibility_hidden");
  overlay.classList.toggle("visibility_hidden");
}

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

///////////////////////////////
////Image load
///////////////////////////////

let bgImg = new Image();

bgImg.src = "/img/u_got_this_img.jpg";

bgImg.onload = function () {
  document.querySelector(".how_it_works_img").style.backgroundImage =
    'url("' + bgImg.src.replace("\\", "\\\\").replace('"', '\\"') + '")';
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
////Move to Section
///////////////////////////////

btn_scroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

let calcScrollValue = () => {
  let pos = window.scrollY;
  let calcHeight = document.documentElement.scrollHeight - window.innerHeight;
  let percntVal = Math.round((pos / calcHeight) * 100);

  to_top.style.background = `conic-gradient(#1864ab ${percntVal}%, #d0ebff ${percntVal}%)`;
};

window.addEventListener("scroll", () => {
  calcScrollValue();
  if (window.scrollY > 50) {
    to_top.classList.add("active");
  } else {
    to_top.classList.remove("active");
  }
});

to_top.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

logos.forEach((logo) =>
  logo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  })
);

function showloading() {
  loading.classList.toggle("loading");
  overlay.classList.toggle("visibility_hidden");
}

function hideloading() {
  loading.classList.toggle("loading");
  overlay.classList.toggle("visibility_hidden");
}

///////////////////////////////
////API
///////////////////////////////

async function getJSON(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch {
    renderError("Something went wrong");
  }
}

async function getData() {
  showloading();
  try {
    const data = await Promise.all([
      getJSON(`https://www.boredapi.com/api/activity/`),
      getJSON(`https://www.themealdb.com/api/json/v1/1/random.php`),
      getJSON(`https://api.adviceslip.com/advice`),
      getJSON(`https://uselessfacts.jsph.pl/api/v2/facts/today`),
    ]);
    // console.log(data);
    // console.log(data[0].activity);
    // console.log(data[1].meals[0].strMealThumb);
    // console.log(data[1].meals[0].strMeal);
    // console.log(data[2].slip.advice);
    // console.log(data[3].text);
    activity_content.innerHTML = data[0].activity;
    food_image.src = data[1].meals[0].strMealThumb;
    food_name.innerHTML = data[1].meals[0].strMeal;
    quote_content.innerHTML = data[2].slip.advice;
    fact_content.innerHTML = data[3].text;
    hideloading();
    OpenCloseModal();
  } catch (err) {
    console.log(err);
  }
}

// btn.addEventListener("click", function () {
//   getData();
// });
