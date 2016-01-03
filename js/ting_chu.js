TingChuGame = function(game) {};

(function() {

  var keys = [
    {
      text: "J",
      key: Phaser.KeyCode.J
    },
    {
      text: "I",
      key: Phaser.KeyCode.I
    },
    {
      text: "3",
      key: Phaser.KeyCode.THREE
    },
    {
      text: "G",
      key: Phaser.KeyCode.G
    },
    {
      text: "4",
      key: Phaser.KeyCode.FOUR
    },
    {
      text: "5",
      key: Phaser.KeyCode.FIVE
    },
    {
      text: "Q",
      key: Phaser.KeyCode.Q
    },
    {
      text: "Z",
      key: Phaser.KeyCode.Z
    },
    {
      text: "X",
      key: Phaser.KeyCode.X
    },
    {
      text: "U",
      key: Phaser.KeyCode.U
    },
    {
      text: "A",
      key: Phaser.KeyCode.A
    },
    {
      text: "B",
      key: Phaser.KeyCode.B
    },
    {
      text: "C",
      key: Phaser.KeyCode.C
    },
    {
      text: "D",
      key: Phaser.KeyCode.D
    },
    {
      text: "E",
      key: Phaser.KeyCode.E
    },
    {
      text: "F",
      key: Phaser.KeyCode.F
    },
    {
      text: "H",
      key: Phaser.KeyCode.H
    },
  ];
  var restTime = 1000;
  var graphics;
  var isStageStarted;
  var isTimerStarted;
  var imageRose;
  var stop;
  var timer;
  var speed;
  var counter;
  TingChuGame.prototype = {

    preload: function() {
      game.load.image("TingChuRose", "media/ting_chu/rose.png");
      game.load.image("TingChuRoseDie", "media/ting_chu/rose_die.png");
      game.load.image("TingChuBg", "media/ting_chu/bg.png");

      isStageStarted = false;
      isTimerStarted = false;
    },
    create: function() {
      game.stage.setBackgroundColor(0xFFFFFF);

      var imageBg = game.add.image(0, 0, "TingChuBg");
      var bgLayer = game.add.group();
      bgLayer.add(imageBg);
      bgLayer.z = 0;

      var roseWidth = 184;
      var roseHeight = 306;
      var scaleFactor = 1;
      var roseX = gameWidth / 2;
      var roseY = gameHeight;
      imageRose = game.add.image(roseX, roseY, "TingChuRose");
      imageRose.anchor.set(0.5, 1);
      imageRose.scale.set(scaleFactor);

      var roseLayer = game.add.group();
      roseLayer.add(imageRose);
      roseLayer.z = 1;

      isStageStarted = false;
      stop = false;
      timer = 0;
      speed = 2000;
      counter = 0;
      var createTimer = game.time.events.loop(speed, showKey, null);
    },
    update: function() {
      if (game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
        isStageStarted = true;
      }
    }
  }
  function showKey() {
    counter++;
    var index = game.rnd.between(0, keys.length - 1);
    var time = 0 ;
    var time_interval = 500;
    var graphics;
    var initialKeyboardWidth = 70;
    var initialKeyboardHeight = initialKeyboardWidth;
    var initialKeyboardX = gameWidth/2;
    var initialKeyboardY = 100;

    graphics = game.add.graphics();
    graphics.beginFill(0x000000);
    graphics.drawRoundedRect(
      initialKeyboardX + initialKeyboardWidth / 4,
      initialKeyboardY + initialKeyboardHeight / 4 ,
      initialKeyboardWidth,
      initialKeyboardHeight,
      10
    );
    graphics.endFill();

    var keyText = game.add.text(
      initialKeyboardX + initialKeyboardWidth / 2 ,
      initialKeyboardY + initialKeyboardHeight / 2,
      keys[index].text,
      {
        font: "40px Arial",
        fill: "#FFFFFF",
      }
    );
    var timer = game.time.events.loop(time_interval - counter * 30 , function(){
      time += time_interval;
      height = time/100;
      graphics.y += height;
      keyText.y += height;
    }, time);
    game.time.events.loop(10 , function(){
      if(game.input.keyboard.isDown(keys[index].key)){
        game.time.events.remove(timer);
        graphics.clear();
        keyText.text = "";
      }
      if(keyText.y > gameHeight - 306){
        if(!stop){
          stop = true;
          imageRose.destroy();
          var roseWidth = 303;
          var roseHeight = 178;
          var scaleFactor = 1;
          var roseX = gameWidth / 2;
          var roseY = gameHeight;
          imageRose = game.add.image(roseX, roseY, "TingChuRoseDie");
          imageRose.anchor.set(0.5, 1);
          imageRose.scale.set(scaleFactor);
          game.add.text(
            gameWidth/2 ,
            gameHeight/4,
            "柱柱姊挺了"+counter+"下，已經挺不柱了",
            {
              font: "40px Arial",
              fill: "#000000",
            }
          );
        }
        game.time.events.add(5000,function(){
          game.state.start("MainMenu");
        })

      }
    }, time);
  }
})();
