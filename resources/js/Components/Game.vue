


<script setup>
import { useGameStore } from "../../store/gamestore";
import { storeToRefs } from "pinia";
let { gameHasStarted, levelDistance, movingHeight } = storeToRefs(
    useGameStore()
);

import { ref, onMounted, watch } from "vue";
var plattforms = [];
let enemySpeed = 5;
let canvas = ref(null);
let ctx;
let isFox;

onMounted(() => {
    /*canvas = document.getElementById('canvas');*/
    console.log("Canvas element: " + canvas);
    ctx = canvas.value.getContext("2d");
    //canvas.width = innerWidth - 50;
    //canvas.height = innerHeight / 2;
});

function StartGame() {
    console.log("Starting game...");
    canvas.value.width = 1080;
    canvas.value.height = 640;
    /*=============================================================*/
    /*                      SET VARS                                |
    /*=============================================================*/
    //Plattforms
    var plattform = "img/plattforms/plattform_green_A.png";
    var plattform2 = "img/plattforms/plattform_yellow_A.png";
    //Scenery
    var mountains = "img/backgrounds/mountain1.png";
    var mountains2 = "img/backgrounds/mountain2.png";
    var trees = "img/trees/trees.png";
    var grass = "img/grass/grass.png";
    //Enemies
    var boss = "img/sprites/boss.png";
    var alien = "img/sprites/alien.png";
    //Player animations
    var standright = "img/sprites/IdleRight.png";
    var runright = "img/sprites/Run2.png";
    var runleft = "img/sprites/RunBack.png";
    var jumpright = "img/sprites/Jump_Up_Right.png";
    //Fox animations
    var foxidleright = "img/sprites/foxidle2.png";
    var foxjumpright = "img/sprites/foxjump2.png";
    var foxrunright = "img/sprites/foxrun2.png";

    //End goal
    var ads = "img/objects/ads.png";

    //const startButton = document.querySelector('button');
    //startButton.style.display = 'none';
    //canvas = document.getElementById('canvas');

    const playerOffsetY = 15;
    const enemyOffsetX = 20;
    const gravity = 0.5;
    let isJumping = false;
    let currentKey = "none";
    let lastTime = 0;
    let keyBeforeJump = "none";

    let plattformImage2 = createImage(plattform2);
    let plattformImage = createImage(ads);
    let bossImage = createImage(boss);
    let alienImage = createImage(alien);

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

    /*
    class Player {
        constructor() {
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
            if (!isFox) {
                this.image = createImage(standright);
            } else {
                this.image = createImage(standright);
            }

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
            this.foxSprites = {
                stand: {
                    right: createImage(foxidleright),
                    cropwidth: 230,
                },
                run: {
                    left: createImage(foxrunright),
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
            if (!isFox) {
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

            } else {
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
        }

        update() {
            this.frames++;

            if (!isFox) {
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
            } else {
                if (
                    this.frames > 3 &&
                    this.currentSprite === this.foxSprites.stand.right
                ) {
                    this.frames = 0;
                } else if (
                    this.frames > 8 &&
                    this.currentSprite === this.foxSprites.run.right
                ) {
                    this.frames = 0;
                } else if (
                    this.frames > 8 &&
                    this.currentSprite === this.foxSprites.run.left
                ) {
                    this.frames = 0;
                } else if (
                    this.frames > 4 &&
                    this.currentSprite === this.foxSprites.jump.right
                ) {
                    this.frames = 0;
                }
            }

            this.draw();
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            if (
                this.position.y + this.height + this.velocity.y <=
                canvas.height
            ) {
                this.velocity.y += gravity;
            }
        }
    }

    */

    class Player {
        constructor() {
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
        }
    }

    class Hero extends Player {
        constructor() {
            super();

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
        constructor() {
            super();
            this.speed = 10;
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
                    left: createImage(foxrunright),
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
            //ctx.fillStyle = 'green'
            //ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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

    let player = new Fox();

    let enemies = [];
    let scenery = [];

    function createImage(imgSrc) {
        const image = new Image();
        image.src = imgSrc;
        return image;
    }

    function init() {
        canvas.width = innerWidth - innerWidth / 8;
        canvas.height = 640;
        currentKey = "none";
        keys.right.pressed = false;
        keys.left.pressed = false;
        let plattformImage = createImage(plattform);
        let bossImage = createImage(boss);
        let adsImage = createImage(ads);
        player = new Fox();
        let durationInLevelDistance = levelDistance.value * 10;
        console.log(durationInLevelDistance);

        let factor;
        if (durationInLevelDistance > 1500) {
            factor = 5;
        } else {
            factor = 10;
        }
        plattforms = [
            new Plattform({ x: 0, y: 500, image: plattformImage }),
            new Plattform({ x: 800, y: 550, image: plattformImage2 }),
            new Plattform({ x: 1200, y: 350, image: plattformImage }),
            new Plattform({ x: 1800, y: 500, image: plattformImage2 }),
            new Plattform({ x: 2400, y: 350, image: plattformImage }),
            new Plattform({ x: 3000, y: 550, image: plattformImage2 }),
            new Plattform({
                x: durationInLevelDistance,
                y: 250,
                image: adsImage,
            }),
        ];

        enemies = [
            new Enemies({ x: 800, y: 400, image: bossImage }),
            new Enemies({ x: 1500, y: 0, image: alienImage }),
        ];

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
        ];
        let sceneryX = 350;
        for (let index = 0; index < 5; index++) {
            scenery.push(
                new Scenery({
                    x: sceneryX,
                    y: 350,
                    image: createImage(grass),
                })
            );
            sceneryX += 1920;
        }

        scrollOffset = 0;
    }

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //console.log(deltaTime)
        requestAnimationFrame(animate);
        ctx.fillStyle = "white";

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        scenery.forEach((scenery) => {
            scenery.draw();
        });

        plattforms.forEach((plattform) => {
            plattform.draw();
            //plattform.position.y = plattform.setY + movingHeight / 300;
        });
        plattforms.forEach((plattform) => {
            //console.log(movingHeight.value);
            plattform.position.y = plattform.setY + movingHeight.value / 3;
        });

        enemies.forEach((enemy) => {
            enemy.draw();
            enemy.update();
        });

        player.update();
        if (keys.right.pressed && player.position.x < canvas.width / 4) {
            player.velocity.x = player.speed;
        } else if (
            (keys.left.pressed && player.position.x > canvas.width / 8) ||
            (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
        ) {
            player.velocity.x = -player.speed;
        } else {
            player.velocity.x = 0;

            if (keys.right.pressed) {
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
            } else if (keys.left.pressed && scrollOffset > 100) {
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
            }
        }

        plattforms.forEach((plattform) => {
            if (
                player.position.y + player.height <=
                    plattform.position.y + playerOffsetY * 1.5 &&
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

        enemies.forEach((enemy) => {
            if (
                player.position.y <= enemy.position.y + enemy.height &&
                player.position.y +
                    player.height +
                    player.velocity.y -
                    playerOffsetY >=
                    enemy.position.y + enemy.height / 5 &&
                player.position.x + player.width / 2 >= enemy.position.x &&
                player.position.x <= enemy.position.x
            ) {
                player.velocity.y = 0;
                isFox = true;
                //init();
            }
        });

        //MOVEMENT SPRITES //////////////////////////////////////////////////////////////////////////////////////////////////

        if (isJumping) {
            player.currentSprite = player.sprites.jump.right;
        } else {
            if (
                currentKey == "right" &&
                player.currentSprite !== player.sprites.run.right
            ) {
                player.frames = 1;
                player.currentSprite = player.sprites.run.right;
            } else if (
                currentKey === "left" &&
                player.currentSprite !== player.sprites.run.left
            ) {
                player.frames = 1;
                player.currentSprite = player.sprites.run.left;
            } else if (
                currentKey === "up" &&
                player.currentSprite !== player.sprites.jump.right
            ) {
                player.currentSprite = player.sprites.jump.right;
            } else if (currentKey === "none") {
                player.currentSprite = player.sprites.stand.right;
            }
        }

        //songDuration * 20 + 400
        if (scrollOffset > 2800) {
            init();
            alert("Congratulations, you win!");
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
    /*                  SCENE INITIALIZATION                        |
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



<template>
    <div class="flex justify-center">
        <canvas class="self-center" ref="canvas"></canvas>
    </div>
    <!--
    <div class="flex justify-center">
        <input
            class="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded-full
            "
            type="file"
            id="audioupload"
            name="audioupload"
            accept="audio/mp3,audio/*; capture=microphone"
        />
    </div>
    -->
</template>