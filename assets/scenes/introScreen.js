let config_cache = JSON.parse(window.localStorage.getItem("config"));
//Declares the Scene as a variable which is imported into index.html
let introScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function introScene() {
    Phaser.Scene.call(this, { key: "introScene" });
  },

  preload: function () {
    //Load First Logo Image
    this.load.image("logo", "/assets/images/logo.png");
  },

  create: function () {
    let homeS = this.scene.get("homeScene");
    // Sets zone to half the size of the sceeen height and width from config
    const logo = this.add.image(0, 0, "logo").setAlpha(0);
    //TO - DO -- Make it a method for future use
    Phaser.Display.Align.In.Center(
      logo,
      this.add.zone(config.width / 2, config.height / 2, 250, 250)
    );
    // Adds a Tween to the game manager for the fading in effect
    this.tweens.add({
      targets: logo,
      alpha: { value: 0.8, hold: 500 },
      duration: 2000,
      yoyo: true,
      loop: 0,
      onComplete: function () {
        //Makes picture transparent and removes tween from manager (lag prevention)
        logo.setAlpha(0);
        this.remove();
        //If completed will log that it was removed
        console.log(
          "[ SPACE TYCOON ] Logo Tween complete - It has been removed"
        );
        homeS.scene.stop();
        homeS.scene.start('homeScene');
      },
    });
  },

  update: function () {},
});
