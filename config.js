let config = {
  type: Phaser.AUTO,
  width: 500,
  height: 800,
  backgroundColor: "#000000",
  parent: "phaser-example",
  physics: { default: "arcade", arcade: { debug: false } },
  //Add scenes here
  scene: [introScene, homeScene, gameScene, midScreen, gameOver],
};

let game = new Phaser.Game(config);
