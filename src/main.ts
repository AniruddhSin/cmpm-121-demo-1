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
let numClicks: number = 0;
const buttonClickCounter = document.createElement("div");
buttonClickCounter.textContent = `${numClicks} Ants`;
app.append(buttonClickCounter);
button.addEventListener('click', ()=>{
    numClicks+=1;
    buttonClickCounter.textContent = `${numClicks} Ants`;
})
