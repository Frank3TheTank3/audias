<script setup>
/*====================================*/
/*                 IMPORT               |
/*====================================*/

import { useGameStore } from "../../store/gamestore";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { Inertia } from "@inertiajs/inertia";

/*====================================*/
/*                 PINIA               |
/*====================================*/

let { gameHasStarted, levelDistance, movingHeight } = storeToRefs(
    useGameStore()
);

/*====================================*/
/*                 VARS               |
/*====================================*/

import { ref, onMounted, watch } from "vue";
var plattforms = [];
let enemySpeed = 5;
let canvas = ref(null);
let ctx;
let coinsDisplay;
let livesDisplay;
let distanceDisplay;
let numberofcoins = 0;
let numberOfLives = 3;
let setLevelDistance;
let showingCars = true;
let addingCars;
let gamePaused;
let gameWon;
let form = reactive({
    score: null,
});

function submit() {
    Inertia.post("game", form);
}

/*====================================*/
/*            ON MOUNTED              |
/*====================================*/

onMounted(() => {
    function byId(e) {
        return document.getElementById(e);
    }
    coinsDisplay = byId("coins");
    livesDisplay = byId("lives");
    distanceDisplay = byId("distance");

    ctx = canvas.value.getContext("2d");
    //canvas.width = innerWidth - 50;
    //canvas.height = innerHeight / 2;
    document.getElementById("buttonA").addEventListener("click", function () {
        callButtonPress("w", 87);
    });
    document.getElementById("buttonB").addEventListener("click", function () {
        callButtonPress("d", 68);
    });
    setLevelDistance = levelDistance.value * 15;
});

/*====================================*/
/*          CANVAS BUTTONS             |
/*====================================*/

function callButtonPress(keyValue, keyCodeValue) {
    console.log("BTN " + keyValue + " pressed");
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: keyValue,
            keyCode: keyCodeValue, // example values.
            code: "Key" + keyValue, // put everything you need in this object.
            which: keyCodeValue,
        })
    );
}

