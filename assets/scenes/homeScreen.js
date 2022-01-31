var homeScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function homeScene ()
    {
        Phaser.Scene.call(this, { key: 'homeScene' });
    },

    preload: function ()
    {
        this.load.image("start", "assets/images/start.png");
        this.load.json("template", "assets/data/player.json");
        this.load.atlas("title", "assets/images/title.png", "assets/data/title.json");
    },

    create: function ()
    {
        play = this.add.image(config.width / 2, 725, "start").setInteractive();
        play.once('pointerup', replay, this);
        play.setDepth(1);
        play.setScale(0.8, 0.8);

        play.on('pointerover', function (event) {
            play.setScale(0.6, 0.6);
        });

        play.on('pointerout', function (event) {
            play.setScale(0.8, 0.8);
        });

        background = this.add.sprite(250,390, "title");

        function replay(){
            play.setScale(0.8, 0.8);
            localStorage.setItem('saveGame', JSON.stringify(this.cache.json.get("template")));
            this.scene.stop()
            this.scene.start("gameScene"); 
        }

        this.anims.create({
            key: "thetitle",
            frameRate: 5,
            frames: this.anims.generateFrameNames("title", {
              prefix: "title",
              start: 9,
              end: 1,
              zeroPad: 0,
            }),
            repeat: -1,
            yoyo: true
          });

        background.play("thetitle");
    },

    update: function(){

    }

});