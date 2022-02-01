let gameTime;
let totalScore;
let gameSpeed;
let desired = 4500;

let gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function gameScene() {
    Phaser.Scene.call(this, { key: "gameScene" });
  },

  preload: function () {
    this.load.json("template", "assets/data/player.json"); //Default player data template\
    this.load.atlas("ship", "assets/images/ship.png", "assets/data/ship.json");
    this.load.atlas(
      "stars",
      "assets/images/stars.png",
      "assets/data/stars.json"
    );
    this.load.image("earth", "assets/images/earth.png");
    this.load.image("asteroid", "assets/images/asteroid.png");
  },

  update: function () {
    if (cursors.left.isDown) {
      ship.setVelocityX(-700);
      ship.setAngle(-15);
    } else if (cursors.right.isDown) {
      ship.setVelocityX(700);
      ship.setAngle(15);
    } else {
      ship.setVelocityX(0);
      ship.setAngle(0);
    }

    earth.data.values.score += 1; //Update score by multiplier every update
  },

  create: function () {
    let max = JSON.parse(localStorage.getItem("saveGame"));
    let gameS = this.scene.get("gameScene");
    this.physics.world.setBounds(0, 0, config.width, config.height, true, true);

    const text = this.add.text(0, 0, "", {
      font: "16px Courier",
      fill: "#00ff00",
    }); //Adds the planet into scene, all game data is stored in this object
    earth = this.add.image(0, 0, "earth").setAlpha(0);
    ship = this.physics.add.sprite(config.width / 2, 700, "ship", 0);
    stars = this.physics.add.sprite(250, 400, "stars");
    ship.setCollideWorldBounds(true);
    ship.setScale(1.5, 1.5);

    this.anims.create({
      key: "theship",
      frameRate: 10,
      frames: this.anims.generateFrameNames("ship", {
        prefix: "ship",
        start: 3,
        end: 0,
        zeroPad: 0,
      }),
      repeat: -1,
      yoyo: true,
    });

    this.anims.create({
      key: "thestars",
      frameRate: 15,
      frames: this.anims.generateFrameNames("stars", {
        prefix: "stars",
        start: 4,
        end: 0,
        zeroPad: 0,
      }),
      repeat: -1,
      yoyo: true,
    });

    ship.play("theship");
    stars.play("thestars");

    asteroid_collider = this.physics.add.group();

    cursors = this.input.keyboard.createCursorKeys();

    //Asteroid logic
    let Asteroid = new Phaser.Class({
      Extends: Phaser.GameObjects.Sprite,
      initialize: function Asteroid(scene) {
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, "asteroid");
      },

      fire: function () {
        let ran = Phaser.Math.FloatBetween(0.05, 0.65);
        this.speed = Phaser.Math.Between(
          (3 * max.multiplier) / 2,
          (5 * max.multiplier) / 2
        );
        this.setPosition(Phaser.Math.Between(5, config.width - 5), -50);
        this.setAngle(Phaser.Math.Between(0, 360));
        this.setScale(ran, ran);
        this.setActive(true);
        this.setVisible(true);
      },

      update: function () {
        this.y += this.speed;

        if (this.y > 900) {
          this.setActive(false);
          this.setVisible(false);
        }
      },
    });

    asteroids = this.add.group({
      classType: Asteroid,
      maxSize: max.max,
      runChildUpdate: true,
    });
    //  Create the objects in advance, so they're ready and waiting in the pool
    asteroids.createMultiple({ quantity: max.max, active: false });

    //Timer to spawn the asteroids
    this.time.addEvent({
      delay: 500,
      callback: function () {
        asteroid = asteroids.get();
        if (asteroid) {
          asteroid_collider.add(asteroid, false);
          asteroid.fire();
        }
      },
      callbackScope: this,
      loop: true,
    });

    function hitAsteroid(ship, asteroid_collider) {
      asteroid_collider.setVisible(false);
      asteroid_collider.body.enable = false;
      if (earth.data.get("lives") > 1) {
        earth.data.values.lives--;
      } else {
        earth.data.values.lives--;
        saveData(earth.data);
        this.scene.stop();
        this.scene.start("gameOver");
      }
    }
    this.physics.add.overlap(asteroid_collider, ship, hitAsteroid, null, this);

    function getProgress(currentScore, desiredScore, x) {
      if (currentScore == desiredScore) {
        desired += 200;
        gameS.scene.start("midScreen");
      }
      return String(Math.round((100 * currentScore) / desiredScore)) + "%";
    }

    // -- ALL GAME DATA ELEMENTS --
    //Load player data into the game object
    let template = this.cache.json.get("template");
    earth.setData(JSON.parse(loadData(template)));
    // When the data changes it will save everything to localStorage
    earth.on("changedata", function (gameObject, key, value) {
      let score = earth.data.get("score");
      text.setText(
        "\nLives: " +
          earth.data.get("lives") +
          "\nLevel Progress: " +
          String(getProgress(score, desired))
      );
    });
    //
    //ADD GAME LOGIC BELOW
    //
    //The base game time for calculating score
    gameTime = this.time.addEvent({
      delay: 5000,
      callback: function () {
        //Save Data
        saveData(earth.data);
      },
      callbackScope: this,
      loop: true,
    });
  },
});
