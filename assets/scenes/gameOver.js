var gameOver = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function gameOver ()
    {
        Phaser.Scene.call(this, { key: 'gameOver' });
    },

    preload: function ()
    {
        this.load.image("replay", "assets/images/replay.png");
        this.load.image("home", "assets/images/home.png");
        this.load.json("template", "assets/data/player.json");
    },

    create: function ()
    {
        button = this.add.image(350, config.height / 2, 'replay').setInteractive();

        button.once('pointerup', replay, this);

        button.on('pointerover', function (event) {
            button.setScale(0.75, 0.75);
        });

        button.on('pointerout', function (event) {
            button.setScale(1, 1);
        });

        homeBtn = this.add.image(200, config.height / 2, 'home').setInteractive();

        homeBtn.once('pointerup', home, this);

        homeBtn.on('pointerover', function (event) {
            homeBtn.setScale(0.75, 0.75);
        });

        homeBtn.on('pointerout', function (event) {
            homeBtn.setScale(1, 1);
        });

        function home(){
            homeBtn.setScale(1, 1);
            this.scene.stop();
            this.scene.start("homeScene");
        }

        function replay(){
            button.setScale(1, 1);
            this.scene.stop()
            this.scene.start("gameScene");
        }
    }

});