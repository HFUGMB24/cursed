// Scene Interface
interface Scene
{
    text: string;
    choices: Choice[];
}

interface Choice
{
    text: string;
    next: string;
    addItem?: string;
    removeItem?: string;
    requiredItem?: string;
    alternateNext?: string;
    reload?: boolean;
    addHealth?: number;
    removeHealth?: number;
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

// Inventory
interface Item
{
    name: string;
}

class Inventory
{
    private items: Item[] = [];

    addItem(name: string): void
    {
        this.items.push({
            name,
        });
        const itemUI = document.createElement("div");
        const rightPanel = document.getElementById("right-panel")!;
        itemUI.className = "item";
        itemUI.innerText = Inventory.name;
        rightPanel.appendChild(itemUI);

    }

    removeItem(name: string): void
    {
        this.items = this.items.filter(item => item.name !== name);
    }

    hasItem(name: string): boolean
    {
        return this.items.some(item => item.name === name);
    }
}

function chooseScene(){}

interface Character {
    name: string,
    class: string,
    HP: number,
    Str: number,
    Dex: number,
    Wis: number,
}

let Character1 = {
    name: "Wasabi",
    class: "Fighter",
    HP: 3,
    Str: 12,
    Dex: 10,
    Wis: 8,
}

let Character2 = {
    name: "Kiri",
    class: "Rogue",
    HP: 3,
    Str: 10,
    Dex: 12,
    Wis: 8,
}

let Character3 = {
    name: "Hazel",
    class: "Sage",
    HP: 3,
    Str: 8,
    Dex: 10,
    Wis: 12,
}

let chosenCharacter: Character[] = [];

let button1 = <HTMLElement>document.getElementById('Character1');
let button2 = <HTMLElement>document.getElementById('Character2');
let button3 = <HTMLElement>document.getElementById('Character3');

button1.addEventListener('click', function handleClick(_event) {
    chosenCharacter.push(Character1);
    console.log("one");
    const element = <HTMLElement>document.getElementById("Character");
    element.remove(); 
});

button2.addEventListener('click', function handleClick(_event) {
    console.log("two");
    chosenCharacter.push(Character2);
    const element = <HTMLElement>document.getElementById("Character");
    element.remove();  
});

button3.addEventListener('click', function handleClick(_event) {
    console.log("three");
    chosenCharacter.push(Character3);
    const element = <HTMLElement>document.getElementById("Character");
    element.remove(); 
});
  
// Inventory
interface Status
{
    name: string;
}

// class Status
// {
//     private status: Status[] = [];

//     addStatus(name: string): void
//     {
//         this.status.push({
//             name,
//         });

//         const statusUI = document.createElement("div");
//         const leftPanel = document.getElementById("left-panel")!;
//         statusUI.className = "status";
//         statusUI.innerText = Status.name;
//         leftPanel.appendChild(statusUI);

//     }

//     removeStatus(name: string): void
//     {
//         this.status = this.status.filter(status => status.name !== name);
//     }

//     hasStatus(name: string): boolean
//     {
//         return this.status.some(status => status.name === name);
//     }
// }

// Character Information
interface CharacterStats
{
    name: string;
    class: string;
    health: number;
    str: number;
    dex: number;
    wis: number;
}

let char: CharacterStats[] = [];

function createCharacter()
{
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
}


// Scene Manager
function startScene()
{
    let currentScene = "start";
    let inventory = new Inventory;
    let health = 3;
    let healthMax = 3;

    function chooseScene()
    {
        const scene = sceneData[currentScene];
        const textContainer = document.getElementById("desc");
        const choicesContainer = document.getElementById("choices");

        if (textContainer)
        {
            textContainer.innerHTML = `<p>${scene.text}</p>`;
        }

        if (choicesContainer)
        {
            choicesContainer.innerHTML = "";
            scene.choices.forEach(choice =>
            {
                const button = document.createElement("button");
                button.className = "choice";
                button.innerText = choice.text;
                button.addEventListener("click", () => handleChoice(choice));
                choicesContainer.appendChild(button);
            });
        }
    }

    function handleChoice(choice: Choice)
    {
        if (choice.addItem)
        {
            inventory.addItem(choice.addItem);
        }
        if (choice.removeItem)
        {
            inventory.removeItem(choice.removeItem);
        }

        if (choice.addHealth)
        {
            health = Math.min(health + choice.addHealth, healthMax);
        }
        if (choice.removeHealth)
        {
            health = Math.max(health - choice.removeHealth, 0);
        }
        updateHealth();

        if (choice.reload)
        {
            location.reload();
            return;
        }

        const scene = sceneData[currentScene];
        scene.choices = scene.choices.filter(c => c !== choice);

        if (choice.requiredItem && inventory.hasItem(choice.requiredItem))
        {
            currentScene = choice.alternateNext!;
        } else
        {
            currentScene = choice.next;
        }

        chooseScene();
    }

    function updateHealth()
    {
        const healthUI = document.getElementById("health-ui");
        if (healthUI)
        {
            healthUI.innerHTML = `Health: ${health}/${healthMax}`;
        }
    }
    chooseScene();
}

// Start on Load
document.addEventListener("DOMContentLoaded", () =>
{
    startScene();
});