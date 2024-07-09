"use strict";
// Scene Data
const sceneData = {
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
        });
        const itemUI = document.createElement("div");
        const rightPanel = document.getElementById("right-panel");
        itemUI.className = "item";
        itemUI.innerText = Inventory.name;
        rightPanel.appendChild(itemUI);
    }
    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
    }
    hasItem(name) {
        return this.items.some(item => item.name === name);
    }
}
let char = [];
function createCharacter() {
    if (1 == 1) // Character 1
     {
        char.push({
            name: "",
            class: "",
            health: 2,
            str: 2,
            dex: 2,
            wis: 2,
        });
    }
    if (1 == 1) // Character 2
     {
        char.push({
            name: "",
            class: "",
            health: 2,
            str: 2,
            dex: 2,
            wis: 2,
        });
    }
    if (1 == 1) // Character 3
     {
        char.push({
            name: "",
            class: "",
            health: 2,
            str: 2,
            dex: 2,
            wis: 2,
        });
    }
}
// Scene Engine
function startScene() {
    let currentScene = "start";
    let inventory = new Inventory;
    let health = 3;
    let healthMax = 3;
    function chooseScene() {
        const scene = sceneData[currentScene];
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
        if (choice.addItem) {
            inventory.addItem(choice.addItem);
        }
        if (choice.removeItem) {
            inventory.removeItem(choice.removeItem);
        }
        if (choice.addHealth) {
            health = Math.min(health + choice.addHealth, healthMax);
        }
        if (choice.removeHealth) {
            health = Math.max(health - choice.removeHealth, 0);
        }
        updateHealth();
        if (choice.reload) {
            location.reload();
            return;
        }
        const scene = sceneData[currentScene];
        scene.choices = scene.choices.filter(c => c !== choice);
        if (choice.requiredItem && inventory.hasItem(choice.requiredItem)) {
            currentScene = choice.alternateNext;
        }
        else {
            currentScene = choice.next;
        }
        chooseScene();
    }
    function updateHealth() {
        const healthUI = document.getElementById("health-ui");
        if (healthUI) {
            healthUI.innerHTML = `Health: ${health}/${healthMax}`;
        }
    }
    chooseScene();
}
// Start on Load
document.addEventListener("DOMContentLoaded", () => {
    startScene();
});
