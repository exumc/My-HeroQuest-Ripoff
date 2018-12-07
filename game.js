var inquirer = require("inquirer");
function game() {
    var mainChar = "";
    var smallEnemy = new Character("Goblin", "Rogue", 2, 1, 1);
    var bigEnemy = new Character("Orc", "Fighter", 3, 2, 1);
    var bigBoss = new Character("Chaos Warrior", "Warrior", 4, 4, 3)

    function Character(name, role, attack, defend, hp) {
        this.name = name;
        this.role = role;
        this.attack = attack;
        this.defend = defend;
        this.hp = hp;
        alive = true;
        this.printStats = function () {
            console.log("\r\n\r\n");
            console.log("Name: " + this.name);
            console.log("Class: " + this.role);
            console.log("Attack: " + this.attack);
            console.log("Defense: " + this.defense);
            console.log("HP: " + this.hp);
            console.log("\r\n\r\n");
        };
        this.isAlive = function () {
            if (this.hp > 0) {
                console.log(this.name + " is still alive!");
                console.log("\n-------------\n");
                return true;
            }
            console.log(this.name + " has died!");
            return false;
        };

        this.dice = {
            sides: 6,
            roll: function () {
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        }

    }

    function fight(user, target) {
        var userRoll = user.dice.roll();
        var enemyRoll = target.dice.roll();
        console.log(userRoll);
        console.log(enemyRoll);
    }

    function chooseCharacter(inquirer) {
        return inquirer.prompt([
            {
                type: "list",
                name: "character",
                message: "Who are you?",
                choices: ["Barbarian", "Dwarf", "Elf", "Wizard",]
            }
        ]).then(function (iqRes) {
            if (iqRes.character === "Barbarian") {
                mainChar = new Character("Alan", "Barbarian", "Male", 28, 18, 20, "Hunter", true);
                secondChar = new Character("Cord", "Hunter", "Male", 30, 13, 15, "Barbarian", true);
                console.log(mainChar.printStats());
            } if (iqRes.character === "Warlock") {
                mainChar = new Character("Emad", "Warlock", "Male", 42, 7, 16, "Priest", true);
                secondChar = new Character("Leslie", "Priest", "Female", 25, 4, 12, "Warlock", true);
                console.log(mainChar.printStats());
            } if (iqRes.character === "Priest") {
                mainChar = new Character("Leslie", "Priest", "Female", 25, 4, 12, "Warlock", true);
                secondChar = new Character("Emad", "Warlock", "Male", 42, 7, 16, "Priest", true);
                console.log(mainChar.printStats());
            } if (iqRes.character === "Hunter") {
                mainChar = new Character("Cord", "Hunter", "Male", 30, 13, 15, "Barbarian");
                secondChar = new Character("Alan", "Barbarian", "Male", 28, 18, 20, "Hunter");
                console.log(mainChar.printStats());
            }
        })
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