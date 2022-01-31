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
    },

    create: function ()
    {
        play = this.add.image(config.width / 2,650, "start").setInteractive();
        play.once('pointerup', replay, this);

        function replay(){
            play.setScale(0.8, 0.8);
            localStorage.setItem('saveGame', JSON.stringify(this.cache.json.get("template")));
            this.scene.stop()
            this.scene.start("gameScene"); 
        }
    },

    update: function(){

    }

});