function StartGame() {
    console.log("Starting game...");

    /*=============================================================*/
    /*                      SET VARS                                |
    /*=============================================================*/

    //Canvas dimensions
    canvas.value.width = 1080;
    canvas.value.height = 640;

    //Plattforms
    var plattform = "img/plattforms/plattform_green_A.png";
    var plattform2 = "img/plattforms/plattform_yellow_A.png";
    var plattform3 = "img/plattforms/plattform_cave_B.png";

    //Scenery
    var mountains = "img/backgrounds/mountain1.png";
    var mountains2 = "img/backgrounds/mountain2.png";
    var mountains3 = "img/backgrounds/mountain3.png";
    var trees = "img/trees/trees.png";
    var grass = "img/grass/grass.png";
    var roads = "img/objects/roads.png";

    //Enemies
    var boss = "img/sprites/boss.png";
    var alien = "img/sprites/alien.png";
    var car = "img/objects/car.png";

    //Player animations
    var standright = "img/sprites/IdleRight.png";
    var runright = "img/sprites/Run2.png";
    var runleft = "img/sprites/RunBack.png";
    var jumpright = "img/sprites/Jump_Up_Right.png";

    //Fox animations
    var foxidleright = "img/sprites/foxidle2.png";
    var foxjumpright = "img/sprites/foxjump2.png";
    var foxrunright = "img/sprites/foxrun2.png";
    var foxrunleft = "img/sprites/foxrun3.png";

    //Entities
    var ads = "img/objects/ads.png";
    var coin = "img/coin.png";
    var box = "img/objects/box.png";

    //Get play buttons and activate
    document.getElementById("pad").style["display"] = "flex";
    document.getElementById("buttonA").style["display"] = "flex";
    document.getElementById("buttonB").style["display"] = "flex";

    const playerOffsetY = 5;
    const enemyOffsetX = 20;
    const gravity = 0.5;
    let isJumping = false;
    let currentKey = "none";
    let lastTime = 0;
    let keyBeforeJump = "none";
    let durationInLevelDistance;
    let enemiesDoDamage;

    //Game images
    let plattformImage = createImage(plattform);
    let bossImage = createImage(boss);
    let adsImage = createImage(ads);
    let coinImage = createImage(coin);
    let plattformImage2 = createImage(plattform2);
    let plattformImage3 = createImage(plattform3);
    let alienImage = createImage(alien);
    let roadImage = createImage(roads);
    let boxImage = createImage(box);
    let carImage = createImage(car);
    let scrollOffset = 0;


    const keys = {
        right: {
            pressed: false,
        },
        left: {
            pressed: false,
        },
        up: {
            pressed: false,
        },
    };

    /*=============================================================*/
    /*                     PLAYER CLASS                             |
    /*=============================================================*/

    class Entity {
        constructor() {
            this.position = {
                x: 30,
                y: 30,
            };
            this.width = 250;
            this.height = 220;
        }
    }

    class Coin extends Entity {
        constructor({ x, y, image }) {
            super();
            this.position = {
                x,
                y,
            };
            this.image = image;
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }

    class Box extends Entity {
        constructor({ x, y, image }) {
            super();
            this.position = {
                x,
                y,
            };
            this.image = image;
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }

    class Car extends Entity {
        constructor({ x, y, image }) {
            super();
            this.position = {
                x,
                y,
            };
            this.image = image;
            this.width = 200;
            this.height = 86;
        }
        draw() {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }

        update() {
            this.position.x -= 10;
            if (this.position.x < -this.width) {
                this.position.x = canvas.width + this.width;
            }
        }
    }

    class Player extends Entity {
        constructor() {
            super();
            this.speed = 10;

            this.position = {
                x: 30,
                y: 30,
            };
            this.velocity = {
                x: 0,
                y: 0,
            };
            this.width = 250;
            this.height = 220;
        }

        update() {
            this.draw();
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            if (
                this.position.y + this.height + this.velocity.y <=
                canvas.height
            ) {
                this.velocity.y += gravity;
            }

            if (isJumping) {
                this.currentSprite = this.sprites.jump.right;
            } else {
                if (
                    currentKey == "right" &&
                    this.currentSprite !== this.sprites.run.right
                ) {
                    this.frames = 1;
                    this.currentSprite = this.sprites.run.right;
                } else if (
                    currentKey === "left" &&
                    this.currentSprite !== this.sprites.run.left
                ) {
                    this.frames = 1;
                    this.currentSprite = this.sprites.run.left;
                } else if (
                    currentKey === "up" &&
                    this.currentSprite !== this.sprites.jump.right
                ) {
                    this.currentSprite = this.sprites.jump.right;
                } else if (currentKey === "none") {
                    this.currentSprite = this.sprites.stand.right;
                }
            }
        }
    }

    class Hero extends Player {
        constructor() {
            super();
            this.position = {
                x: 30,
                y: 30,
            };
            this.image = createImage(standright);
            this.width = 250;
            this.height = 220;
            this.frames = 0;

            this.sprites = {
                stand: {
                    right: createImage(standright),
                    cropwidth: 350,
                },
                run: {
                    left: createImage(runleft),
                    right: createImage(runright),
                    cropwidth: 250,
                },
                jump: {
                    right: createImage(jumpright),
                    cropwidth: 250,
                },
            };

            this.currentSprite = this.sprites.stand.right;
            this.currentCropWidth = 230;
        }

        draw() {
            ctx.drawImage(
                this.currentSprite,
                510 * this.frames,
                0,
                350,
                261,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }

        update() {
            this.frames++;
            if (
                this.frames > 15 &&
                this.currentSprite === this.sprites.stand.right
            ) {
                this.frames = 0;
            } else if (
                this.frames > 12 &&
                this.currentSprite === this.sprites.run.right
            ) {
                this.frames = 0;
            } else if (
                this.frames > 12 &&
                this.currentSprite === this.sprites.run.left
            ) {
                this.frames = 0;
            } else if (
                this.frames > 14 &&
                this.currentSprite === this.sprites.jump.right
            ) {
                this.frames = 0;
            }

            super.update();
        }
    }

    class Fox extends Player {
        constructor({ x, y }) {
            super();
            this.position = {
                x,
                y,
            };
            this.speed = 15;
            this.width = 230;
            this.height = 125;
            this.image = createImage(foxidleright);
            this.frames = 0;
            this.sprites = {
                stand: {
                    right: createImage(foxidleright),
                    cropwidth: 230,
                },
                run: {
                    left: createImage(foxrunleft),
                    right: createImage(foxrunright),
                    cropwidth: 230,
                },
                jump: {
                    right: createImage(foxjumpright),
                    cropwidth: 231,
                },
            };
            this.currentSprite = this.sprites.stand.right;
            this.currentCropWidth = 230;
        }

        draw() {
            ctx.drawImage(
                this.currentSprite,
                230 * this.frames,
                0,
                230,
                125,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }

        update() {
            this.frames++;

            if (
                this.frames > 3 &&
                this.currentSprite === this.sprites.stand.right
            ) {
                this.frames = 0;
            } else if (
                this.frames > 8 &&
                this.currentSprite === this.sprites.run.right
            ) {
                this.frames = 0;
            } else if (
                this.frames > 8 &&
                this.currentSprite === this.sprites.run.left
            ) {
                this.frames = 0;
            } else if (
                this.frames > 4 &&
                this.currentSprite === this.sprites.jump.right
            ) {
                this.frames = 0;
            }
            super.update();
        }
    }

    /*=============================================================*/
    /*                     PLATTFORM CLASS                          |
    /*=============================================================*/

    class Plattform {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y,
            };

            this.image = image;
            this.width = 500;
            this.height = 232;
            this.setY = y;
        }

        draw() {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }

    /*=============================================================*/
    /*                     SCENERY CLASS                            |
    /*=============================================================*/

    class Scenery {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y,
            };

            this.image = image;
            this.width = 500;
            this.height = 232;
        }

        draw() {
            //ctx.fillStyle = 'green'
            //ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }

    /*=============================================================*/
    /*                     ENEMY CLASS                              |
    /*=============================================================*/

    class Enemies {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y,
            };

            this.image = image;
            this.width = 180;
            this.height = 210;
        }

        draw() {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }

        update() {
            this.position.x -= enemySpeed;
            if (this.position.x < -this.width) {
                this.position.x = canvas.width + this.width;
            }
        }
    }

    /*=============================================================*/
    /*                     CORE FUNCTIONS                           |
    /*=============================================================*/

    let player = undefined;
    let enemies = [];
    let scenery = [];
    let coins = [];
    let boxes = [];

    function createImage(imgSrc) {
        const image = new Image();
        image.src = imgSrc;
        return image;
    }

    /*=============================================================*/
    /*                     INITIALIZE FUNCTION                     |
    /*=============================================================*/
    function init() {
        enemiesDoDamage = true;
        durationInLevelDistance = setLevelDistance;
        coinsDisplay.innerHTML = 0;
        numberofcoins = 0;
        numberOfLives = 3;
        distanceDisplay.innerHTML = durationInLevelDistance;
        canvas.width = innerWidth - innerWidth / 8;
        canvas.height = 640;
        currentKey = "none";
        keys.right.pressed = false;
        keys.left.pressed = false;

        player = new Hero();

        //console.log(durationInLevelDistance);

        let factor;
        if (durationInLevelDistance > 1500) {
            factor = 5;
        } else {
            factor = 10;
        }

        boxes = [new Box({ x: 2500, y: 250, image: boxImage })];

        coins = [
            new Coin({ x: 900, y: 550, image: coinImage }),
            new Coin({ x: 1300, y: 350, image: coinImage }),
            new Coin({ x: 1900, y: 500, image: coinImage }),
            new Coin({ x: 2500, y: 350, image: coinImage }),
            new Coin({ x: 3200, y: 350, image: coinImage }),
            new Coin({ x: 3600, y: 350, image: coinImage }),
            new Coin({ x: 4100, y: 350, image: coinImage }),
            new Coin({ x: 4700, y: 350, image: coinImage }),
        ];

        plattforms = [
            new Plattform({ x: 0, y: 500, image: plattformImage }),
            new Plattform({ x: 800, y: 450, image: plattformImage2 }),
            new Plattform({ x: 1200, y: 350, image: plattformImage }),
            new Plattform({ x: 1800, y: 500, image: plattformImage2 }),
            new Plattform({ x: 2400, y: 350, image: plattformImage }),
            new Plattform({ x: 3000, y: 550, image: plattformImage3 }),
            new Plattform({ x: 3500, y: 500, image: plattformImage3 }),
            new Plattform({ x: 4000, y: 450, image: plattformImage3 }),
            new Plattform({ x: 4600, y: 500, image: plattformImage3 }),
            new Plattform({
                x: 4600,
                y: 250,
                image: adsImage,
            }),
        ];

        enemies = [
            new Enemies({ x: 800, y: 400, image: bossImage }),
            new Enemies({ x: 1500, y: 0, image: alienImage }),
        ];

        console.log(coins);

        scenery = [
            new Scenery({
                x: 0,
                y: 0,
                image: createImage(mountains),
            }),
            new Scenery({
                x: 0,
                y: 250,
                image: createImage(trees),
            }),
            new Scenery({
                x: 1800,
                y: 0,
                image: createImage(mountains2),
            }),
            new Scenery({
                x: 3500,
                y: 0,
                image: createImage(mountains3),
            }),
        ];

        let sceneryX = 350;
        for (let index = 0; index < 5; index++) {
            if (index < 1) {
                scenery.push(
                    new Scenery({
                        x: sceneryX,
                        y: 350,
                        image: createImage(grass),
                    })
                );
            } else {
                scenery.push(
                    new Scenery({
                        x: sceneryX,
                        y: 50,
                        image: roadImage,
                    })
                );
            }

            sceneryX += 1920;
        }

        scrollOffset = 0;
    }

    function addToEnemies() {
        enemies.push(
            new Car({
                x: 1200,
                y: 450,
                image: carImage,
            })
        );
        addingCars = false;
    }

    /*=============================================================*/
    /*                        ANIMATE FUNCTION                      |
    /*=============================================================*/
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        coinsDisplay.innerHTML = numberofcoins;
        livesDisplay.innerHTML = numberOfLives;
        distanceDisplay.innerHTML = durationInLevelDistance;
        //console.log(deltaTime)
        if (!gameWon && !gamePaused) {
            requestAnimationFrame(animate);
        }

        ctx.fillStyle = "white";

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /*=============================================================*/
        /*                     DRAW OBJECTS FUNCTION                    |
    /*=============================================================*/
        scenery.forEach((scenery) => {
            scenery.draw();
        });

        plattforms.forEach((plattform) => {
            plattform.draw();
            //plattform.position.y = plattform.setY + movingHeight / 300;
        });
        plattforms.forEach((plattform) => {
            //console.log(movingHeight.value);
            if (plattform.image === plattformImage2) {
                plattform.position.y = plattform.setY + movingHeight.value / 3;
            }
        });

        enemies.forEach((enemy) => {
            enemy.draw();
            enemy.update();
            if (durationInLevelDistance < 44000 && showingCars) {
                showingCars = false;
                addingCars = true;
                addToEnemies();
            }
        });

        coins.forEach((coin) => {
            coin.draw();
        });

        boxes.forEach((box) => {
            box.draw();
        });
        player.update();

        /*=============================================================*/
        /*                     MOVEMENT SCROLLING                      |
    /*=============================================================*/
        //Player movement before screen middle
        if (keys.right.pressed && player.position.x < canvas.width / 4) {
            player.velocity.x = player.speed;
        } else if (
            (keys.left.pressed && player.position.x > canvas.width / 8) ||
            (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
        ) {
            player.velocity.x = -player.speed;
        } else {
            player.velocity.x = 0;

            //On player movement after screen middle
            if (keys.right.pressed) {
                durationInLevelDistance -= player.speed;
                scrollOffset += player.speed;
                plattforms.forEach((plattform) => {
                    plattform.position.x -= player.speed;
                });
                scenery.forEach((scenery) => {
                    scenery.position.x -= player.speed * 0.66;
                });
                enemies.forEach((enemy) => {
                    enemy.position.x -= player.speed;
                });
                coins.forEach((coin) => {
                    coin.position.x -= player.speed;
                });
                boxes.forEach((box) => {
                    box.position.x -= player.speed;
                });
            } else if (keys.left.pressed && scrollOffset > 100) {
                durationInLevelDistance += player.speed;
                scrollOffset -= 5;
                plattforms.forEach((plattform) => {
                    plattform.position.x += player.speed;
                });
                scenery.forEach((scenery) => {
                    scenery.position.x += player.speed * 0.66;
                });
                enemies.forEach((enemy) => {
                    enemy.position.x += player.speed;
                });
                coins.forEach((coin) => {
                    coin.position.x += player.speed;
                });
                boxes.forEach((box) => {
                    box.position.x += player.speed;
                });
            }
        }

        /*=============================================================*/
        /*                     COLLISIONS FUNCTION                     |
    /*=============================================================*/
        /*====================================*/
        /*              PLATTFORMS            |
    /*====================================*/
        plattforms.forEach((plattform) => {
            if (
                player.position.y + player.height <=
                    plattform.position.y + playerOffsetY &&
                player.position.y + player.height + player.velocity.y >=
                    plattform.position.y &&
                player.position.x + player.width >= plattform.position.x &&
                player.position.x <= plattform.position.x + plattform.width / 2
            ) {
                player.velocity.y = 0;
                if (isJumping) {
                    isJumping = false;

                    if (keyBeforeJump === "right") {
                        keyBeforeJump = "none";
                    } else {
                        keys.up.pressed = false;
                        currentKey = "none";
                    }
                }
            }
        });
        var newFoxX = player.position.x;
        var newFoxY = player.position.y;

        /*====================================*/
        /*                ENEMIES              |
    /*====================================*/
        //Enemy collision
        enemies.forEach((enemy) => {
            if (enemiesDoDamage) {
                if (
                    player.position.y <= enemy.position.y + enemy.height / 3 &&
                    player.position.y +
                        player.height +
                        player.velocity.y -
                        playerOffsetY >=
                        enemy.position.y + enemy.height / 5 &&
                    player.position.x + player.width / 2 >= enemy.position.x &&
                    player.position.x <= enemy.position.x
                ) {
                    player.velocity.y = 0;

                    if (numberOfLives > 0) {
                        numberOfLives--;
                        enemiesDoDamage = false;
                    }

                    if (numberOfLives === 0 && enemiesDoDamage) {
                        init();
                    }
                    setTimeout(() => {
                        enemiesDoDamage = true;
                    }, 3000);
                }
            }
        });

        /*====================================*/
        /*                 COINS               |
    /*====================================*/
        coins.forEach((coin, index) => {
            if (
                player.position.y <= coin.position.y + coin.height &&
                player.position.y +
                    player.height +
                    player.velocity.y -
                    playerOffsetY >=
                    coin.position.y + coin.height / 5 &&
                player.position.x + player.width / 2 >= coin.position.x &&
                player.position.x <= coin.position.x
            ) {
                delete coins[index];
                numberofcoins++;
                console.log(numberofcoins);
            }
        });

        /*====================================*/
        /*                 BOXES               |
    /*====================================*/
        boxes.forEach((box, index) => {
            if (
                player.position.y <= box.position.y + box.height &&
                player.position.y +
                    player.height +
                    player.velocity.y -
                    playerOffsetY >=
                    box.position.y + box.height / 5 &&
                player.position.x + player.width / 2 >= box.position.x &&
                player.position.x <= box.position.x
            ) {
                delete boxes[index];
                player = new Fox({ x: newFoxX, y: newFoxY });
            }
        });

        if (scrollOffset > 5100) {
            if (!gameWon) {
                gameWon = true;
                form.score =
                    durationInLevelDistance + numberofcoins - numberOfLives;
                submit();
            }
        }

        if (player.position.y > canvas.height) {
            init();
        }
    }

    /*=============================================================*/
    /*                     EVENT LISTENERS                          |
    /*=============================================================*/

    addEventListener("keydown", ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log("left");
                keys.left.pressed = true;
                currentKey = "left";
                break;

            case 83:
                console.log("down");
                break;

            case 68:
                console.log("right");
                keys.right.pressed = true;
                currentKey = "right";
                break;

            case 87:
                if (!isJumping) {
                    if (currentKey != "none") {
                        keyBeforeJump = currentKey;
                    }
                    keys.up.pressed = true;
                    currentKey = "up";
                    console.log("up");
                    player.velocity.y -= 15;
                    isJumping = true;
                    break;
                } else {
                    break;
                }
        }
    });

    addEventListener("keyup", ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                keys.left.pressed = false;
                currentKey = "none";
                console.log("left");
                break;

            case 83:
                console.log("down");
                break;

            case 68:
                console.log("right");
                keys.right.pressed = false;
                currentKey = "none";
                break;

            case 87:
                console.log("up");

                break;
        }
    });

    /*=============================================================*/
    /*          SCENE INITIALIZATION  & ANIMATION CALL              |
    /*=============================================================*/

    init();
    animate();
}

