var inquirer = require("inquirer");
function game() {
    var mainChar = "";
    var smallEnemy = new Character("Goblin", "Rogue", 2, 1, 1);
    var bigEnemy = new Character("Orc", "Fighter", 3, 2, 1);
    var bigBoss = new Character("Chaos Warrior", "Warrior", 4, 4, 3)

    function Character(name, role, attack, defense, hp) {
        this.name = name;
        this.role = role;
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        alive = true;
        this.printStats = function () {
            console.log("\r\n");
            console.log("Name: " + this.name);
            console.log("Class: " + this.role);
            console.log("Attack: " + this.attack);
            console.log("Defense: " + this.defense);
            console.log("HP: " + this.hp);
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
        this.hit = function (userHits) {

        }
        this.defend = function (targetDefends) {

        }

        this.dice = {
            sides: 6,
            roll: function () {
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        }

    }

    function fight(user, target) {
        var battle = 1;
        userTurn = 1;
        targetTurn = 0;
        while (battle == 1) {
            while (userTurn == 1) {
                userHits = 0;
                targetDefends = 0;

                for (var i = 0; i < user.attack; i++) {
                    userRoll = user.dice.roll();
                    console.log(user.name + "rolled: " + userRoll);
                    console.log("============");
                    if (userRoll === 1 || userRoll === 2 || userRoll === 3) {
                        userHits++;
                    }
                }

                for (var j = 0; j < target.attack; j++) {
                    userRoll = target.dice.roll();
                    console.log(target.name + "rolled: " + userRoll);
                    console.log("============");
                    if (userRoll === 4 || userRoll === 5) {
                        targetDefends++;
                    }
                }
                console.log("User hit " + userHits + " times");

                console.log("Target defend " + targetDefends + " attacks");
                if (userHits > targetDefends) {
                    totalDamage = userHits - targetDefends;
                    target.hp -= totalDamage;
                    console.log(user.name + " has dealt " + totalDamage + " to " + target.name)
                }
                userTurn = 0;
                targetTurn = 1;
            }

            while (targetTurn == 1) {
                userHits = 0;
                targetDefends = 0;

                for (var i = 0; i < user.attack; i++) {
                    userRoll = user.dice.roll();
                    console.log(user.name + "rolled: " + userRoll);
                    console.log("============");
                    if (userRoll === 1 || userRoll === 2 || userRoll === 3) {
                        userHits++;
                    }
                }

                for (var j = 0; j < target.attack; j++) {
                    userRoll = target.dice.roll();
                    console.log(target.name + "rolled: " + userRoll);
                    console.log("============");
                    if (userRoll === 4 || userRoll === 5) {
                        targetDefends++;
                    }
                }
                console.log("User hit " + userHits + " times");

                console.log("Target defend " + targetDefends + " attacks");
                if (userHits > targetDefends) {
                    totalDamage = userHits - targetDefends;
                    target.hp -= totalDamage;
                    console.log(user.name + " has dealt " + totalDamage + " to " + target.name)
                }
                targetTurn = 0;
                userTurn = 1;
            }

            if (user.hp < 1) {
                console.log("The Player has died!");
                battle = 0;
            }
            else if (target.hp < 1) {
                console.log("The monster has died!");
                battle = 0;
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
        ]).then(function (iqRes) {
            if (iqRes.character === "Barbarian") {
                mainChar = new Character("Alan", "Barbarian", 3, 2, 8);
                console.log(mainChar.printStats());
            } if (iqRes.character === "Wizard") {
                mainChar = new Character("Emad", "Wizard", 1, 2, 4);
                console.log(mainChar.printStats());
            } if (iqRes.character === "Elf") {
                mainChar = new Character("Leslie", "Elf", 2, 2, 6);
                console.log(mainChar.printStats());
            } if (iqRes.character === "Dwarf") {
                mainChar = new Character("Cord", "Dwarf", 2, 2, 7);
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
            }
            if (res.action === "Fight!") {
                fight(mainChar, smallEnemy)
            }
        })
    }


    //start the game
    chooseCharacter(inquirer).then(function (res) {
        firstRoom();
    })
}
game();