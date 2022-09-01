var plattforms = []
let enemySpeed = 5



function StartGame() {

  /*=============================================================*/
  /*                      SET VARS                                |
  /*=============================================================*/
  var plattform = '../img/plattform3.png'
  var flowers = '../img/flowers.png'
  var mountains = '../img/mountain1.png'
  var boss = '../img/boss.png'
  var alien = '../img/alien.png'
  var trees = '../img/trees.png'
  var grass = '../img/grass.png'
  var standright = '../img/IdleRight.png'
  var runright = '../img/Run2.png'
  var runleft = '../img/RunBack.png'
  var jumpright = '../img/Jump_Up_Right.png'
  var ads = '../img/ads.png'

  const startButton = document.querySelector('button');
  startButton.style.display = 'none';
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth-50;
  canvas.height = innerHeight/2;
  const playerOffsetY = 20;
  const enemyOffsetX = 20;
  const gravity = 0.5
  let isJumping = false;
  let currentKey = 'none';
  let lastTime = 0;
  let keyBeforeJump = 'none';
  
  let plattformImage = createImage(ads)
  let bossImage = createImage(boss)
  let alienImage = createImage(alien)

  let scrollOffset = 0

  const keys = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    },
    up: {
      pressed: false
    },

  }

  /*=============================================================*/
  /*                     PLAYER CLASS                             |
  /*=============================================================*/

  class Player {

    constructor() {
      this.speed = 10

      this.position = {
        x: 30,
        y: 30
      }
      this.velocity = {
        x: 0,
        y: 0
      }
      this.width = 250
      this.height = 220
      this.image = createImage(standright)
      this.frames = 0
      this.sprites = {
        stand: {
          right: createImage(standright),
          cropwidth: 350
        },
        run: {
          left: createImage(runleft),
          right: createImage(runright),
          cropwidth: 250
        },
        jump: {
          right: createImage(jumpright),
          cropwidth: 250
        }
      }
      this.currentSprite = this.sprites.stand.right
      this.currentCropWidth = 177
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
        this.height)
    }

    update() {
      this.frames++
      if (this.frames > 15 && this.currentSprite === this.sprites.stand.right) { this.frames = 0 }
      else if (this.frames > 12 && this.currentSprite === (this.sprites.run.right)) { this.frames = 0 }
      else if (this.frames > 12 && this.currentSprite === (this.sprites.run.left)) { this.frames = 0 }
      else if (this.frames > 14 && this.currentSprite === (this.sprites.jump.right)) { this.frames = 0 }
      this.draw()
      this.position.y += this.velocity.y
      this.position.x += this.velocity.x
      if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity
      }
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
        

      }

      this.image = image
      this.width = 500
      this.height = 232
      this.setY = y

    }

    draw() {
      //ctx.fillStyle = 'green'
      //ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
      ctx.drawImage(this.image, this.position.x, this.position.y)
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

      }

      this.image = image
      this.width = 500
      this.height = 232

    }

    draw() {
      //ctx.fillStyle = 'green'
      //ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
      ctx.drawImage(this.image, this.position.x, this.position.y)
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

      }

      this.image = image
      this.width = 180
      this.height = 210

    }

    draw() {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
      this.position.x -= enemySpeed;
      if (this.position.x < -this.width) {
        this.position.x = canvas.width + this.width
      }
    }
  }

  /*=============================================================*/
  /*                     CORE FUNCTIONS                           |
  /*=============================================================*/

  let player = new Player()
  
  let enemies = []
  let scenery = []

  function createImage(imgSrc) {
    const image = new Image()
    image.src = imgSrc
    return image
  }

  function init() {
    canvas.width = innerWidth-(innerWidth /8);
  canvas.height = 640;
    currentKey = 'none'
    keys.right.pressed = false
    keys.left.pressed = false
    plattformImage = createImage(plattform)
    bossImage = createImage(boss)
    adsImage = createImage(ads)
    player = new Player()
    let durationInLevelDistance = songDuration * 20;
    console.log(durationInLevelDistance)
    let factor;
    if(durationInLevelDistance > 1500)
    {factor = 5}
    else
    {
      factor = 10
    }
    plattforms = [
      
      
      new Plattform({ x: 0, y: 500, image: plattformImage }),
      new Plattform({ x: 800, y: 350, image: plattformImage }),
      new Plattform({ x: 1200, image: plattformImage }),
      new Plattform({ x: 1800, y: 450, image: plattformImage }),
      new Plattform({ x: 2400, image: plattformImage }),
      new Plattform({ x: 3000, image: plattformImage }),
      new Plattform({
        x: durationInLevelDistance,
        y: 250,
        image: adsImage
      })
    ]

    console.log(durationInLevelDistance)

    enemies = [
      new Enemies({ x: 800, y: 400, image: bossImage }),
      new Enemies({ x: 1500, y: 250, image: alienImage })
    ]

    scenery = [
      new Scenery({
        x: 0,
        y: 0,
        image: createImage(mountains)
      }),
      new Scenery({
        x: 0,
        y: 250,
        image: createImage(trees)
      }),
      new Scenery({
        x: 0,
        y: 350,
        image: createImage(grass)
      }),
      new Scenery({
        x: 0,
        y: 450,
        image: createImage(grass)
      }),
      
    ]

    scrollOffset = 0

  }

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    //console.log(deltaTime)
    requestAnimationFrame(animate)
    ctx.fillStyle = 'white'
    
   
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    scenery.forEach(scenery => {
      scenery.draw()
    }
    )

    plattforms.forEach(plattform => {
      plattform.draw()
    })

    enemies.forEach(enemy => {
      enemy.draw()
      enemy.update()
    })

    player.update()
    if (keys.right.pressed && player.position.x < (canvas.width / 4)) {
      player.velocity.x = player.speed
    }
    else if ((keys.left.pressed && player.position.x > (canvas.width / 8))
      || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
      player.velocity.x = -player.speed
    }
    else {
      player.velocity.x = 0

      if (keys.right.pressed ) {
        scrollOffset += player.speed
        plattforms.forEach(plattform => {
          plattform.position.x -= player.speed
        })
        scenery.forEach(scenery => {
          scenery.position.x -= player.speed * 0.66
        })
        enemies.forEach(enemy => {
          enemy.position.x -= player.speed
        })

      }
      else if (keys.left.pressed && scrollOffset > 100) {
        scrollOffset -= 5
        plattforms.forEach(plattform => {
          plattform.position.x += player.speed
        })
        scenery.forEach(scenery => {
          scenery.position.x += player.speed * 0.66
        })
        enemies.forEach(enemy => {
          enemy.position.x += player.speed
        })
      }

    }


    plattforms.forEach(plattform => {

      if (player.position.y + player.height <= (plattform.position.y + (playerOffsetY*1.5))
        && player.position.y + player.height + player.velocity.y >= (plattform.position.y)
        && player.position.x + player.width >= plattform.position.x
        && player.position.x <= plattform.position.x + (plattform.width / 2)) {
        player.velocity.y = 0
        if (isJumping) {
          isJumping = false

          if (keyBeforeJump === 'right') {
            keyBeforeJump = 'none'
          }
          else {
            keys.up.pressed = false
            currentKey = 'none'
          }
        }
      }
    })

    enemies.forEach(enemy => {

      if (player.position.y <= enemy.position.y + enemy.height
        && player.position.y + player.height + player.velocity.y - playerOffsetY >= enemy.position.y + (enemy.height / 4)

        && player.position.x + (player.width / 2) >= enemy.position.x
        && player.position.x <= enemy.position.x) {

        player.velocity.y = 0

        init()
        alert("You lose!")
      }

    })
    if (isJumping) { player.currentSprite = player.sprites.jump.right }
    else {
      if (currentKey == 'right' && player.currentSprite !== player.sprites.run.right) {

        player.frames = 1
        player.currentSprite = player.sprites.run.right

      } else if (currentKey === 'left' && player.currentSprite !== player.sprites.run.left) {

        player.frames = 1
        player.currentSprite = player.sprites.run.left

      } else if (currentKey === 'up' && player.currentSprite !== player.sprites.jump.right) {

        player.currentSprite = player.sprites.jump.right

      } else if (currentKey === 'none') {


        player.currentSprite = player.sprites.stand.right


      }
    }


    
    
    if (scrollOffset > (songDuration * 20)+400) {

      init()
      alert("Congratulations, you win!")
    }

    if (player.position.y > canvas.height) {

      init()
      alert("You lose!")
    }

  }

  /*=============================================================*/
  /*                     EVENT LISTENERS                          |
  /*=============================================================*/

  addEventListener('keydown', ({ keyCode }) => {

    switch (keyCode) {
      case 65:
        console.log('left')
        keys.left.pressed = true
        currentKey = 'left'
        break

      case 83:
        console.log('down')
        break

      case 68:
        console.log('right')
        keys.right.pressed = true
        currentKey = 'right'
        break

      case 87:
        if (!isJumping) {
          if (currentKey != 'none') {
            keyBeforeJump = currentKey;
          }
          keys.up.pressed = true
          currentKey = 'up'
          console.log('up')
          player.velocity.y -= 15
          isJumping = true
          break
        }
        else {
          break
        }

    }

  })

  addEventListener('keyup', ({ keyCode }) => {

    switch (keyCode) {
      case 65:
        keys.left.pressed = false
        currentKey = 'none'
        console.log('left')
        break

      case 83:
        console.log('down')
        break

      case 68:
        console.log('right')
        keys.right.pressed = false
        currentKey = 'none'
        break

      case 87:

        console.log('up')

        break

    }

  })


  /*=============================================================*/
  /*                  SCENE INITIALIZATION                        |
  /*=============================================================*/

  init()
  animate()

}