watch(
    () => gameHasStarted.value,
    (started) => {
        if (started === true) {
            StartGame();
        }
    }
);
</script>

<style scoped>
.buttonA {
    position: relative;
    top: 550px;
    height: 80px;
    width: 80px;
    display: none;
}

.buttonB {
    position: relative;
    top: 520px;
    height: 80px;
    width: 80px;
    display: none;
}

.pad {
    position: relative;
    top: 520px;
    height: 180px;
    width: 180px;
    display: none;
}

p {
    padding: 20px;
}

#gameContainer {
    background-color: beige;
    padding-top: 50px;
    padding-bottom: 50px;
}

@media only screen and (max-width: 600px) {
    canvas {
        width: 550px;
        height: 250px;
    }
}

.gameinfo {
    font-size: xx-large;
}
</style>


<template>
    <div class="flex justify-center p-4 gameinfo">
        <p>Coins: <span id="coins"></span></p>
        <p>Current distance: <span id="distance"></span></p>
        <p>Lives left: <span id="lives"></span></p>
    </div>

    <div class="flex justify-center" id="gameContainer">
        <button class="pad" id="pad"><img src="img/pad.png" alt="" /></button>
        <canvas class="self-center" ref="canvas"></canvas>
        <button class="buttonA" id="buttonA">
            <img src="img/button.png" alt="" />
        </button>
        <button class="buttonB" id="buttonB">
            <img src="img/button.png" alt="" />
        </button>
    </div>
</template>
