const btn = document.querySelector(".activity_btn");
const btn_close = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

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
