import "./style.css";

// Globals
let numPapers: number = 0;
let timeSinceFrame: number = performance.now();
let passivePaperGrowth: number = 0;
const clickValue: number = 1;
const clickObservers: Upgrade[] = [];

const app: HTMLDivElement = document.querySelector("#app")!;
const status_display: HTMLDivElement =
  document.querySelector("#status-display")!;

const gameName = "Lord of News";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button
const manualClickButton = document.createElement("button");
manualClickButton.innerHTML = "📰";
app.append(manualClickButton);

// Track number of units
const paperCounter = document.createElement("div");
updateClick(0);
app.append(paperCounter);
manualClickButton.addEventListener("click", () => {
  updateClick(clickValue);
});

// Start passive paper gain
requestAnimationFrame(continuousPaperGain);
function continuousPaperGain(timestamp: number) {
  const deltaTime = timestamp - timeSinceFrame;
  if (deltaTime >= 1000) {
    updateClick(passivePaperGrowth);
    timeSinceFrame = timestamp;
  }
  requestAnimationFrame(continuousPaperGain);
}

// Create class to define Upgrades and track their status
interface Item {
  itemName: string;
  upgradeCost: number;
  upgradeValue: number;
  description: string;
}
class Upgrade implements Item {
  counterDisplay: HTMLDivElement;
  upgradeCounter: number;
  upgradeCost: number;
  upgradeValue: number;
  itemName: string;
  button: HTMLButtonElement;
  description: string;

  constructor(
    label: string,
    cost: number,
    value: number,
    buttonObject: HTMLButtonElement,
    descript: string,
  ) {
    this.itemName = label;
    this.upgradeCounter = 0;
    this.upgradeCost = cost;
    this.upgradeValue = value;
    this.description = descript;

    // Create and display upgrade counter
    this.counterDisplay = document.createElement("div");
    this.counterDisplay.innerHTML = `${this.upgradeCounter} ${this.itemName}s`;
    status_display.append(this.counterDisplay);

    // Create interactable button
    this.button = buttonObject;
    this.button.innerHTML = `${label}: ${this.upgradeCost} Papers`;
    this.button.title = descript;
    app.append(this.button);
    this.button.addEventListener("click", () => {
      // keep attempting purchases until fail
      while (this.purchased()) {
        this.upgradeCost *= 1.15;
        this.upgradeCounter += 1;
      }
      // update text after purchases were made
      this.counterDisplay.innerHTML = `${this.upgradeCounter} ${this.itemName}s`;
      this.button.innerHTML = `${label}: ${this.upgradeCost.toFixed(1)} Papers`;
    });

    this.button.disabled = true;
    clickObservers.push(this);
  }

  purchased() {
    if (this.upgradeCost > numPapers) {
      return false;
    }
    updateClick(0 - this.upgradeCost);
    passivePaperGrowth += this.upgradeValue;
    return true;
  }

  enable() {
    this.button.disabled = false;
  }

  disable() {
    this.button.disabled = true;
  }

  getCost() {
    return this.upgradeCost;
  }
}

/*// Add button to upgrade passive click gains
const upgradePassivePaper = document.createElement("button");
upgradePassivePaper.innerHTML = "Delivery Boy (Costs 10 Paper)";
app.append(upgradePassivePaper);
upgradePassivePaper.disabled = true;
upgradePassivePaper.addEventListener("click", () => {
  const increment: number = Math.floor(numPapers / 10);
  updateClick(0 - increment * 10);
  passivePaperGrowth += increment;
});*/

function updateClick(change: number) {
  numPapers += change;
  paperCounter.textContent = numPapers.toFixed(1) + " Papers";
  for (const observer of clickObservers) {
    if (numPapers >= observer.getCost()) {
      observer.enable();
    } else {
      observer.disable();
    }
  }
}

// Add Upgrades (label, cost, value, button, title)
new Upgrade("Delivery Boy", 1, 0.1, document.createElement("button"), "He earns less than minimum wage");
new Upgrade("Amazon Truck", 10, 2, document.createElement("button"), "The driver gets 4 hours of sleep per night");
new Upgrade("Printer", 100, 15, document.createElement("button"), "Spread your own misinformation");
new Upgrade("Investor", 250, 50, document.createElement("button"), "They scheme using your misinformation");
new Upgrade("Company", 1000, 100, document.createElement("button"), "Expand your empire of lies");
