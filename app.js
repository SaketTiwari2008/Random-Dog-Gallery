const url = `https://dog.ceo/api/breeds/image/random`;

document.addEventListener("DOMContentLoaded", () => {
  genImgCon();
});

const genImgCon = () => {
  let curr = ``;
  for (let i = 1; i <= 5; i++) {
    curr += `<div class="img-cont">
        <div class="img"></div>
      </div>`;
  }

  // Create a temporary container
  const temp = document.createElement("div");
  temp.innerHTML = curr;

  let newImgs = temp.querySelectorAll(".img");
  document.querySelector("#container").append(...temp.childNodes);

  setRandomBgColor(newImgs);

  // Fetch only for new images
  fetchData(newImgs);

  // Add button again and remove previous btn.
  addBtn();
};

const setRandomBgColor = (imgConList) => {
  imgConList.forEach((ele) => {
    ele.parentElement.style.backgroundColor = getRandomColor();
  });
};

const getRandomColor = () => {
  let r = Math.floor(Math.random() * 255) + 1;
  let g = Math.floor(Math.random() * 255) + 1;
  let b = Math.floor(Math.random() * 255) + 1;
  return `rgb(${r}, ${g}, ${b})`;
};

const fetchData = async (imgList) => {
  for (let ele of imgList) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      ele.style.backgroundImage = `url(${data.message})`;
    } catch (err) {
      console.log("ERROR - ", err);
    }
  }
};

function addBtn() {
  let oldBtn = document.querySelector(".btn-box");
  if (oldBtn) oldBtn.remove();

  let btnBox = document.createElement("div");
  btnBox.classList.add("btn-box");

  let btn = document.createElement("button");
  btn.textContent = "Load more..";
  btn.classList.add("btn");

  btnBox.appendChild(btn);
  document.querySelector("#container").appendChild(btnBox);

  btn.addEventListener("click", () => {
    btn.remove();
    genImgCon();
  });
}
