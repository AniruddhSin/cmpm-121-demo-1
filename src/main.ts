import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ant Mountain";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button
const button = document.createElement("button");
button.innerHTML = "Ant 🐜";
app.append(button);

// Track button clicks
let numAnts: number = 0;
const buttonClickCounter = document.createElement("div");
buttonClickCounter.textContent = `${numAnts} Ants`;
app.append(buttonClickCounter);
button.addEventListener("click", () => {
  numAnts += 1;
  buttonClickCounter.textContent = `${numAnts} Ants`;
});

// Add "automatic" clicking
setInterval(() => {
  numAnts += 1;
  buttonClickCounter.textContent = `${numAnts} Ants`;
}, 1000);
