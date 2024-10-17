import "./style.css";

// Globals
let numPapers: number = 0;
let timeSinceFrame: number = performance.now();
let passivePaperGrowth: number = 0;
const clickValue: number = 1;

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Lord of News";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button
const manualClickButton = document.createElement("button");
manualClickButton.innerHTML = "📰";
app.append(manualClickButton);

// Track button clicks
const manualClickCounter = document.createElement("div");
updateClick(0);
app.append(manualClickCounter);
manualClickButton.addEventListener("click", () => {
  updateClick(clickValue);
});
requestAnimationFrame(continuousPaperGain);

// Add button to upgrade passive click gains
const upgradePassivePaper = document.createElement("button");
upgradePassivePaper.innerHTML = "Delivery Boy (Costs 10 Paper)";
app.append(upgradePassivePaper);
upgradePassivePaper.disabled = true;
upgradePassivePaper.addEventListener("click", () => {
  const increment: number = Math.floor(numPapers / 10);
  updateClick(0 - increment * 10);
  passivePaperGrowth += increment;
});

function continuousPaperGain(timestamp: number) {
  const deltaTime = timestamp - timeSinceFrame;
  if (deltaTime >= 1000) {
    updateClick(passivePaperGrowth);
    timeSinceFrame = timestamp;
  }
  requestAnimationFrame(continuousPaperGain);
}

function updateClick(change: number) {
  numPapers += change;
  manualClickCounter.textContent = `${numPapers} Papers`;
  if (numPapers >= 10) {
    upgradePassivePaper.disabled = false;
  }
}
