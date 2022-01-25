let gameTime;
let totalScore;

let gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function gameScene() {
    Phaser.Scene.call(this, { key: "gameScene" });
  },

  preload: function () {
    this.load.json("template", "assets/data/player.json"); //Default player data template\
    this.load.image("earth", "assets/images/earth.png");
    this.load.image("ship", "assets/images/spaceship.png");
    this.load.image("star", "assets/images/star.png")
    this.load.image("asteroid", "assets/images/asteroid.png")
  },

  update: function () {

    if (cursors.left.isDown)
    { 
      ship.x -= 5;
      ship.setAngle(-15);
    }
    else if (cursors.right.isDown)
    {
      ship.x += 5;
      ship.setAngle(15);
    } 
    else{
      ship.angle = 0
    }

    earth.data.values.score += (1 * earth.data.get("multiplier")); //Update score by multiplier every update

  },

  create: function () {
    const text = this.add.text(0, 0, '', { font: '16px Courier', fill: '#00ff00' });//Adds the planet into scene, all game data is stored in this object
    this.physics.world.setBounds(0,0, config.width, config.height, true, true);
    earth = this.add.image(0, 0, "earth").setAlpha(0);
    ship = this.physics.add.image(config.width / 2, 700, 'ship')
    asteroid_collider = this.physics.add.group();
    ship.setCollideWorldBounds(true);
    ship.setScale(0.15, 0.15);



    cursors = this.input.keyboard.createCursorKeys();

    let data = this.cache.json.get("template");

    //Func for returning data in local storage
    function loadData() {
      try {
        //Return value of storage string
        //If the user doesn't have save data it loads from template
        if (localStorage.getItem("saveGame") == undefined) {
          localStorage.setItem("saveGame", JSON.stringify(data));
          return localStorage.getItem("saveGame");
          //If game data is found it loads from localStorage
        } else {
          return localStorage.getItem("saveGame");
        }
        //Error Exception
      } catch (e) {
        return (
          "[ Space Tycoon ] Encountered an error while loading data: " +
          e.message
        );
      }
    }

    //Func for saving new data to localStorage periodically...
    let saveData = async function(data) {
      try {
        //Gets all data from game object and saves it
        localStorage.setItem("saveGame", JSON.stringify(earth.data.getAll()));
        return "[ Space Tycoon ] A save was instantiated";
        //Error Exception
      } catch (e) {
        return (
          "[ Space Tycoon ] Encountered an error while saving data: " +
          e.message
        );
      }
    }
    //Asteroid logic
    var Asteroid = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

      function Asteroid (scene)
      {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'asteroid');
      },

      fire: function ()
      {
          var ran = Phaser.Math.Between(3, 6);
          this.speed = Phaser.Math.Between(3,5);
          this.setPosition(Phaser.Math.Between(5, config.width - 5), -50);
          this.setAngle(Phaser.Math.Between(0, 360));
          this.setScale(ran, ran);
          this.setActive(true);
          this.setVisible(true);
      },

      update: function ()
      {
          this.y += this.speed;

          if (this.y > 900)
          {
              this.setActive(false);
              this.setVisible(false);
          }
      }

    });

    asteroids = this.add.group({
      classType: Asteroid,
      maxSize: 10,
      runChildUpdate: true
    });

    

    //  Create the objects in advance, so they're ready and waiting in the pool
    asteroids.createMultiple({ quantity: 10, active: false });
    //Timer to spawn the asteroids
    this.time.addEvent({ delay: 250, callback: function(){
      asteroid = asteroids.get();
      if (asteroid)
      {
        asteroid_collider.add(asteroid, false);
        asteroid.fire();
      }
    }, callbackScope: this, loop: true });
    
    function hitAsteroid(ship, asteroid_collider){
      asteroid_collider.setVisible(false);
      asteroid_collider.body.enable = false;
      if(earth.data.get("lives") > 1){
        earth.data.values.lives--;
      } else {
        earth.data.values.lives--;
        this.scene.start("gameOver");
      }
    }
    this.physics.add.overlap(asteroid_collider, ship, hitAsteroid, null, this);

    // -- ALL GAME DATA ELEMENTS --
    //Load player data into the game object
    earth.setData(JSON.parse(loadData()));
    // When the data changes it will save everything to localStorage
    earth.on("changedata", function (gameObject, key, value) {
      text.setText("Score: " + earth.data.get("score") + "\nLives: " + earth.data.get("lives"));
    });
    //
    //ADD GAME LOGIC BELOW
    //
    //The base game time for calculating score
      gameTime = this.time.addEvent({ delay: 5000, callback: function(){
        //Save Data
        console.log(saveData());
        //Add a multiplier to score every 5 seconds
        earth.data.values.multiplier += 10;
    }, callbackScope: this, loop: true });
    

  },
});
