// Choose Character
interface Character {
    name: string,
    class: string,
    HP: number,
    Str: number,
    Dex: number,
    Wis: number,
    avatar: string,
}

let Character1 = {
    name: "Wasabi",
    class: "Fighter",
    HP: 5,
    Str: 13,
    Dex: 10,
    Wis: 8,
    avatar: "Rufus_final_no_backround_p.png",
};

let Character2 = {
    name: "Kiri",
    class: "Rogue",
    HP: 4,
    Str: 10,
    Dex: 13,
    Wis: 8,
    avatar: "Mika_final_no_backround_p.png"
};

let Character3 = {
    name: "Hazel",
    class: "Sage",
    HP: 3,
    Str: 8,
    Dex: 10,
    Wis: 13,
    avatar: "maxi_final_no_backround_p.png",
};

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

    const avatar: HTMLElement = <HTMLElement>document.getElementById("avatar")!;
    const portrait: HTMLImageElement = <HTMLImageElement>document.createElement("img");
    portrait.className = "portrait";
    portrait.id = "portrait";
    portrait.src = "img/";
    portrait.src += chosenCharacter[0].avatar;
    avatar.appendChild(portrait);

    const healthUI = document.getElementById("health-ui")!;
    const charHealth = document.createElement("div");
    charHealth.className = "char-stats";
    charHealth.id = "char-health";
    charHealth.innerText = "HP: " + chosenCharacter[0].HP + " / " + chosenCharacter[0].HP;
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
    charWis.innerText = "WIS: " + chosenCharacter[0].Wis;
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
                addItem: "Map"
            },
            {
                text: "Return home.",
                next: "retry"
            }
        ]
    },
    entrance_hall: {
        text: "You find yourself in a huge entrance chamber. Faded symbols are engraved on the old stonewalls. Several paths lead from here deeper into the temple. Which one do you wanne choose.",
        choices: [
            { text: "To your right you see a small passage between two statues of black cats with golden eyes.", next: "cat_passage" },
            { text: "An enormous door decorated with golden hyroglyphes is right infront of you.", next: "stone_door" },
            { text: "To your left you see a rotting wooden door, surrounded by a decorated relief of the nearby river and various wildlife.", next: "scarab_room" },
            { text: "As you take a closer look you found another way. A hidden door behind a painting of a scarab.", next: "urn_room" },
        ]
    },
    urn_room: {
        text: "You enter a richly decorated room, with painted walls. You see four colorful jars sitting on an altar in front of you.",
        choices: [
            { text: "Take the black jar.", next: "take_jar", addItem: "Black Jar" },
            { text: " Take the red jar.", next: "take_jar", addItem: "Healing Potion" },
            { text: "Take the yellow jar.", next: "take_jar", addItem: "Poison Bottle" },
            { text: "Take the green jar.", next: "take_jar", addItem: "Green Jar" },
            { text: "Leave the room.", next: "entrance_hall" }
        ]
    },
    take_jar: {
        text: "As you take the jar small grooves open up beneath the remaining jars. The other jars fall through the opened up holes before the grooves quickly close up again.",
        choices: [
            { text: "Leave the room.", next: "entrance_hall" }
        ]
    },
    cat_passage: { //cat
        text: "Entering the mysterious room through the narrow passage between the majestic cat statues, you are greeted by the scent of old books filling the air. As you look around, you discover a variety of ancient scrolls and books.",
        choices: [
            { text: "You can examine one of the papyrus scrolls more closely.", next: "scroll_of_truth", addItem: "Scroll of Truth" },
            { text: "You can search the shelves for a hidden compartment.", next: "healing_potion_1", addItem: "Healing Potion" },
            { text: "You can inspect one of the parchment scrolls more closely.", next: "scroll_of_truth", addItem: "Scroll of Truth" },
        ]
    },
    scroll_of_truth: { //cat
        text: "You find a mysterious scroll. For the last months you studied hyroglyphes and know the effort pays off. The Scroll of Truth explains a short ritual to break the curse. Now you just need to find the treasure, but the door on the other side of the room is locked.",
        choices: [
            { text: "Go back.", next: "entrance_hall" },
            { text: "Try to lockpick the door.", next: "scroll_of_truth_missingReq", requiredDEX: 12, alternateNext: "mummy" },
            { text: "Try to breakt the door.", next: "scroll_of_truth_missingReq", requiredSTR: 12, alternateNext: "mummy" },
        ]
    },
    scroll_of_truth_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "scroll_of_truth" }
        ]
    },
    healing_potion_1: { //cat
        text: "You find a small jar with a red shimmering liquid in it. A healing potion. Just in case you get in a fight and get hurt. Now you just need to find the treasure, but the door on the other side of the room is locked.",
        choices: [
            { text: "Go back.", next: "entrance_hall" },
            { text: "[DEX] Try to lockpick the door.", next: "healing_potion_1_missingReq", requiredDEX: 12, alternateNext: "mummy" },
            { text: "[STR] Try to breakt the door.", next: "healing_potion_1_missingReq", requiredSTR: 12, alternateNext: "mummy" },
        ]
    },
    healing_potion_1_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "healing_potion_1" }
        ]
    },
    mummy: { //cat
        text: "You enter a room full of sand in which there are three sarcophagi. As you take a closer look you find that one of the sarcophagi is broken. A hand grabs your ankle. As you look down you see a mummy burried in the sand. It seems like it want to tell you something.",
        choices: [
            { text: "Fight the mummy.", next: "treasure_way_hurt", removeHealth: 1, addStatus: "Poisoned" },
            { text: "Kill the mummy.", next: "mummy_missingReq", requiredSTR: 12, alternateNext: "treasure_room" },
            { text: "Talk to the mummy.", next: "treasure_way_hurt", removeHealth: 1, addStatus: "Poisoned" },
            { text: "Convince the mummy to help you.", next: "mummy_missingReq", alternateNext: "healing_potion_2", requiredWIS: 12 },
        ]
    },
    mummy_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "mummy" }
        ]
    },
    healing_potion_2: { //cat
        text: "You find a small jar with a golden shimmering liquid in it. This must be a healing potion.",
        choices: [
            { text: "Go further.", next: "treasure_room", addItem: "Healing Potion" },
        ]
    },
    treasure_way_hurt: { //cat
        text: "The mummy digs it sharp fingernails into your leg. You kick the mummy in the head and try to free yourself. Its grib loosened and you start running. A burning feeling fills your body. You have been poisoned and lose 1 HP.",
        choices: [
            { text: "Take a healing potion.", next: "treasure_room", requiredItem: "Healing Potion", removeItem: "Healing Potion", addHealth: 1 },
            { text: "Keep running.", next: "treasure_room" },
        ]
    },
    stone_door: { //stonedoor
        text: "You enter a circular room with a bottomless pit that stretches from wall to wall. Only a narrow ledge leads to the other side where you can see a doorway.",
        choices: [
            { text: "Stare into the pit and analyze the path.", next: "stone_door_missingReq", requiredWIS: 12, alternateNext: "traverse" },
            { text: "Stare into the pit.", removeHealth: 2, next: "jump" },
            { text: "Jump into the pit.", removeHealth: 2, next: "jump" },
            { text: "Traverse to the other side.", next: "traverse" },
        ]
    },
    stone_door_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "stone_door" }
        ]
    },
    traverse: { //stonedoor
        text: "You enter a room full of dust and old papyrus scrolls. On the other side of the room is a passage that leads deeper into the darkness of the old temple.",
        choices: [
            { text: "Look through the scrolls.", addItem: "Scroll of Freedom", next: "Scroll_of_Freedom" },
            { text: "Go further into the dark passage.", next: "treasure_room" },
        ]
    },
    Scroll_of_Freedom: { //stonedoor
        text: "You find a mysterious scroll. For the last months you studied hyroglyphes and know the effort pays off. The Scroll of Freedom explains a short ritual to break the curse.",
        choices: [
            { text: "Go further into the dark passage.", next: "treasure_room" },
        ]
    },
    jump: {
        text: "As you fall, you realize that there is a spacious room below you that slowly unfolds before your eyes. Upon hitting the ground with a dull thud, a sharp pain shoots through you, inflicting 2 points of damage.",
        choices: [
            { text: "Enter the room.", next: "mysterious_pillar" },
        ]
    },
    mysterious_pillar: { //stonedoor
        text: "The room is illuminated by magically glowing scarab paintings. In its center there is a mysterious pillar engraved with hyroglyphs. You make your way towards the pillar, when suddenly the only door in this room slams behind you and sand starts flowing into the chamber.",
        choices: [
            { text: "Investigate the room.", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    pillar_puzzle: { //stonedoor
        text: "You examine the pillar with the hyropglyphes and realize that they can be pressed. There are five different symbols. The only question is in which order the hyroplyphes have to be presse?.",
        choices: [
            { text: "Eye, Owl, Eagle, Snake, Mouth", next: "wrong_solution" },
            { text: "Snake, Mouth, Eye, Owl, Eagle", next: "wrong_solution" },
            { text: "Owl, Eye, Snake, Mouth, Eagle", next: "right_solution" },
            { text: "Eagle, Snake, Mouth, Eye, Owl", next: "wrong_solution" },
            { text: "Mouth, Eagle, Owl, Snake, Eye", next: "wrong_solution" },
            { text: "Investigate the room.", next: "sand_chamber" },
        ]
    },
    wrong_solution: { //stonedoor
        text: "Slowly, the massive pillar starts descending while sand flows incessantly into the room. The air becomes scarce, you feel time working against you. The sand envelops you gradually, your movements become sluggish, and your breaths shallower, until you ultimately suffocate, and darkness envelops you.",
        choices: [
            { text: "Restart", next: "start", reload: true },
        ]
    },
    right_solution: { //stonedoor
        text: "A creaking sound echoes, the pillar starts descending slowly, and the sand that was flowing stops abruptly. Before your eyes, the pillar transforms into a staircase leading downwards.",
        choices: [
            { text: "Go downstairs", next: "magic_circle" },
        ]
    },
    magic_circle: { //stonedoor
        text: "You descend the stairs and see a long corridor. At the end of the corridor is a steel door that opens into a room. In the center of the room is a magic circle, while a mysterious container rests in one corner.",
        choices: [
            { text: "Try to break open the chest.", next: "magic_circle_missingReq", requiredSTR: 12, alternateNext: "healing_potion_3" },
            { text: "Try to lockpick the chest.", next: "magic_circle_missingReq", requiredDEX: 12, alternateNext: "healing_potion_3" },
            { text: "Investigate the circle.", next: "entrance_hall" },
        ]
    },
    magic_circle_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "magic_circle" }
        ]
    },
    healing_potion_3: { //stonedoor
        text: "You manage to open the chest and find a small vial with a shimmering golden liquid in it. A healing potion.",
        choices: [
            { text: "Investigate the circle.", next: "entrance_hall" },
        ]
    },
    sand_chamber: { //stonedoor
        text: "You search the room and find four vases.",
        choices: [
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
            { text: "Open the first vase.", removeHealth: 1, next: "vase1" },
            { text: "Open the second vase.", addItem: "Note", next: "vase2" },
            { text: "Open the third vase.", next: "vase3" },
            { text: "Open the fourth vase.", removeHealth: 1, next: "vase4" },
        ]
    },
    vase1: { //stonedoor
        text: "You destroy the first vase. Inside was a poisonous sand snake that poisons you. You lose 1 HP.",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    vase2: { //stonedoor
        text: "You shatter the second vase and discover a note within. (Owl, Eye, Snake, Mouth, Eagle).",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    vase3: { //stonedoor
        text: "You destroy the third vase, but there is nothing inside.",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    vase4: { //stonedoor
        text: "You destroy the fourth vase. In doing so, you accidentally break a container, creating a poisonous gas cloud. You loose 1 HP.",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    treasure_room: {
        text: "You follow the dark hallway. It leads you deeper into the ancient temple. You make your way to the treasure room but find it guarded by a huge monster.",
        choices: [
            { text: "Try to sneak past the monster.", next: "treasure_room_missingReq", alternateNext: "treasure", requiredDEX: 12 },
            { text: "Try to talk to the monster.", next: "treasure_hurt_2", removeHealth: 2 },
            { text: "Fight the monster.", next: "treasure_hurt_1", removeHealth: 1 },
        ]
    },
    treasure_room_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "treasure_room" }
        ]
    },
    treasure_hurt_2: {
        text: "The moment you open your mouth the monster lashes out at you with its claws. A sharp pain rushes through your shoulder.",
        choices: [
            { text: "Try to sneak past the monster.", next: "treasure_hurt_2_missingReq", alternateNext: "cursed_treasure", requiredDEX: 12 },
            { text: "Take a healing potion.", next: "treasure_hurt_2_missingReq", alternateNext: "treasure_room", requiredItem: "Healing Potion", removeItem: "Healing Potion", addHealth: 1 },
            { text: "Fight the monster.", next: "treasure_hurt_1", removeHealth: 1 },
        ]
    },
    treasure_hurt_2_missingReq: {
        text: "You are missing the required item or attributes.",
        choices: [
            { text: "Continue.", next: "treasure_hurt_2" }
        ]
    },
    treasure_hurt_1: {
        text: "The monster lashes out at you with its claws. You duck away and only one of the claws scratches over your arm.",
        choices: [
            { text: "Try to sneak past the monster.", next: "treasure_hurt_1_missingReq", alternateNext: "cursed_treasure", requiredDEX: 12 },
            { text: "Take a healing potion.", next: "treasure_hurt_1_missingReq", alternateNext: "cursed_treasure", requiredItem: "Healing Potion", removeItem: "Healing Potion", addHealth: 1 },
            { text: "Continue to fight the monster.", next: "cursed_treasure" },
        ]
    },
    treasure_hurt_1_missingReq: {
        text: "You are missing the required item or attributes.",
        choices: [
            { text: "Continue.", next: "treasure_hurt_1" }
        ]
    },
    cursed_treasure: {
        text: "You look around and see a sharp looking stone laying on the ground. That is the weapon you needed. You let yourself drop to the ground, roll to the side and grab the stone. You aim at the monsters head and throw the stone with all of your strength. The beast collapses with a scream. You enter the last chamber and nearly stumble over a pile of old papyrus scrolls. The floor is covered in gold tokens and on the wall across the room you see a khopesh sword.",
        choices: [
            { text: "Take the treasure.", next: "cursed_end" },
            { text: "Use the Scroll of Truth to reveal the curse and break it.", next: "cursed_treasure_missingReq", requiredItem: "Scroll of Truth", removeItem: "Scroll of Truth", alternateNext: "happy_end" },
        ]
    },
    cursed_treasure_missingReq: {
        text: "You are missing the required item or attributes.",
        choices: [
            { text: "Continue.", next: "cursed_treasure" }
        ]
    },
    cursed_end: {
        text: " You don't want to wait any longer. It took you long enough to find this place and you defeated the guardian. The treasure is now yours.",
        choices: [
            { text: "Take the gold.", next: "cursed_end_missingReq", requiredDEX: 12, alternateNext: "new_guard" },
            { text: "Take the papyrus scrolls.", next: "cursed_end_missingReq", requiredWIS: 12, alternateNext: "new_guard" },
            { text: "Take the khopesh sword.", next: "cursed_end_missingReq", requiredSTR: 12, alternateNext: "new_guard" },
        ]
    },
    cursed_end_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "cursed_end" }
        ]
    },
    new_guard: {
        text: "Your fingertips touch the treasure you've been looking for so long. A smile sreads across your face as suddenly a strange feeling shakes your body. For a brief moment you loose your orientation. You close you eyes, take a deep breath and open them again. The ground seems further away than usual and you're pretty sure that you didn't have claws before. But you know those golden claws. Now you are the guardian of the treasure.",
        choices: [
            { text: "Try again.", next: "retry" },
        ]
    },
    happy_end: {
        text: "You take the Scroll you found and start to read the hyroglyphes out loud. Your heart beats faster as a golden glow begins to fill the room. Shimmering symbols appear in the air around you and vanishing in little blue flashes as you continue reading. The moment you reach the end of the text, all the symbols have disappeared and the glow ends. Carefully you pick up the treasure you've been looking for so long. It's easy to find your way out with your good sense of direction. This treasure will change your life for the better.",
        choices: [
            { text: "Leave the temple.", next: "win" },
        ]
    },
    scarab_room: {
        text: "You enter a hallway with two indentations. Each contains a pedestal. On the left pedestal sits a bronze Cage with a silver scarab trapped inside. On the Right pedestal sits a wooden bowl filled with small amounts of coins and small stone statuettes.",
        choices: [
            { text: "[WIS] Make a small offering.", next: "scarab_room_missingReq", alternateNext: "scarab_make_offering", requiredWIS: 12, addStatus: "Blessed" },
            { text: "Free the scarab.", next: "scarab_free" },
            { text: "Take the coins.", next: "scarab_take_coin", addItem: "Coins" },
            { text: "Take the stone statuette.", next: "scarab_statuette", addItem: "Stone Statuette" },
            { text: "Continue through the hallway.", next: "beast_room" }
        ]
    },
    scarab_room_missingReq: {
        text: "You are missing the required attributes.",
        choices: [
            { text: "Continue.", next: "scarab_room" }
        ]
    },
    scarab_make_offering: {
        text: "You leave a small offering in the wooden bowl. You feel blessed.",
        choices: [
            { text: "Free the scarab.", next: "scarab_free" },
            { text: "Continue through the hallway.", next: "beast_room" }
        ]
    },
    scarab_take_coin: {
        text: "You Gather a handful of coins and feel the slightest sense of guilt settle in you.",
        choices: [
            { text: "Continue.", next: "scarab_room" },
        ]
    },
    scarab_statuette: {
        text: "You take a finely crafted stone statutette of a pregnant woman. The slightest sense of guilt settle in you.",
        choices: [
            { text: "Continue.", next: "scarab_room" },
        ]
    },
    scarab_free: {
        text: "You release the scarab from its captivity. It runs happily in a circle before it takes off across the room. It squeezes through a small gap in the wall behind the offering altar, revealing a hidden door.",
        choices: [
            { text: "Go through the secret door", next: "mummy" },
            { text: "Continue through the hallway.", next: "beast_room" },
        ]
    },
    beast_room: {
        text: "You enter a new room and encounter an injured beast. The path is blocked by rubble but you notice a hole in the wall.",
        choices: [
            { text: "[Healing Potion] Aproach the beast and heal it.", next: "beast_room_missingReq", alternateNext: "beast_room_help", removeItem: "Healing Potion" },
            { text: "Leave the beast alone and explore the room.", next: "beast_room_artifact", addItem: "Ring of Strength" },
            { text: "Slay the beast.", next: "beast_room_death" },
        ]
    },
    beast_room_missingReq: {
        text: "You are missing the required items or attributes.",
        choices: [
            { text: "Continue.", next: "beast_room" }
        ]
    },
    beast_room_death: {
        text: "The beast dies painfully screaming and rolling around. You can't reach the hole in the wall and have to dig through the rubble.",
        choices: [
            { text: "Use your weapon to dig.", next: "beast_room_dig_weapon", addStatus: "Broken Weapon" },
            { text: "Use your hands to dig.", next: "beast_room_dig_hand", removeHealth: 1},
        ]
    },
    beast_room_dig_weapon: {
        text: "Your weapon gets damaged in the process of digging through the rubble.",
        choices: [
            { text: "Continue.", next: "traverse" },
        ]
    },
    beast_room_dig_hand: {
        text: "You get injured while digging through the rubble. You take 1 damage.",
        choices: [
            { text: "Continue.", next: "traverse" },
        ]
    },
    beast_room_artifact: {
        text: "You explore the room and find a ruby ring in a pile of broken clay shards.",
        choices: [
            { text: "[Healing Potion] Aproach the beast and heal it.", next: "beast_room_a_missingReq", alternateNext: "beast_room_help", requiredItem: "Healing Potion", removeItem: "Healing Potion" },
            { text: "Explore the hole in the wall.", next: "beast_room_hole" },
            { text: "Slay the beast.", next: "beast_room_death" },
        ]
    },
    beast_room_a_missingReq: {
        text: "You are missing the required items or attributes.",
        choices: [
            { text: "Continue.", next: "beast_room_artifact" }
        ]
    },
    beast_room_hole: {
        text: "You sneak past the beast. You can't reach the hole in the wall and have to dig through the rubble.",
        choices: [
            { text: "Use your weapon to dig.", next: "beast_room_dig_weapon", addStatus: "Broken Weapon" },
            { text: "Use your hands to dig.", next: "beast_room_dig_hand", removeHealth: 1},
        ]
    },
    beast_room_help: {
        text: "The beast is thankful for your help and carries you to the hole in the wall.",
        choices: [
            { text: "Continue.", next: "traverse" },
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
            { text: "Try again.", next: "start", reload: true }
        ]
    },
    win: {
        text: "Thank you for playing.",
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
    let health = chosenCharacter[0].HP;
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
            updateHealth();
        }
        if (choice.removeHealth) {
            health = Math.max(health - choice.removeHealth, 0);
            updateHealth();
        }

        if (choice.reload) {
            location.reload();
            return;
        }

        if (health > 0) {
            const scene = sceneData[currentScene];
            scene.choices = scene.choices.filter(c => c !== choice);

            if (choice.requiredItem && inventory.hasItem(choice.requiredItem) || choice.requiredDEX && choice.requiredDEX < chosenCharacter[0].Dex || choice.requiredSTR && choice.requiredSTR < chosenCharacter[0].Str || choice.requiredWIS && choice.requiredWIS < chosenCharacter[0].Wis) {
                currentScene = choice.alternateNext!;
            } else {
                currentScene = choice.next;
            }
            chooseScene();
            console.log(currentScene);
        }
    }

    function updateHealth() {
        const healthUI = document.getElementById("health-ui")!;
        const charHealth = document.getElementById("char-health")!;
        if (healthUI) {
            charHealth.innerText = "HP: " + health + " / " + chosenCharacter[0].HP;
        }
        if (health < 1) {
            currentScene = "end";
            console.log(health);
            console.log(currentScene);
            chooseScene();
            console.log(currentScene);
        }
    }
    chooseScene();
    console.log(currentScene);
}


