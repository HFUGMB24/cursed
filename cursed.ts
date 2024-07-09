interface Scene {
    text: string;
    choices: Choice[];
}

interface Choice {
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

const dialogueData: { [key: string]: Scene } = {
    start: {
        text: "You are in a dark forest. You see a path ahead.",
        choices: [
            { 
                text: "Take the path", 
                next: "path",
                addItem: "map" },
            { 
                text: "Stay here",
                next: "stay" }
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

interface Item
{
    name: string;
    type: string;
    amount: number;
}

class Inventory
{
    private items: Item[] = [];

    addItem(name: string): void
    {
        this.items.push({
            name,
            type: "",
            amount: 0
        });
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

