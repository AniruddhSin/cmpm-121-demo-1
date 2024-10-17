import "./style.css";

// Globals
let numAnts: number = 0;
let timeSinceFrame: number = performance.now();

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
const buttonClickCounter = document.createElement("div");
buttonClickCounter.textContent = `${numAnts} Ants`;
app.append(buttonClickCounter);
button.addEventListener("click", () => {
  numAnts += 1;
  buttonClickCounter.textContent = `${numAnts} Ants`;
});

requestAnimationFrame(continuousAntGain);
function continuousAntGain(timestamp: number) {
  const deltaTime = timestamp - timeSinceFrame;
  if (deltaTime >= 1000) {
    numAnts += 10;
    buttonClickCounter.textContent = `${numAnts} Ants`;
    timeSinceFrame = timestamp;
  }
  requestAnimationFrame(continuousAntGain);
}
