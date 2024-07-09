// Scene Interface
interface Scene {
    text: string;
    choices: Choice[];
}

interface Choice {
    text: string;
    next: string;
    addItem?: string;
    removeItem?: string;
    addStatus?: string;
    removeStatus?: string;
    requiredItem?: string;
    alternateNext?: string;
    reload?: boolean;
    addHealth?: number;
    removeHealth?: number;
    requiredSTR?: number;
    requiredDEX?: number;
    requiredWIS?: number;
}

// Scene Data
const sceneData: { [key: string]: Scene; } = {
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

// Inventory
interface Item {
    name: string;
}

class Inventory {
    public items: Item[] = [];

    addItem(name: string): void {
        this.items.push({
            name,
        });
        this.updateItems();
    }

    removeItem(name: string): void {
        this.items = this.items.filter(item => item.name !== name);
        this.updateItems();
    }

    hasItem(name: string): boolean {
        return this.items.some(item => item.name === name);
    }

    updateItems() {
        var elements = document.getElementsByClassName("item");
            while (elements.length > 0) {
                if (elements[0].parentNode != null) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            }
        for (let i: number = 0; i < this.items.length; i++) {
            const itemUI = document.createElement("div");
            const rightPanel = document.getElementById("inventory")!;
            itemUI.className = "item";
            itemUI.innerText = this.items[i].name;
            rightPanel.appendChild(itemUI);
            console.log(this.items[i]);
        }
    }
}

// Status
interface StatusData {
    name: string;
}

class Status
{
    public status: StatusData[] = [];

    addStatus(name: string): void
    {
        this.status.push({
            name,
        });
        this.updateStatus();
    }

    removeStatus(name: string): void
    {
        this.status = this.status.filter(status => status.name !== name);
    }

    hasStatus(name: string): boolean
    {
        return this.status.some(status => status.name === name);
    }

    updateStatus() {
        var elements = document.getElementsByClassName("status");
            while (elements.length > 0) {
                if (elements[0].parentNode != null) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            }
        for (let i: number = 0; i < this.status.length; i++) {
            const statusUI = document.createElement("div");
            const leftPanel = document.getElementById("stats")!;
            statusUI.className = "status";
            statusUI.innerText = this.status[i].name;
            leftPanel.appendChild(statusUI);
            console.log(this.status[i]);
        }
    }
}

// Character Information
interface CharacterStats {
    name: string;
    class: string;
    health: number;
    str: number;
    dex: number;
    wis: number;
}

let char: CharacterStats[] = [];

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
    } if (1 == 1) // Character 2
    {
        char.push({
            name: "",
            class: "",
            health: 2,
            str: 2,
            dex: 2,
            wis: 2,
        });
    } if (1 == 1) // Character 3
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
    for (let i: number = 0; i < char.length; i++) {
        const charUI = document.createElement("div");
        const rightPanel = document.getElementById("stats")!;
        charUI.className = "stats";
        charUI.innerText = char[i].name;
        rightPanel.appendChild(charUI);
        console.log(char[i]);
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

    function handleChoice(choice: Choice) {
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

        if (choice.requiredItem && inventory.hasItem(choice.requiredItem) || choice.requiredDEX && choice.requiredDEX < char[0].dex || choice.requiredSTR && choice.requiredSTR < char[0].str || choice.requiredWIS && choice.requiredWIS < char[0].wis) {
            currentScene = choice.alternateNext!;
        } else {
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