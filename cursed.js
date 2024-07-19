"use strict";
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
let chosenCharacter = [];
// ==========================================================================
// Character Selection
// ==========================================================================
function selectCharacter() {
    let button1 = document.getElementById('Character1');
    let button2 = document.getElementById('Character2');
    let button3 = document.getElementById('Character3');
    let background = document.getElementById("background");
    button1.addEventListener('click', function handleClick(_event) {
        chosenCharacter.push(Character1);
        const element = document.getElementById("Character");
        startScene();
        updateStats();
        background.remove();
        element.remove();
    });
    button2.addEventListener('click', function handleClick(_event) {
        chosenCharacter.push(Character2);
        const element = document.getElementById("Character");
        startScene();
        updateStats();
        background.remove();
        element.remove();
    });
    button3.addEventListener('click', function handleClick(_event) {
        chosenCharacter.push(Character3);
        const element = document.getElementById("Character");
        startScene();
        updateStats();
        background.remove();
        element.remove();
    });
}
function updateStats() {
    const leftPanel = document.getElementById("stats");
    const avatar = document.getElementById("avatar");
    const portrait = document.createElement("img");
    portrait.className = "portrait";
    portrait.id = "portrait";
    portrait.src = "img/";
    portrait.src += chosenCharacter[0].avatar;
    avatar.appendChild(portrait);
    const healthUI = document.getElementById("health-ui");
    const charHealth = document.createElement("div");
    charHealth.className = "char-stats";
    charHealth.id = "char-health";
    charHealth.innerText = "HP: " + chosenCharacter[0].HP + " / " + chosenCharacter[0].HP;
    healthUI.appendChild(charHealth);
    const charName = document.createElement("div");
    charName.className = "char-stats";
    charName.id = "name";
    charName.innerText = chosenCharacter[0].name;
    leftPanel.appendChild(charName);
    const charClass = document.createElement("div");
    charClass.className = "char-stats";
    charClass.id = "class";
    charClass.innerText = chosenCharacter[0].class;
    leftPanel.appendChild(charClass);
    const charStr = document.createElement("div");
    charStr.className = "char-stats";
    charStr.id = "str";
    charStr.innerText = "STR: " + chosenCharacter[0].Str;
    leftPanel.appendChild(charStr);
    const charDex = document.createElement("div");
    charDex.className = "char-stats";
    charDex.id = "dex";
    charDex.innerText = "DEX: " + chosenCharacter[0].Dex;
    leftPanel.appendChild(charDex);
    const charWis = document.createElement("div");
    charWis.className = "char-stats";
    charWis.id = "wis";
    charWis.innerText = "WIS: " + chosenCharacter[0].Wis;
    leftPanel.appendChild(charWis);
}
// ==========================================================================
// Scene Data
// ==========================================================================
const sceneData = {
    start: {
        text: "In the scorching desert heat, you see the majestic silhouette of the ancient temple. Your heart beats with excitement as you approach the entrance. The imposing gate invites you to step inside. With trembling hands, you take the step into the dark vestibule of the temple. Somewhere in these chambers lie valuable treasures yet to be uncovered.",
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
        text: "You find yourself in a huge entrance chamber. Faded symbols are engraved on the old limestone walls. At a quick glance you see three paths which lead deeper into the temple.",
        choices: [
            { text: "To your right you see a small passage between two statues of black cats with golden eyes.", next: "cat_passage" },
            { text: "Right across the entrance you see an enormous door decorated with golden hieroglyphs.", next: "stone_door" },
            { text: "To your left you see a rotten wooden door, surrounded by a decorated relief of the nearby landscape and various wildlife.", next: "scarab_room" },
            { text: "As you take a closer look you find another way. A hidden door behind a painting of a scarab.", next: "urn_room", random: 50 },
        ]
    },
    urn_room: {
        text: "You enter a richly decorated room with painted walls. You see four colorful jars sitting on an altar in front of you.",
        choices: [
            { text: "Take the black jar.", next: "take_jar", addItem: "Black Jar" },
            { text: "Take the red jar.", next: "take_jar", addItem: "Healing Potion" },
            { text: "Take the yellow jar.", next: "take_jar", addItem: "Yellow Jar" },
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
    cat_passage: {
        text: "You squeeze through the narrow passage between the majestic cat statue. Entering the room you are greeted by the scent of old books filling the air. Old shelves line the walls. As you look around you discover a variety of dusty papyrus scrolls and books.",
        choices: [
            { text: "Examine one of the scrolls.", next: "scroll_of_truth", addItem: "Scroll of Truth" },
            { text: "Inspect one of the parchments.", next: "scroll_of_truth", addItem: "Scroll of Truth" },
            { text: "Search the shelves for a hidden compartment.", next: "healing_potion_1", addItem: "Healing Potion", random: 30 },
        ]
    },
    scroll_of_truth: {
        text: "You find a mysterious scroll. For the last months you studied hieroglyphs and now you know the effort paid off. The Scroll of Truth explains a short ritual to break the curse cast on the treasure. Now you just need to find the treasure, but the door on the other side of the room is locked.",
        choices: [
            { text: "Go back.", next: "entrance_hall" },
            { text: "[DEX] Lockpick the door.", next: "mummy", requiredDEX: 12 },
            { text: "[STR] Break the door.", next: "mummy", requiredSTR: 12 },
        ]
    },
    healing_potion_1: {
        text: "You find a small jar with a red shimmering liquid in it. A healing potion. Just in case you get in a fight and get hurt. Now you just need to find the treasure, but the door on the other side of the room is locked.",
        choices: [
            { text: "Go back.", next: "entrance_hall" },
            { text: "[DEX] Lockpick the door.", next: "mummy", requiredDEX: 12 },
            { text: "[STR] Break the door.", next: "mummy", requiredSTR: 12 },
        ]
    },
    mummy: {
        text: "You enter a room filled with a layer of sand. Three sarcophagi rest on the far wall. As you take a closer look you find that one of the sarcophagi is broken. Suddenly a hand grabs your ankle. As you look down you see a mummy burried in the sand. Only its arm and head poking out. It seems like it want to tell you something.",
        choices: [
            { text: "Attack the mummy.", next: "mummy_attack", removeHealth: 1, addStatus: "Poisoned" },
            { text: "Talk to the mummy.", next: "mummy_talk" },
            { text: "[STR] Slay the mummy.", next: "treasure_room", requiredSTR: 12 },
            { text: "[Dex] Escape its grasp.", next: "treasure_room", requiredDEX: 12 },
        ]
    },
    mummy_talk: {
        text: '"Thi... th-thirsty..."',
        choices: [
            { text: "Give it the black jar.", next: "mummy_talk_good", requiredItem: "Black Jar", removeItem: "Black Jar" },
            { text: "Give it the yellow jar.", next: "mummy_talk_bad", requiredItem: "Yellow Jar", removeItem: "Yellow Jar" },
            { text: "Give it the green jar.", next: "mummy_talk_bad", requiredItem: "Green Jar", removeItem: "Green Jar" },
            { text: "Give it a healing potion.", next: "mummy_talk_good", requiredItem: "Healing Potion", removeItem: "Healing Potion" },
            { text: "Ignore the mummy.", next: "mummy" },
        ]
    },
    mummy_talk_good: {
        text: '"Cur... cu... urse.. c..  *cough* *cough* I regret going on the excursion. Thank you for the good stuff."',
        choices: [
            { text: "Ask it about the treasure.", next: "mummy_hint", addItem: "Ring of Dexterity" },
            { text: "Search the room.", next: "healing_potion_2b" },
            { text: "Continue onward.", next: "treasure_room" },
        ]
    },
    mummy_hint: {
        text: '"The treasure is guarded by the guardian. As long as the curse remains you will not escape it. You can have this ring, but it alone will not safe you from your fate." You obtain a Ring of Dexterity.',
        choices: [
            { text: "Continue.", next: "mummy_talk_good" },
        ]
    },
    mummy_talk_bad: {
        text: '"Cur... cu... urse.. c..  *cough* *cough* I curse you! You fool!"',
        choices: [
            { text: "Attack the mummy.", next: "mummy_attack", removeHealth: 1, addStatus: "Poisoned" },
            { text: "[STR] Slay the mummy.", next: "treasure_room", requiredSTR: 12 },
            { text: "[Dex] Escape its grasp.", next: "healing_potion_2", requiredDEX: 12 },
        ]
    },
    healing_potion_2: {
        text: "You find a small jar with a red shimmering liquid in it. This must be a healing potion.",
        choices: [
            { text: "Continue.", next: "treasure_room", addItem: "Healing Potion" },
        ]
    },
    healing_potion_2b: {
        text: "You find a small jar with a red shimmering liquid in it. This must be a healing potion.",
        choices: [
            { text: "Continue.", next: "mummy_talk_good", addItem: "Healing Potion" },
        ]
    },
    mummy_attack: {
        text: "The mummy digs its sharp claws into your leg. You lose 1 HP. You kick it in the head and free yourself. Its grip loosened, but a burning sensation flows through your body. You have been poisoned.",
        choices: [
            { text: "[Healing Potion] Take a healing potion.", next: "treasure_room", requiredItem: "Healing Potion", removeItem: "Healing Potion", addHealth: 1 },
            { text: "Attack the mummy again.", next: "mummy_attack_2" },
            { text: "Run away.", next: "treasure_room" },
        ]
    },
    mummy_attack_2: {
        text: "You fight off the mummy and finally free yourself from its clutches. You're not done yet. You strike at it until it's dried body is reduced to dust and tattered pieces of cloth.",
        choices: [
            { text: "Search the room.", next: "healing_potion_2" },
            { text: "Continue.", next: "treasure_room" },
        ]
    },
    stone_door: {
        text: "You enter a circular room with a bottomless pit that stretches from wall to wall. Only a narrow ledge leads to the other side where you can see a doorway.",
        choices: [
            { text: "[WIS] Stare into the pit and analyze the path.", next: "traverse", requiredWIS: 12 },
            { text: "Stare into the pit.", removeHealth: 2, next: "jump" },
            { text: "Jump into the pit.", removeHealth: 2, next: "jump" },
            { text: "Traverse to the other side.", next: "traverse" },
        ]
    },
    traverse: {
        text: "You enter a room full of dust and old papyrus scrolls. On the other side of the room is a passage that leads deeper into the darkness of the old temple.",
        choices: [
            { text: "Look through the scrolls.", addItem: "Scroll of Freedom", next: "Scroll_of_Freedom" },
            { text: "Go further into the dark passage.", next: "treasure_room" },
        ]
    },
    Scroll_of_Freedom: {
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
    mysterious_pillar: {
        text: "The room is illuminated by magically glowing scarab paintings. In its center there is a mysterious pillar engraved with hyroglyphs. You make your way towards the pillar, when suddenly the only door in this room slams behind you and sand starts flowing into the chamber.",
        choices: [
            { text: "Investigate the room.", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    pillar_puzzle: {
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
    wrong_solution: {
        text: "Slowly, the massive pillar starts descending while sand flows incessantly into the room. The air becomes scarce, you feel time working against you. The sand envelops you gradually, your movements become sluggish, and your breaths shallower, until you ultimately suffocate, and darkness envelops you.",
        choices: [
            { text: "Restart", next: "start", reload: true },
        ]
    },
    right_solution: {
        text: "A creaking sound echoes, the pillar starts descending slowly, and the sand that was flowing stops abruptly. Before your eyes, the pillar transforms into a staircase leading downwards.",
        choices: [
            { text: "Go downstairs", next: "magic_circle" },
        ]
    },
    magic_circle: {
        text: "You descend the stairs and see a long corridor. At the end of the corridor is a steel door that opens into a room. In the center of the room is a magic circle, while a mysterious container rests in one corner.",
        choices: [
            { text: "[STR] Try to break open the chest.", next: "healing_potion_3", requiredSTR: 12 },
            { text: "[DEX] Try to lockpick the chest.", next: "healing_potion_3", requiredDEX: 12 },
            { text: "Investigate the circle.", next: "entrance_hall" },
        ]
    },
    healing_potion_3: {
        text: "You manage to open the chest and find a small vial with a shimmering red liquid in it. A healing potion.",
        choices: [
            { text: "Investigate the circle.", next: "entrance_hall" },
        ]
    },
    sand_chamber: {
        text: "You search the room and find four vases.",
        choices: [
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
            { text: "Open the first vase.", removeHealth: 1, next: "vase1" },
            { text: "Open the second vase.", addItem: "Note", next: "vase2" },
            { text: "Open the third vase.", next: "vase3" },
            { text: "Open the fourth vase.", removeHealth: 1, next: "vase4" },
        ]
    },
    vase1: {
        text: "You destroy the first vase. Inside was a poisonous sand snake that poisons you. You lose 1 HP.",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    vase2: {
        text: "You shatter the second vase and discover a note within. (Owl, Eye, Snake, Mouth, Eagle).",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    vase3: {
        text: "You destroy the third vase, but there is nothing inside.",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    vase4: {
        text: "You destroy the fourth vase. In doing so, you accidentally break a container, creating a poisonous gas cloud. You loose 1 HP.",
        choices: [
            { text: "Continue your investigation", next: "sand_chamber" },
            { text: "Examine the mysterious pillar.", next: "pillar_puzzle" },
        ]
    },
    treasure_room: {
        text: "You follow the dark hallway. It leads you deeper into the ancient temple. You make your way to the treasure room but find it guarded by a huge monster.",
        choices: [
            { text: "[DEX] Try to sneak past the monster.", next: "cursed_treasure", requiredDEX: 12 },
            { text: "Try to talk to the monster.", next: "treasure_hurt_2", removeHealth: 2 },
            { text: "Fight the monster.", next: "treasure_hurt_1", removeHealth: 1 },
        ]
    },
    treasure_hurt_2: {
        text: "The moment you open your mouth the monster lashes out at you with its claws. A sharp pain rushes through your shoulder.",
        choices: [
            { text: "[DEX] Try to sneak past the monster.", next: "cursed_treasure", requiredDEX: 12 },
            { text: "[Healing Potion] Take a healing potion.", next: "treasure_room", requiredItem: "Healing Potion", removeItem: "Healing Potion", addHealth: 1 },
            { text: "Fight the monster.", next: "treasure_hurt_1", removeHealth: 1 },
        ]
    },
    treasure_hurt_1: {
        text: "The monster lashes out at you with its claws. You duck away and only one of the claws scratches over your arm.",
        choices: [
            { text: "[Dex] Try to sneak past the monster.", next: "cursed_treasure", requiredDEX: 12 },
            { text: "[Healing Potion] Take a healing potion.", next: "cursed_treasure", requiredItem: "Healing Potion", removeItem: "Healing Potion", addHealth: 1 },
            { text: "Continue to fight the monster.", next: "cursed_treasure" },
        ]
    },
    cursed_treasure: {
        text: "You look around and see a sharp looking stone laying on the ground. That is the weapon you needed. You let yourself drop to the ground, roll to the side and grab the stone. You aim at the monsters head and throw the stone with all of your strength. The beast collapses with a scream. You enter the last chamber and nearly stumble over a pile of old papyrus scrolls. The floor is covered in gold tokens and on the wall across the room you see a khopesh sword.",
        choices: [
            { text: "Take the treasure.", next: "cursed_end" },
            { text: "[Scroll of Truth] Use the Scroll of Truth to reveal the curse and break it.", next: "happy_end", requiredItem: "Scroll of Truth", removeItem: "Scroll of Truth" },
            { text: "[Scroll of Freedom] Use the Scroll of Freedom to reveal the curse and break it.", next: "happy_end", requiredItem: "Scroll of Freedom", removeItem: "Scroll of Freedom" },
        ]
    },
    cursed_end: {
        text: " You don't want to wait any longer. It took you long enough to find this place and you defeated the guardian. The treasure is now yours.",
        choices: [
            { text: "[DEX] Take the gold.", next: "new_guard", requiredDEX: 12 },
            { text: "[WIS] Take the papyrus scrolls.", next: "new_guard", requiredWIS: 12 },
            { text: "[STR] Take the khopesh sword.", next: "new_guard", requiredSTR: 12 },
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
            { text: "[WIS] Make a small offering.", next: "scarab_make_offering", requiredWIS: 12, addStatus: "Blessed" },
            { text: "Free the scarab.", next: "scarab_free" },
            { text: "Take the coins.", next: "scarab_take_coin", addItem: "Coins" },
            { text: "Take the stone statuette.", next: "scarab_statuette", addItem: "Stone Statuette" },
            { text: "Continue through the hallway.", next: "beast_room" }
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
        text: "You Gather a handful of coins and feel the slightest sense of guilt settles in you.",
        choices: [
            { text: "Continue.", next: "scarab_room" },
        ]
    },
    scarab_statuette: {
        text: "You take a finely crafted stone statutette of a pregnant woman. The slightest sense of guilt settles in you.",
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
        text: "You enter a dimly lit room with cracked walls. Broken slabs of limestone are scattered around the room, and in the center you see an injured lion. Across the room you see a hole in the wall blocked by rubble.",
        choices: [
            { text: "[Healing Potion] Aproach the beast and heal it.", next: "beast_room_help", requiredItem: "Healing Potion", removeItem: "Healing Potion" },
            { text: "Leave the beast alone and explore the room.", next: "beast_room_artifact", addItem: "Ring of Strength" },
            { text: "Slay the beast.", next: "beast_room_death" },
        ]
    },
    beast_room_death: {
        text: "You swiftly slay the injured beast. It lets out a pained scream as it rolls to the ground. Rubble is still blocking your way through the hole in the wall.",
        choices: [
            { text: "Use your weapon to dig.", next: "beast_room_dig_weapon", addStatus: "Broken Weapon" },
            { text: "Use your hands to dig.", next: "beast_room_dig_hand", removeHealth: 1 },
        ]
    },
    beast_room_dig_weapon: {
        text: "You use your weapon to shovel the rubble out of your way. You make quick work of it, but your weapon gets damaged in the process.",
        choices: [
            { text: "Continue.", next: "traverse" },
        ]
    },
    beast_room_dig_hand: {
        text: "Your clear the rubble stone by stone. As you get close to the end you cut yourself on the edge of a broken vase. You take 1 damage.",
        choices: [
            { text: "Continue.", next: "traverse" },
        ]
    },
    beast_room_artifact: {
        text: "You explore the room and find a ruby ring in a pile of broken clay shards. You obtain a Ring of Strength.",
        choices: [
            { text: "[Healing Potion] Aproach the beast and heal it.", next: "beast_room_help", requiredItem: "Healing Potion", removeItem: "Healing Potion" },
            { text: "Sneak past the beast.", next: "beast_room_hole" },
            { text: "Slay the beast.", next: "beast_room_death" },
        ]
    },
    beast_room_hole: {
        text: "You successfully sneak past the beast. Rubble is still blocking your way through the hole in the wall.",
        choices: [
            { text: "Use your weapon to dig.", next: "beast_room_dig_weapon", addStatus: "Broken Weapon" },
            { text: "Use your hands to dig.", next: "beast_room_dig_hand", removeHealth: 1 },
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
            { text: "Restart.", next: "start", reload: true }
        ]
    }
};
class Inventory {
    constructor() {
        this.items = [];
        this.health = chosenCharacter[0].HP;
        this.healthMax = chosenCharacter[0].HP;
    }
    addItem(name) {
        this.items.push({
            name,
        });
        if (name === "Ring of Strength") {
            if (chosenCharacter[0].Str <= 12) {
                chosenCharacter[0].Str = 13;
                const charStr = document.getElementById("str");
                charStr.innerText = "STR: " + chosenCharacter[0].Str;
            }
            else {
                chosenCharacter[0].Str += 1;
                const charStr = document.getElementById("str");
                charStr.innerText = "STR: " + chosenCharacter[0].Str;
            }
        }
        if (name === "Ring of Dexterity") {
            if (chosenCharacter[0].Dex <= 12) {
                chosenCharacter[0].Dex = 13;
                const charDex = document.getElementById("dex");
                charDex.innerText = "DEX: " + chosenCharacter[0].Dex;
            }
            else {
                chosenCharacter[0].Dex += 1;
                const charDex = document.getElementById("dex");
                charDex.innerText = "DEX: " + chosenCharacter[0].Dex;
            }
        }
        if (name === "Healing Potion") {
            let i = 0;
            const consumable = document.createElement("div");
            const rightPanel = document.getElementById("inventory");
            consumable.addEventListener("click", () => this.useItems(name));
            consumable.className = "consumable";
            consumable.id = "healing-potion" + i;
            consumable.innerText = "Healing Potion";
            rightPanel.appendChild(consumable);
            i++;
        }
        else {
            const itemUI = document.createElement("div");
            const rightPanel = document.getElementById("inventory");
            itemUI.className = "item";
            itemUI.innerText = this.items[this.items.length - 1].name;
            rightPanel.appendChild(itemUI);
        }
    }
    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
    }
    hasItem(name) {
        return this.items.some(item => item.name == name);
    }
    useItems(name) {
        if (name === "Healing Potion") {
            let i = 0;
            const rightPanel = document.getElementById("inventory");
            const consumable = document.getElementById("healing-potion" + i);
            this.health = Math.min(this.health + 1, this.healthMax);
            this.items = this.items.filter(item => item.name !== name);
            rightPanel.removeChild(consumable);
            this.updateHealth();
        }
    }
    updateHealth() {
        const healthUI = document.getElementById("health-ui");
        const charHealth = document.getElementById("char-health");
        if (healthUI) {
            charHealth.innerText = "HP: " + this.health + " / " + chosenCharacter[0].HP;
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
        if (name === "Blessed") {
            chosenCharacter[0].Str += 1;
            chosenCharacter[0].Dex += 1;
            chosenCharacter[0].Wis += 1;
            const charStr = document.getElementById("str");
            const charDex = document.getElementById("dex");
            const charWis = document.getElementById("wis");
            charStr.innerText = "STR: " + chosenCharacter[0].Str;
            charDex.innerText = "DEX: " + chosenCharacter[0].Dex;
            charWis.innerText = "WIS: " + chosenCharacter[0].Wis;
        }
        if (name === "Broken Weapon") {
            chosenCharacter[0].Str -= 1;
            const charStr = document.getElementById("str");
            charStr.innerText = "STR: " + chosenCharacter[0].Str;
        }
        if (name === "Poisoned") {
            chosenCharacter[0].Str -= 1;
            chosenCharacter[0].Dex -= 1;
            chosenCharacter[0].Wis -= 1;
            const charStr = document.getElementById("str");
            const charDex = document.getElementById("dex");
            const charWis = document.getElementById("wis");
            charStr.innerText = "STR: " + chosenCharacter[0].Str;
            charDex.innerText = "DEX: " + chosenCharacter[0].Dex;
            charWis.innerText = "WIS: " + chosenCharacter[0].Wis;
        }
        if (name === "Cursed") {
            if (this.status.some(status => status.name === "Blessed") === true) {
                this.status = this.status.filter(status => status.name !== "Blessed");
                this.updateStatus();
            }
            else {
                chosenCharacter[0].Str -= 2;
                chosenCharacter[0].Dex -= 2;
                const charStr = document.getElementById("str");
                const charDex = document.getElementById("dex");
                charStr.innerText = "STR: " + chosenCharacter[0].Str;
                charDex.innerText = "DEX: " + chosenCharacter[0].Dex;
            }
        }
        this.updateStatus();
    }
    removeStatus(name) {
        this.status = this.status.filter(status => status.name !== name);
        this.updateStatus();
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
        }
    }
}
// ==========================================================================
// Scene Manager
// ==========================================================================
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
                // Required Item or Stat
                if (choice.requiredItem && inventory.hasItem(choice.requiredItem) === false || choice.requiredDEX && choice.requiredDEX > chosenCharacter[0].Dex || choice.requiredSTR && choice.requiredSTR > chosenCharacter[0].Str || choice.requiredWIS && choice.requiredWIS > chosenCharacter[0].Wis) {
                    button.style.color = "#222";
                    button.style.backgroundColor = "#555";
                    button.removeEventListener;
                }
                // Randomized Event
                else if (choice.random) {
                    var roll = Math.ceil(Math.random() * 100);
                    console.log(roll);
                    if (roll < choice.random) {
                        button.style.color = "#222";
                        button.style.backgroundColor = "#555";
                        button.removeEventListener;
                    }
                    else {
                        button.addEventListener("click", () => handleChoice(choice));
                    }
                }
                else {
                    button.addEventListener("click", () => handleChoice(choice));
                }
                choicesContainer.appendChild(button);
            });
        }
    }
    function handleChoice(choice) {
        if (choice.addItem) {
            inventory.addItem(choice.addItem);
        }
        if (choice.addStatus) {
            status.addStatus(choice.addStatus);
        }
        if (choice.removeStatus) {
            status.removeStatus(choice.removeStatus);
        }
        if (choice.addHealth) {
            inventory.health = Math.min(health + choice.addHealth, healthMax);
            updateHP();
        }
        if (choice.removeHealth) {
            inventory.health = Math.max(health - choice.removeHealth, 0);
            updateHP();
        }
        if (choice.reload) {
            location.reload();
            return;
        }
        if (health > 0) {
            const scene = sceneData[currentScene];
            scene.choices = scene.choices.filter(c => c !== choice);
            currentScene = choice.next;
            chooseScene();
        }
        else {
            currentScene = "end";
            chooseScene();
        }
        if (choice.removeItem) {
            inventory.removeItem(choice.removeItem);
        }
    }
    function updateHP() {
        const healthUI = document.getElementById("health-ui");
        const charHealth = document.getElementById("char-health");
        if (healthUI) {
            charHealth.innerText = "HP: " + inventory.health + " / " + chosenCharacter[0].HP;
        }
    }
    chooseScene();
}
// ==========================================================================
// Start on Load
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    selectCharacter();
});
// ==========================================================================
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
// ==========================================================================
const createSVG = (width, height, radius) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    svg.setAttributeNS("http://www.w3.org/2000/svg", "viewBox", `0 0 ${width} ${height}`);
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
    const htmlButton = button;
    const style = getComputedStyle(htmlButton);
    const lines = document.createElement("div");
    lines.classList.add("lines");
    const groupTop = document.createElement("div");
    const groupBottom = document.createElement("div");
    const svg = createSVG(htmlButton.offsetWidth, htmlButton.offsetHeight, parseInt(style.borderRadius, 10));
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
