let config = {
    type: Phaser.AUTO,
    width: 500,
    height: 800,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {default: 'arcade', arcade: { debug: true}},
    //Add scenes here
    scene: [ gameScene , gameOver],
    
};

let game = new Phaser.Game(config);