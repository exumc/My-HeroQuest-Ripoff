function game() {
    var mainChar = "";
    var smallEnemy = new Character("Goblin", "Rogue", 2, 1, 1);
    var bigEnemy = new Character("Orc", "Fighter", 3, 2, 1);
    var bigBoss = new Character("Chaos Warrior", "Warrior", 4, 4, 3)

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Character(name, role, attack, defend, hp) {
        this.name = name;
        this.role = role;
        this.attack = attack;
        this.defend = defend;
        this.hp = hp;
        alive = true;
        this.hits = randInt(1, 3);
        this.misses = randInt(1, 2);
        this.printStats = function () {
            console.log("\r\n\r\n");
            console.log("Name: " + this.name);
            console.log("Class: " + this.role);
            console.log("Attack: " + this.attack);
            console.log("Defense: " + this.defense);
            console.log("HP: " + this.hp);
            console.log("\r\n\r\n");
        }

    }

    function fight(user, target) {
        ct = user.attack;
        if (ct < 1) {
            return;
        } else {
            if (user.hits > target.misses) {
                console.log("Target hit")
            } else {
                console.log("Target misses")
            }
        }
    }

    function chooseCharacter(inquirer) {
        return inquirer.prompt([
            {
                type: "list",
                name: "character",
                message: "Who are you?",
                choices: ["Barbarian", "Dwarf", "Elf", "Wizard",]
            }
        ])
    }

    function firstRoom() {
        console.log("You find yourself in a dimly lit dungeon.")
        console.log("Before you see a menacing little goblin.")
        console.log("What do you do?")
        return inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Now what do you want to do?",
                choices: ["Fight!", "Run!",]
            }
        ]).then(function (res) {
            if (res.action === "Run!") {
                console.log("Don't be such a coward!");
                fight(smallEnemy, mainChar);
            }
            if (res.action === "Fight!") {
                fight(mainChar, smallEnemy);
            } else {
                return;
            }
        }
        );
    }

    var inquirer = require("inquirer");

    //start the game
    chooseCharacter(inquirer).then(function (res) {
        if (res.character === "Barbarian") {
            var mainChar = new Character("Alan", "Barbarian", 3, 2, 8);
            console.log(mainChar.printStats());
        } if (res.character === "Dwarf") {
            var mainChar = new Character("Cord", "Dwarf", 2, 2, 7);
            console.log(mainChar.printStats());
        } if (res.character === "Elf") {
            var mainChar = new Character("Emad", "Elf", 2, 2, 6);
            console.log(mainChar.printStats());
        } if (res.character === "Wizard") {
            var mainChar = new Character("Jacob", "Wizard", 1, 2, 4);
            console.log(mainChar.printStats());
        };
        firstRoom();
    });

}

game();