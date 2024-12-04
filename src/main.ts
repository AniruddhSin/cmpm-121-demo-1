import "./style.css";

// Globals
let numPapers: number = 0;
let timeSinceFrame: number = performance.now();
let paperGrowthRate: number = 0;
const clickValue: number = 1;
const availableItems: Upgrade[] = [];

const app: HTMLDivElement = document.querySelector("#app")!;
const status_display: HTMLDivElement =
  document.querySelector("#status-display")!;

const body: HTMLElement | null = document.querySelector("body");
if (body){
  body.style.backgroundImage = "url('https://i.etsystatic.com/7942433/r/il/c53f7b/2794362434/il_1080xN.2794362434_nr2m.jpg')"
  body.style.filter = "brightness(80%)"
}

const gameName = "Lord of News";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Function to handle logic when newspapers value changes
function updateClick(change: number) {
  numPapers += change;
  paperCounter.textContent = numPapers.toFixed(1) + " Papers";
  for (const observer of availableItems) {
    if (numPapers >= observer.getCost()) {
      observer.enable();
    } else {
      observer.disable();
    }
  }
}

// Create the button
const manualClickButton = document.createElement("button");
manualClickButton.style.width = "128px"
manualClickButton.style.height = "128px"
manualClickButton.style.fontSize = "32px"
manualClickButton.innerText = "📰";
app.append(manualClickButton);

// Track number of units
const paperCounter = document.createElement("div");
updateClick(0);
app.append(paperCounter);
manualClickButton.addEventListener("click", () => {
  updateClick(clickValue);
});

// Start passive paper gain
function continuousPaperGain(timestamp: number) {
  const deltaTime = timestamp - timeSinceFrame;
  if (deltaTime >= 1000) {
    updateClick(paperGrowthRate);
    timeSinceFrame = timestamp;
  }
  requestAnimationFrame(continuousPaperGain);
}
requestAnimationFrame(continuousPaperGain);

// Create class to define Upgrades and track their status
interface Item {
  itemName: string;
  upgradeCost: number;
  upgradeValue: number;
  description: string;
}
class Upgrade implements Item {
  counterDisplay: HTMLDivElement;
  purchaseCount: number;
  upgradeCost: number;
  costMultiplier: number = 1.15;
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
    this.purchaseCount = 0;
    this.upgradeCost = cost;
    this.upgradeValue = value;
    this.description = descript;

    // Create and display upgrade counter
    this.counterDisplay = document.createElement("div");
    this.counterDisplay.innerHTML = `${this.purchaseCount} ${this.itemName}s`;
    status_display.append(this.counterDisplay);

    // Create interactable button
    this.button = buttonObject;
    this.button.innerHTML = `${label}: ${this.upgradeCost} Papers`;
    this.button.title = descript;
    app.append(this.button);
    this.button.addEventListener("click", () => {
      // keep attempting purchases until fail
      while (this.purchased()) {
        this.upgradeCost *= this.costMultiplier;
        this.purchaseCount += 1;
      }
      // update text after purchases were made
      this.counterDisplay.innerHTML = `${this.purchaseCount} ${this.itemName}s`;
      this.button.innerHTML = `${label}: ${this.upgradeCost.toFixed(1)} Papers`;
    });

    this.button.disabled = true;
    availableItems.push(this);
  }

  purchased() {
    if (this.upgradeCost > numPapers) {
      return false;
    }
    updateClick(0 - this.upgradeCost);
    paperGrowthRate += this.upgradeValue;
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

// Add Upgrades (label, cost, value, button, title)
new Upgrade(
  "Delivery Boy",
  1,
  0.1,
  document.createElement("button"),
  "He earns less than minimum wage",
);
new Upgrade(
  "Amazon Truck",
  10,
  2,
  document.createElement("button"),
  "The driver gets 4 hours of sleep per night",
);
new Upgrade(
  "Printer",
  100,
  15,
  document.createElement("button"),
  "Spread your own misinformation",
);
new Upgrade(
  "Investor",
  250,
  50,
  document.createElement("button"),
  "They scheme using your misinformation",
);
new Upgrade(
  "Company",
  1000,
  100,
  document.createElement("button"),
  "Expand your empire of lies",
);
