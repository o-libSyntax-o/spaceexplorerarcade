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
        let id = (JSON.parse(localStorage.getItem('saveGame')).id) + 1;
        button = this.add.image(350, config.height / 2, 'replay').setInteractive();
        const title_text = this.add.text(25, config.height / 4, "Reached level:\n" + id, {
            font: "55px Courier",
            fill: "#00ff00",
            align: "center",
        });

        button.once('pointerup', replay, this);

        button.on('pointerover', function (event) {
            button.setScale(0.75, 0.75);
        });

        button.on('pointerout', function (event) {
            button.setScale(1, 1);
        });

        homeBtn = this.add.image(150, config.height / 2, 'home').setInteractive();

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
            let data = JSON.parse(localStorage.getItem('saveGame'));
            data.lives = 3;
            localStorage.setItem('saveGame', JSON.stringify(data));
            this.scene.stop()
            this.scene.start("gameScene");
        }
    }

});