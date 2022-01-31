var midScreen = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function midScreen ()
    {
        Phaser.Scene.call(this, { key: 'midScreen' });
    },

    preload: function ()
    {
        this.load.image("earth", "assets/images/earth.png");
        this.load.image("moon", "assets/images/moon.png");
        this.load.image("home", "assets/images/home.png");
        this.load.image("play", "assets/images/start.png");
        this.load.image("endless", "assets/images/galaxy.png")
        this.load.json("template", "assets/data/player.json");
    },

    create: function ()
    {   
        function getName(){ 
            return JSON.parse(loadData())
        }

        function getTitle(){ 
            let titles = ["E A R T H", " M O O N", " M A R S", "ENDLESS"];
            return titles[JSON.parse(loadData()).id]
        }

        //Not constant
        planet = this.add.image(0, config.height / 4, getName().level);
        home = this.add.image(350, 275, "home").setInteractive().setScale(0.5,0.5);
        play = this.add.image(425, 275, "play").setInteractive().setScale(0.5,0.5)

        let data = JSON.parse(loadData());

        play.once('pointerup', start, this);
        home.once('pointerup',goHome, this);
        

        function start(){
            let levels = ['earth', 'moon', 'mars'];
            if (data.id > levels.length - 1){
                data.level = "endless"
            } else{
                data.level = levels[data.id + 1]
            }
            data.id += 1;
            data.max += 10;
            data.lives = 3;
            data.score = 0;
            data.multiplier += 1;
            localStorage.setItem('saveGame', JSON.stringify(data));
            this.scene.stop();
            this.scene.start('gameScene')
        }

        function goHome(){
            this.scene.stop();
            this.scene.start("homeScene");
        }

        const planet_text = this.add.text(300, 190, getTitle(), {
            font: "32px Courier",
            fill: "#FFFFFF",
        });

        //Constants vvv
        const title_text = this.add.text(315, 150, "You've reached: ", {
            font: "16px Courier",
            fill: "#00ff00",
        });
        const explored_text = this.add.text(180, 450, "THING'S WE SAW:", {
            font: "16px Courier",
            fill: "#FFFFFF",
        });
        info_box = this.add.rectangle(250, 630, config.width - 30, 300);
        info_box.setStrokeStyle(2, 0x00ff00);

    },

    update: function(){
        planet.angle += 0.2
    }

});