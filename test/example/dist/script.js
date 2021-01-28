// exaples with selecting by a single id
const idEl = document.getElementById("a");
idEl.id = "c";

// exaples with selecting by a single class
document.querySelector("#a h2.i");
document.querySelectorAll(".g p");

// exaples with selecting by multiple selectors
const classEl = document.getElementsByClassName("g");
classEl.classList.add("h");
classEl.classList.remove("h");
classEl.classList.toggle("h");
classEl.className = "h";

wiggle(document.getElementById("a"), 0);
function wiggle(element, time) {
  element.style.marginLeft = Math.sin(time) * 10;
  time += 0.1;
  setTimeout(wiggle.bind(this, element, time), 10);
}
