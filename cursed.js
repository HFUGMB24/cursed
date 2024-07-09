"use strict";
let Character1 = {
    name: "Wasabi",
    class: "Fighter",
    HP: 3,
    Str: 12,
    Dex: 10,
    Wis: 8,
};
let Character2 = {
    name: "Kiri",
    class: "Rogue",
    HP: 3,
    Str: 10,
    Dex: 12,
    Wis: 8,
};
let Character3 = {
    name: "Hazel",
    class: "Sage",
    HP: 3,
    Str: 8,
    Dex: 10,
    Wis: 12,
};
let chosenCharacter = [];
function selectCharacter() {
    let button1 = document.getElementById('Character1');
    let button2 = document.getElementById('Character2');
    let button3 = document.getElementById('Character3');
    button1.addEventListener('click', function handleClick(_event) {
        chosenCharacter.push(Character1);
        console.log(chosenCharacter[0]);
        const element = document.getElementById("Character");
        updateStats();
        element.remove();
    });
    button2.addEventListener('click', function handleClick(_event) {
        console.log(chosenCharacter);
        chosenCharacter.push(Character2);
        const element = document.getElementById("Character");
        updateStats();
        element.remove();
    });
    button3.addEventListener('click', function handleClick(_event) {
        console.log(chosenCharacter);
        chosenCharacter.push(Character3);
        const element = document.getElementById("Character");
        updateStats();
        element.remove();
    });
    startScene();
}
function updateStats() {
    const leftPanel = document.getElementById("stats");
    const healthUI = document.getElementById("health-ui");
    const charHealth = document.createElement("div");
    charHealth.className = "char-stats";
    charHealth.innerText = "HP: " + chosenCharacter[0].HP + " / 3";
    healthUI.appendChild(charHealth);
    const charName = document.createElement("div");
    charName.className = "char-stats";
    charName.innerText = chosenCharacter[0].name;
    leftPanel.appendChild(charName);
    const charClass = document.createElement("div");
    charClass.className = "char-stats";
    charClass.innerText = chosenCharacter[0].class;
    leftPanel.appendChild(charClass);
    const charStr = document.createElement("div");
    charStr.className = "char-stats";
    charStr.innerText = "STR: " + chosenCharacter[0].Str;
    leftPanel.appendChild(charStr);
    const charDex = document.createElement("div");
    charDex.className = "char-stats";
    charDex.innerText = "DEX: " + chosenCharacter[0].Dex;
    leftPanel.appendChild(charDex);
    const charWis = document.createElement("div");
    charWis.className = "char-stats";
    charWis.innerText = "Wis: " + chosenCharacter[0].Wis;
    leftPanel.appendChild(charWis);
}
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
            { text: "Look at the map", next: "map", addItem: "health potion", addStatus: "poisoned" },
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
        this.updateItems();
    }
    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.updateItems();
    }
    hasItem(name) {
        return this.items.some(item => item.name === name);
    }
    updateItems() {
        var elements = document.getElementsByClassName("item");
        while (elements.length > 0) {
            if (elements[0].parentNode != null) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
        for (let i = 0; i < this.items.length; i++) {
            const itemUI = document.createElement("div");
            const rightPanel = document.getElementById("inventory");
            itemUI.className = "item";
            itemUI.innerText = this.items[i].name;
            rightPanel.appendChild(itemUI);
            console.log(this.items[i]);
        }
    }
}
class Status {
    constructor() {
        this.status = [];
    }
    addStatus(name) {
        this.status.push({
            name,
        });
        this.updateStatus();
    }
    removeStatus(name) {
        this.status = this.status.filter(status => status.name !== name);
    }
    hasStatus(name) {
        return this.status.some(status => status.name === name);
    }
    updateStatus() {
        var elements = document.getElementsByClassName("status");
        while (elements.length > 0) {
            if (elements[0].parentNode != null) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
        for (let i = 0; i < this.status.length; i++) {
            const statusUI = document.createElement("div");
            const leftPanel = document.getElementById("status-effect");
            statusUI.className = "status";
            statusUI.innerText = this.status[i].name;
            leftPanel.appendChild(statusUI);
            console.log(this.status[i]);
        }
    }
}
// Scene Manager
function startScene() {
    let currentScene = "start";
    let inventory = new Inventory;
    let status = new Status;
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
        if (choice.addStatus) {
            status.addStatus(choice.addStatus);
        }
        if (choice.removeStatus) {
            status.removeStatus(choice.removeStatus);
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
        if (choice.requiredItem && inventory.hasItem(choice.requiredItem) || choice.requiredDEX && choice.requiredDEX < chosenCharacter[0].Dex || choice.requiredSTR && choice.requiredSTR < chosenCharacter[0].Str || choice.requiredWIS && choice.requiredWIS < chosenCharacter[0].Wis) {
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
    selectCharacter();
});
