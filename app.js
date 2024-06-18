const celestialBodies = [
  { body: "earth", mass: 1, image: "./Images/Earth.webp" },
  { body: "moon", mass: 0.166, image: "./Images/Moon.webp" },
  { body: "mercury", mass: 0.38, image: "./Images/Mercury.webp" },
  { body: "venus", mass: 0.91, image: "./Images/Venus.webp" },
  { body: "mars", mass: 0.38, image: "./Images/Mars.webp" },
  { body: "sun", mass: 27.01, image: "./Images/Sun.webp" },
  { body: "jupiter", mass: 2.34, image: "./Images/Jupiter.webp" },
  { body: "saturn", mass: 1.06, image: "./Images/Saturn.webp" },
  { body: "uranus", mass: 0.92, image: "./Images/Uranus.webp" },
  { body: "neptune", mass: 1.19, image: "./Images/Neptune.webp" },
  { body: "pluto", mass: 0.06, image: "./Images/Pluto.webp" },
];

const initialWeight = document.getElementById("input-field");

const container = document.querySelector(".container");
container.classList.add("circle");

const inputField = document.querySelector("#input-field");

window.addEventListener("load", () => {
  inputField.focus();
});

const addSpacemanDiv = document.createElement("div");
const addSpacemanImg = document.createElement("img");
addSpacemanImg.src = "./Images/SpaceMan.webp";
addSpacemanImg.className = "spaceman-img";
addSpacemanImg.alt = "spaceman";
addSpacemanDiv.className = "item-spaceman items";
addSpacemanDiv.append(addSpacemanImg, inputField);
container.append(addSpacemanDiv);

for (let object of celestialBodies) {
  const addDiv = document.createElement("div");
  const addImg = document.createElement("img");

  addDiv.className = `item-${object.body} items`;

  const planetName = document.createElement("h2");
  planetName.className = "celestial-body";
  planetName.textContent = object.body;

  planetName.style.visibility = "hidden";

  addImg.src = object.image;
  addImg.alt = object.body;
  addImg.className = `${object.body}-img faded-img`;

  const planetWeight = document.createElement("h2");
  planetWeight.className = "weight";
  planetWeight.id = `w-${object.body}`;
  planetWeight.textContent = "0";
  planetWeight.style.visibility = "hidden";

  addDiv.append(planetName, addImg, planetWeight);
  container.append(addDiv);
}

const addRocketDiv = document.createElement("div");
const addRocketImg = document.createElement("img");
addRocketImg.src = "./Images/Rocket.webp";
addRocketImg.className = "rocket-img faded-img";
addRocketImg.alt = "rocket";
addRocketDiv.className = "item-rocket items";
addRocketDiv.append(addRocketImg);

document.querySelector(".item-sun").append(addRocketDiv);

function weightConvert() {
  const weight = Number(initialWeight.value);

  for (let object of celestialBodies) {
    const planet = document.querySelector(`#w-${object.body}`);
    planet.textContent =
      isNaN(weight) || weight === 0 ? "‎ " : +(weight * object.mass).toFixed(2);
  }
  document.querySelector(".item-rocket").style.animation =
    "rocket-animation 3s cubic-bezier(0, 0, 1, 1) infinite";

  document.querySelectorAll(".celestial-body").forEach((h2) => {
    h2.style.visibility = "visible";
    h2.style.animation = "fadeIn 2s cubic-bezier(0, 0, 1, 1)";
  });

  document.querySelectorAll(".weight").forEach((h2) => {
    h2.style.visibility = "visible";
    h2.style.animation = "fadeIn 2s cubic-bezier(0, 0, 1, 1)";
  });
}

initialWeight.addEventListener("input", weightConvert);

function autoScroll() {
  if (window.innerWidth < 631) {
    setTimeout(() => {
      addSpacemanImg.scrollIntoView({
        block: "start",
        behavior: "smooth",
        inline: "start",
      });
    }, 100);
  }
}

let animationStarted = false;

function keyfunction() {
  if (animationStarted) return;

  animationStarted = true;

  document.querySelectorAll("h2").forEach((h4) => {
    h4.style.visibility = "visible";
    h4.style.animation = "fadeIn 2s cubic-bezier(0, 0, 1, 1)";
  });

  document.querySelectorAll(".faded-img").forEach((img) => {
    const rndInt = Math.floor(Math.random() * 30 + 10);
    img.style.filter = "none";
    img.style.animation = `fadeIn 5s, spin ${rndInt}s cubic-bezier(0, 0, 1, 1) infinite`;
  });

  document.querySelector("h1").style.animation = "scaleZero 1s forwards";
  document.querySelector(".h3scale").style.animation = "scaleZero 1s forwards";

  document.querySelector(".sun-img").style.animation =
    "sun-animation 5s infinite, fadeIn 5s, spin 45s cubic-bezier(0, 0, 1, 1) infinite";

  document.querySelector(".container").style.animation =
    "gap-animation 1.5s forwards";
}

document.addEventListener("keypress", keyfunction, true);

addRocketImg.addEventListener("click", () => {
  addRocketImg.remove();
});

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "Escape") {
    inputField.value = "";
    weightConvert();
  }
});
