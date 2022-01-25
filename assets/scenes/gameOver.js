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
        this.load.json("template", "assets/data/player.json");
    },

    create: function ()
    {
        button = this.add.image(config.width / 2, config.height / 2, 'replay').setInteractive();

        button.setScale(0.25, 0.25);

        button.once('pointerup', replay, this);

        button.on('pointerover', function (event) {
            button.setScale(0.20, 0.20);
        });

        button.on('pointerout', function (event) {
            button.setScale(0.25, 0.25);
        });

        function replay(){
            button.setScale(0.25, 0.25);
            localStorage.setItem("saveGame", JSON.stringify(this.cache.json.get("template")));
            this.scene.stop()
            this.scene.start("gameScene");
            
            
        }
    }

});