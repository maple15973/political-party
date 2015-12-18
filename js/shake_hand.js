var ShakeHand = {};

(function () {
	// ---------- Global Constant

	// ---------- Intro
	var landingPage;

	ShakeHand.Intro = function (game) {};
	ShakeHand.Intro.prototype = {
		preload: function () {
			game = this.game;

			game.load.image("landingPage", "media/stage_intro.png");
		},
		create: function () {
			game.stage.backgroundColor = '#FFFFFF';

			landingPage = game.add.image(0, 0, "landingPage");
			landingPage.inputEnabled = true;
			landingPage.scale.set(game.width/landingPage.width);
			landingPage.events.onInputDown.add(function() {
	      game.state.start("ShakeHandGame");
	    }, landingPage);

		var skipText = this.game.add.text(
      this.game.width/2- 120,
      this.game.height - 100,
      "第一話 | 馬習會",
      {
        font: "40px PingFang-UltraLight",
        fill: "#000000"
      }
    );

		// small 20px
		// tiny 15px
		},
		update: function () {

		}
	};
	// ---------- Game
	var timer = 0;
	var mics = [];
	var micMaxY, micMinY;
	var shakeHandSprite;
	ShakeHand.Game = function (game) {};
	ShakeHand.Game.prototype = {
		preload: function () {
			game = this.game;

			game.load.image("mic1", "media/shake_hand/mic1.png");
			game.load.image("mic2", "media/shake_hand/mic2.png");
			game.load.image("mic3", "media/shake_hand/mic3.png");
			game.load.image("mic4", "media/shake_hand/mic4.png");
			game.load.spritesheet("shakeHandSprite", "media/shake_hand/shake_hand_628x417.png", 628, 417, 4);
		},
		create: function () {
			screenHeight = game.height;
			screenWidth  = game.width;
			micMaxY = screenHeight - 280;
			micMinY = screenHeight - 380;
			game.stage.backgroundColor = "#FFFFFF";

			for (var i = 0; i < 4; i++) {
				mics[i] = game.add.image(250 + i*100, screenHeight - 330, "mic" + (i+1));
				mics[i].scale.set(0.2);
			}

			shakeHandSprite = game.add.sprite(screenWidth/2 - 628/2, 0, "shakeHandSprite");
			shakeHandSprite.animations.add("shake");
			shakeHandSprite.smoothed = true;
			shakeHandSprite.animations.play("shake", 3, true);
		},
		update: function () {
			timer++;

			if (timer%10 == 0) {
				console.log('update');
				updateMic();
			}

			if (timer == 300) timer = 0;
		},
	};

	function updateMic () {
		for (var i = 0; i < mics.length; i++) {
			if (game.rnd.integerInRange(0, 1) && (mics[i].y+3) <= micMaxY) {
				mics[i].y += 3;
			}
			else if (mics[i].y-3 >= micMinY) {
				mics[i].y -= 3;
			}
			else {
				mics[i].y += 3;
			}
		}
	}
})();
