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
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
    },

    create: function ()
    {   
        function getName(){ 
            return JSON.parse(loadData())
        }

        //Not constant
        planet = this.add.image(0, config.height / 4, getName().level);
        const planet_text = this.add.text(300, 190, "E A R T H", {
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