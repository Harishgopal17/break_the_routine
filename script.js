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
    const randomActivity = await fetch(
      `https://www.boredapi.com/api/activity/`
    );
    const data = await randomActivity.json();
    console.log(data);
    activity_content.innerHTML = data.activity;
  } catch (err) {
    console.error(err);
  }
}

// BoredAPi();

async function randomfoods() {
  try {
    const randomActivity = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await randomActivity.json();
    console.log(data.meals[0]);
    console.log(data.meals[0].strMeal);
    food_image.src = data.meals[0].strMealThumb;
    food_name.innerHTML = data.meals[0].strMeal;
  } catch (err) {
    console.log(err);
  }
}

// randomfoods();

async function advice() {
  try {
    const randomActivity = await fetch(`https://api.adviceslip.com/advice`);
    const data = await randomActivity.json();
    console.log(data.slip);
    quote_content.innerHTML = data.slip.advice;
  } catch (err) {
    console.error(err);
  }
}

// advice();

async function UselessFacts() {
  try {
    const randomActivity = await fetch(
      `https://uselessfacts.jsph.pl/api/v2/facts/random`
    );
    const data = await randomActivity.json();
    console.log(data);
    fact_content.innerHTML = data.text;
  } catch (err) {
    console.error(err);
  }
}

// UselessFacts();

async function getJSON(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch {
    renderError("Something went wrong");
  }
}

async function getData() {
  try {
    const data = await Promise.all([
      getJSON(`https://www.boredapi.com/api/activity/`),
      getJSON(`https://www.themealdb.com/api/json/v1/1/random.php`),
      getJSON(`https://api.adviceslip.com/advice`),
      getJSON(`https://uselessfacts.jsph.pl/api/v2/facts/random`),
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
  } catch (err) {
    console.log(err);
  }
}

getData();
