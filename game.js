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

        this.dice = {
            sides: 6,
            roll: function () {
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        }

    }

    function fight(user, target) {
        var userHits = 0;
        var targetHits = 0;
        if (user.hp > 0){
        for (var i = 0; i < user.attack; i++) {
            var userRoll = user.dice.roll();
            console.log(user.name + " rolled: " + userRoll);
            console.log("==============");
            if (userRoll === 1 || userRoll === 2 || userRoll === 3) {
                userHits++;
            }
        }
    }
        if (target.hp > 0){
            for (var j = 0; j < target.defense; j++) {
            var enemyRoll = target.dice.roll();
            console.log(target.name + " rolled: " + enemyRoll);
            console.log("==============");
            if (enemyRoll === 4 || enemyRoll === 5) {
                targetHits++;
            }
        }
    }

        if (userHits > targetHits) {
            target.hp -= userHits;
            console.log("======================")
            console.log(user.name + " hit " + target.name + " for " + userHits + " damage!")
            console.log("======================")
        } else {
            console.log("The attack failed!")
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
                firstFight();
            }
        })
    }

    function firstFight() {

        function fighting() {
            fight(mainChar, smallEnemy);
            fight(smallEnemy, mainChar);
            mainChar.printStats();
            smallEnemy.printStats();
            smallEnemy.isAlive();
            mainChar.isAlive();
        }

        if (smallEnemy.isAlive() === true && mainChar.isAlive() === true) {
            inquirer.prompt([
                {
                    type: "list",
                    name: "action",
                    message: "Now what do you want to do?",
                    choices: ["Attack!",]
                }
            ]).then(function (res2) {
                if (res2.action === "Attack!") {
                    fighting();
                }
            });
            // firstFight()
        } else {
            inquirer.prompt([
                {
                    type: "list",
                    name: "action",
                    message: "The Fight is over!",
                    choices: ["Gloat", "Move on."]
                }
            ])
        }
    }



    //start the game
    chooseCharacter(inquirer).then(function (res) {
        firstRoom();
    })
}
game();