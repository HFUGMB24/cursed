"use strict";
const dialogueData = {
    start: {
        text: "You are in a dark forest. You see a path ahead.",
        choices: [
            {
                text: "Take the path",
                next: "path",
                addItem: "map"
            },
            {
                text: "Stay here",
                next: "stay"
            }
        ]
    },
    path: {
        text: "You walk down the path and find a map.",
        choices: [
            { text: "Look at the map", next: "map" },
            { text: "Keep walking", next: "deep_forest", addHealth: 1 }
        ]
    },
    map: {
        text: "The map shows a hidden treasure.",
        choices: [
            { text: "Search for treasure", next: "treasure" },
            { text: "Ignore the map", next: "deep_forest", removeHealth: 1 }
        ]
    },
    retry: {
        text: "Do you want to try again?",
        choices: [
            { text: "Yes.", next: "start", reload: true },
            { text: "No.", next: "end" }
        ]
    },
    end: {
        text: "Game over.",
        choices: [
            { text: "Restart", next: "start", reload: true }
        ]
    }
};
class Inventory {
    constructor() {
        this.items = [];
    }
    addItem(name) {
        this.items.push({
            name,
            type: "",
            amount: 0
        });
    }
    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
    }
    hasItem(name) {
        return this.items.some(item => item.name === name);
    }
}
let currentScene;
let inventory;
let health;
let healthMax;
function startScene() {
    chooseScene();
}
function chooseScene() {
    let currentScene = "start";
    let inventory = new Inventory;
    let health = 3;
    let healthMax = 3;
    const scene = dialogueData[currentScene];
    const textContainer = document.getElementById("desc");
    const choicesContainer = document.getElementById("choices");
    if (textContainer) {
        textContainer.innerHTML = `<p>${scene.text}</p>`;
    }
    if (choicesContainer) {
        choicesContainer.innerHTML = "";
        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.className = "choice";
            button.innerText = choice.text;
            button.addEventListener("click", () => handleChoice(choice));
            choicesContainer.appendChild(button);
        });
    }
}
function handleChoice(choice) {
}
startScene();
