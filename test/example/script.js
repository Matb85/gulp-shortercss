// exaples with selecting by a single id
const idEl = document.getElementById("wiggle");
idEl.id = "otherId";

// exaples with selecting by a single class
document.querySelector("#wiggle h2.header");
document.querySelectorAll(".class p");

// exaples with selecting by multiple selectors
const classEl = document.getElementsByClassName("class");
classEl.classList.add("otherClass");
classEl.classList.remove("otherClass");
classEl.classList.toggle("otherClass");
classEl.className = "otherClass";

wiggle(document.getElementById("wiggle"), 0);
function wiggle(element, time) {
  element.style.marginLeft = Math.sin(time) * 10;
  time += 0.1;
  setTimeout(wiggle.bind(this, element, time), 10);
}
