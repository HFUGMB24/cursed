// Choose Character
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

function selectCharacter() {
    let button1 = <HTMLElement>document.getElementById('Character1');
    let button2 = <HTMLElement>document.getElementById('Character2');
    let button3 = <HTMLElement>document.getElementById('Character3');
    let background = document.getElementById("background")!;

    button1.addEventListener('click', function handleClick(_event) {
        chosenCharacter.push(Character1);
        console.log(chosenCharacter[0]);
        const element = <HTMLElement>document.getElementById("Character");
        startScene();
        updateStats();
        console.log(background);
        background.remove();
        element.remove();
    });

    button2.addEventListener('click', function handleClick(_event) {
        console.log(chosenCharacter);
        chosenCharacter.push(Character2);
        const element = <HTMLElement>document.getElementById("Character");
        startScene();
        updateStats();

        background.remove();

        element.remove();
    });

    button3.addEventListener('click', function handleClick(_event) {
        console.log(chosenCharacter);
        chosenCharacter.push(Character3);
        const element = <HTMLElement>document.getElementById("Character");
        startScene();
        updateStats();

        background.remove();

        element.remove();
    });


}

function updateStats() {
    const leftPanel = document.getElementById("stats")!;
    const healthUI = document.getElementById("health-ui")!;


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
        text: "In the scorching desert heat, you see the majestic silhouette of the ancient temple. Your heart beats with excitement as you approach the mysterious entrance. The imposing gate invites you to step inside. With trembling hands, you take the step into the dark vestibule of the temple. Somewhere in these chambers lies one of the most precious treasures of the ancient civilization. A cursed treasure.",
        choices: [
            {
                text: "Enter the temple.",
                next: "entrance_hall",
                addItem: "map"
            },
            {
                text: "Stay here",
                next: "retry"
            }
        ]
    },
    entrance_hall: {
        text: "You find yourself in a huge entrance chamber. Faded symbols are engraved on the old stonewalls. Several paths lead from here deeper into the temple. Which one do you wanne choose.",
        choices: [
            { text: "To your right you see a small passage between two statues of black cats with golden eyes.", next: "cat_passage"},
            { text: "An enormous door decorated with golden hyroglyphes is right infront of you.", next: "pit_room"},
            { text: "As you take a closer look you found another way. A hidden door behind a painting of a scarab.", next: "painting_room"},
        ]
    },
    cat_passage: {
        text: "Entering the mysterious room through the narrow passage between the majestic cat statues, you are greeted by the scent of old books filling the air. As you look around, you discover a variety of ancient scrolls and books.",
        choices: [
            { text: "You can examine one of the papyrus scrolls more closely.", next: "scroll_of_truth", addItem: "Scroll of Truth"},
            { text: "You can search the shelves for a hidden compartment.", next: "healing_potion_1", addItem: "Healing Potion"},
            { text: "You can inspect one of the parchment scrolls more closely.", next: "scroll_of_truth", addItem: "Scroll of Truth"},
        ]
    },
    scroll_of_truth: {
        text: "You find a mysterious scroll. For the last months you studied hyroglyphes and know the effort pays off. The Scroll of Truth explains a short ritual to break the curse. Now you just need to find the treasure, but the door on the other side of the room is locked.",
        choices: [
            { text: "Go back.", next: "entrance_hall" },
            { text: "Try to lockpick the door.", next: "mummy", requiredDEX: 12 },
            { text: "Try to breakt the door.", next: "mummy", requiredSTR: 12 },
        ]
    },
    healing_potion_1: {
        text: "You find a small jar with a red shimmering liquid in it. A healing potion. Just in case you get in a fight and get hurt. Now you just need to find the treasure, but the door on the other side of the room is locked.",
        choices: [
            { text: "Go back.", next: "entrance_hall" },
            { text: "Try to lockpick the door.", next: "mummy", requiredDEX: 12 },
            { text: "Try to breakt the door.", next: "mummy", requiredSTR: 12 },
        ]
    },
    mummy: {
        text: "You enter a room full of sand in which there are three sarcophagi. As you take a closer look you find that one of the sarcophagi is broken. A hand grabs your ankle. As you look down you see a mummy burried in the sand. It seems like it want to tell you something.",
        choices: [
            { text: "Fight the mummy.", next: "treasure_way_hurt", removeHealth: 2, addStatus: "poisoned"},
            { text: "Kill the mummy.", next: "treasure_way", requiredSTR: 12},
            { text: "Talk to the mummy.", next: "treasure_way_hurt", removeHealth: 2, addStatus: "poisoned"},
            { text: "Convince the mummy to help you.", next: "healing_potion_2", requiredWIS: 12, addItem: "Healing Potion"},
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

class Status {
    public status: StatusData[] = [];

    addStatus(name: string): void {
        this.status.push({
            name,
        });
        this.updateStatus();
    }

    removeStatus(name: string): void {
        this.status = this.status.filter(status => status.name !== name);
        this.updateStatus();
    }

    hasStatus(name: string): boolean {
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
            const leftPanel = document.getElementById("status-effect")!;
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
    let healthMax = chosenCharacter[0].HP;

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

        if (choice.requiredItem && inventory.hasItem(choice.requiredItem) || choice.requiredDEX && choice.requiredDEX < chosenCharacter[0].Dex || choice.requiredSTR && choice.requiredSTR < chosenCharacter[0].Str || choice.requiredWIS && choice.requiredWIS < chosenCharacter[0].Wis) {
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
        if (health <= 0) {
            currentScene = "retry";
            chooseScene();
        }
    }
    chooseScene();
}

// Start on Load
document.addEventListener("DOMContentLoaded", () => {
    selectCharacter();
});