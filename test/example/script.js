wiggle(document.getElementById("wiggle"), 0);
const el = document.querySelector("#wiggle");
// eslint-disable-next-line
const dasd = document.getElementsByClassName("class");

el.id = "wiggle";
console.log(el, dasd);
function wiggle(element, time) {
  element.style.marginLeft = Math.sin(time) * 10;
  time += 0.1;
  setTimeout(wiggle.bind(this, element, time), 10);
}