// Start on Load
document.addEventListener("DOMContentLoaded", () => {
    selectCharacter();
});

// IGNORE THIS!! 
// IGNORE THIS!!
// IGNORE THIS!! 
// IGNORE THIS!! 
// IGNORE THIS!! 
// IGNORE THIS!! 
// IGNORE THIS!! 
// IGNORE THIS!! 
// IGNORE THIS!! 
// IGNORE THIS!! 
// IGNORE THIS!! 
const createSVG = (width: any, height: any, radius: any) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const rectangle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    svg.setAttributeNS(
        "http://www.w3.org/2000/svg",
        "viewBox",
        `0 0 ${width} ${height}`
    );

    rectangle.setAttribute("x", "0");
    rectangle.setAttribute("y", "0");
    rectangle.setAttribute("width", "100%");
    rectangle.setAttribute("height", "100%");
    rectangle.setAttribute("rx", `${radius}`);
    rectangle.setAttribute("ry", `${radius}`);
    rectangle.setAttribute("pathLength", "10");

    svg.appendChild(rectangle);

    return svg;
};

document.querySelectorAll(".CharacterButton").forEach((button) => {
    const htmlButton = button as HTMLElement;
    const style = getComputedStyle(htmlButton);

    const lines = document.createElement("div");

    lines.classList.add("lines");

    const groupTop = document.createElement("div");
    const groupBottom = document.createElement("div");

    const svg = createSVG(
        htmlButton.offsetWidth,
        htmlButton.offsetHeight,
        parseInt(style.borderRadius, 10)
    );

    groupTop.appendChild(svg);
    groupTop.appendChild(svg.cloneNode(true));
    groupTop.appendChild(svg.cloneNode(true));
    groupTop.appendChild(svg.cloneNode(true));

    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));

    lines.appendChild(groupTop);
    lines.appendChild(groupBottom);

    button.appendChild(lines);

    button.addEventListener("pointerenter", () => {
        button.classList.add("start");
    });

    svg.addEventListener("animationend", () => {
        button.classList.remove("start");
    });
});