let slider = document.querySelector(".slider .list");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let image = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
  "16.png",
  "17.png",
  "18.png",
  "19.png",
  "20.png",
];
let active = 0;
let lengthItems = image.length - 1;
function renderImages() {
  for (let src of image) {
    let item = document.createElement("div");
    item.classList.add("item");
    let img = document.createElement("img");
    img.src = `./images/${src}`;
    img.alt = "Lỗi Ảnh";
    item.appendChild(img);
    slider.appendChild(item);
  }
}
renderImages();
let items = document.querySelectorAll(".slider .list .item");
next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};

function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";
  let imageCountElement = document.querySelector(".image-count");
  imageCountElement.textContent = `${active + 1}/${lengthItems + 1}`;
}
window.onresize = function (event) {
  reloadSlider();
};
