$(document).ready(function(){
  //////////////////////////////////
  // Sprites
  //////////////////////////////////
  var player_img = $(".player")
  var sprite = "player";
  changeSprite();


  //Button Click Events
  $("#dinosaur").click(function(){
    sprite = "dinosaur";
    changeSprite();
  })
  $("#player").click(function(){
    sprite = "player";
    changeSprite();
  })
  $("#batman").click(function(){
    sprite = "batman";
    changeSprite();
  })
  $("#kid").click(function(){
    sprite = "kid";
    changeSprite();
  })
  //change sprite function
  function changeSprite(){
    if (sprite == "player") {
      player_img.attr('src', 'images/standing-man.gif');
      player_img.css({"width":"40px","height":"100px","bottom":"0","left":"0"})
    }else if(sprite == "dinosaur"){
      player_img.attr('src', 'images/dinosaur.gif');
      player_img.css({"width":"60px","height":"100px","right":"0","bottom":"0","left":"-10px"})
    }else if(sprite == "kid"){
      player_img.attr('src', 'images/running-kid.gif');
      player_img.css({"width":"120px","height":"100px","position":"absolute","left":"-40px","bottom":"0"})
    }else if(sprite == "batman"){
      player_img.attr('src', 'images/batman.gif');
      player_img.css({"width":"120px","height":"100px","position":"absolute","left":"-40px", "bottom":"-10px"})
    }

  }


  //////////////////////////////////
  // Game
  /////////////////////////////////
  $("#restart").hide();

  // set up variables
  var playing = false;

  //intervals
  var jumpInt;
  var movObs;
  var genObs;

  var genInterval = 800;

  // score start
  var score;
  var day_night;
  var high_score = 0;
  $("#high_score").html(high_score)

  //character
  var character = $("#character");

  var characterRight;
  var characterLeft;
  var characterTop;
  var characterBott;

  // set up variables for character
  var yacceleration;
  var yvelocity;

  var ypos;

  var jumping = false;
  var pressed = false;

  //board
  var board = $("#container");

  var boardLeft;
  var boardRight;
  var boardTop;
  var boardBott;

  //obstacle
  var obs = 0;

  var obstacleSpeed;

  // set up obstacles array
  var obstacleArray = [];

  // on spacebar and if the game is not running
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //START GAME//
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  // start the game and change relevant gifs
  $("body").keydown(function (e) {
    if(e.keyCode == 32 && playing == false){
      //clear obstacles
      for (var i = obstacleArray.length-1; i>=0; i--){

        if (obstacleArray.length>0) {
          $(obstacleArray[i].id).remove();
          obstacleArray.splice(i,1)
        }
      }
      // start the game
      $("#restart").hide();

      ypos = 259;
      setCharPos();

      jumping = false;
      pressed = false;

      obstacleSpeed = 0.3;
      game();

      score = 0;
      day_night = 0;
      genInterval = 800;

      playing=true;

      $("#high_score").html(high_score)
      // hide the instructions and the buttons
      $(".start-game").html("")
      $(".buttons").css({"display":"none"})
      // change sprite to running sprite
      if(sprite == "player"){
        player_img.attr('src', 'images/running-man.gif');
        player_img.css({"width":"40px","height":"100px","left":"0"})
      }else if(sprite == "dinosaur"){
        player_img.attr('src', 'images/dinosaur-moving.gif');
      }
    }
  });

  // if the player is already jumping do not jump again
    // on spacebar jump
  $("body").keydown(function (e) {
      if(e.keyCode == 32 && pressed == false && jumping == false){
        jump();
        jumping = true;
        yacceleration = 0.1;
        yvelocity = -6.6;
        ypos = 259;
        pressed = true;
      }

    });

  ///////////////////////////////////
  //Obstacle Functions
  //////////////////////////////////
  // game function
  // generate and move obstacles and update the score
  function game(){

    //potention to generate object every 800ms
    genObs = setInterval(function(){
      var num = Math.random();
      //70% change to generate object
      if(num < 0.7){
        var newObs = generateObstacle();
        obstacleArray.push(newObs);
      }
    },genInterval)
    // move obstacles in the array and update the score
    movObs = setInterval(function(){

      for(o of obstacleArray){
        moveObstacle(o)
      }
      $("#score").html(score)

      // set day day
      dayNight();

    },5);
  }

  function generateObstacle(){
     //get a new obstacle id
     var newId = "#obstacle" + obs
     // get random heights and widths
     var ranHeight = Math.floor(Math.random()*(3))
     switch (ranHeight) {
      case 0:
        ranHeight = 58;
        break;
      case 1:
        ranHeight = 87;
        break;
      case 2:
        ranHeight = 100;
        break;
       default:
        break;

     }


     var ranWidth = Math.floor(Math.random()*(3))
     switch (ranWidth) {
      case 0:
          ranWidth = 38;
          if (sprite == "player") {
            var image = "<img class='barrier-img"+obs+"' src='images/hurdle.gif'>"
          }else{
            var image = "<img class='barrier-img"+obs+"' src='images/cactus1.gif'>"

          }
        break;
      case 1:
        ranWidth = 76;
        if (sprite == "player") {
          var image = "<img class='barrier-img"+obs+"' src='images/hurdle.gif'>"
        }else{
        var image = "<img class='barrier-img"+obs+"' src='images/cactus3.gif'><img class='barrier-img"+obs+"' src='images/cactus2.gif'>"
        }
        break;
      case 2:
        ranWidth = 100;
        if (sprite == "player") {
          var image = "<img class='barrier-img"+obs+"' src='images/hurdle.gif'>"
        }else{
          var image = "<img class='barrier-img"+obs+"' src='images/cactus2.gif'><img class='barrier-img"+obs+"' src='images/cactus3.gif'><img class='barrier-img"+obs+"' src='images/cactus1.gif'>"
        }
        break;
       default:
       ranWidth = 38;
         break;
     }

     //create a new object
     var newObstacle = {
       id: newId,
       class: ".barrier",
       left: 0,
       top: 0,
       xpos: 96,
       height: ranHeight,
       width: ranWidth
     }


     //create a new div
     $("#obstacles").append("<div id='obstacle"+obs+"' class='barrier'>"+image+"</div>")

     $(".barrier-img"+obs).css({"height": newObstacle.height,"float":"left"})
     if (sprite == "player") {
       //custom styling for the hurdle sprites, pushes down to give better look
       $(".barrier-img"+obs).css({"width": newObstacle.width,"top":"309px","height":newObstacle.height+10})

     }else{
       //styling for cacti to display multiple cacti properly
       if (newObstacle.width == 100) {
         $(".barrier-img"+obs).css({"width": 33,"float":"left"})
       }else if(newObstacle.width == 76){
         $(".barrier-img"+obs).css({"width": 38,"float":"left"})
       }
     }


     $(newObstacle.id).css({"height":newObstacle.height})
     $(newObstacle.id).css({"width":newObstacle.width})
     obs++
     return(newObstacle);
   }

  function moveObstacle(object){

    //get postitions
    obstaclePosition(object);
    characterPosition();

    object.xpos -= obstacleSpeed;
    //set object position
    $(object.id).css({
      "left": object.xpos + "%"
    });
    //check if object has collided
    horizontalCollisions(object);

    //check if object is out of the container
    hideCheck(object);

  };

  function obstaclePosition(object){
    // Find the left and top edge of the obstacle
    object.left = $(object.id).offset().left;
    object.top = $(object.id).offset().top;

  }

  function horizontalCollisions(object){
    //if object and character collide end the game
    if (characterRight >= object.left && characterBott >= object.top && object.left > 140-object.width) {
      console.log("over");

      //clear intevals
      clearInterval(jumpInt)
      clearInterval(movObs)
      clearInterval(genObs)

      //reset variables
      playing = false;
      obstacleSpeed=0;
      genInterval = 800;

      //update highscore
      if (high_score<score) {
        high_score = score;

      }

      //show restart text
      $("#restart").show();

      //show dead sprites
      if(sprite == "player"){
        player_img.attr('src', 'images/dead.gif');
        player_img.css({"height":"40px","width":"auto","left":"-85px"})
        // $(".character").css({"top":"275px"})
        ypos = 275;
        setCharPos();
      }else if(sprite == "dinosaur"){
        player_img.attr('src', 'images/dinosaur.gif');
      }
      //show buttons and instruction text
      $(".start-game").html("<h2>SPACE to Try Again</h2>")
      $(".start-game").show()
      $(".buttons").show()

    }
  };

  function hideCheck(object){
    //check if the obstacle is out of the container
    if(object.left <=50){
      //remove the object
      $(object.id).remove();
      obstacleArray.splice(0,1)
      //increase the score and the speed
      score++
      obstacleSpeed += 0.008;
      if (score % 10 == 0) {
        day_night++
      }
      if (genInterval >= 20){
        genInterval -= 10;
      }
    }
  }

  function dayNight(){
    //update the background for night/day
    if (day_night % 2 != 0) {
      $(".sliding-background").css({"background":"linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0, 0.4)), url(\"images/clouds-background.png\")"});
      //update restart text to white for better readability
      $("#restart").css({"color":"white"})
    }else{
      $(".sliding-background").css({

        "background":"linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255, 0.1)), url(\"images/clouds-background.png\")"
      })
      $("#restart").css({"color":"black"})
    }
  }
  /////////////////////////////////////
  //Character functions
  ////////////////////////////////////
  function characterPosition(){
    // Find the left and top edge of the character
    characterLeft = character.offset().left;
    characterTop = character.offset().top;

    // Find right and bottom edge of the character
    characterRight = characterLeft + character.width();
    characterBott = characterTop + character.height();
  };

  function boardPosition(){
    // Find the left and top edge of the board
    boardLeft = board.offset().left;
    boardTop = board.offset().top;

    // Find right and bottom edge of the board
    boardRight = boardLeft + board.width();
    boardBott = boardTop + board.height();
  }

  function jump(){

    jumpInt = setInterval(function(){
      //get positions
      characterPosition();
      boardPosition();

      //move the character and check if it has hit the ground
      setCharPos();
      move();
      verticalCollisions();



    },5)
  }

  function setCharPos(){
    character.css({
      "top": ypos + "px"
    });
  }

  function move(){
    yvelocity += yacceleration;
    ypos+=yvelocity;
  };

  function verticalCollisions(){
    //jump
    if (jumping == true) {
      if(sprite == "player"){
        //update jumping sprite
        player_img.attr('src', 'images/hurdling-man.gif');
        player_img.css({"width":"70px","height":"90px","bottom":"0","left":"0"})
      }
      jumping = false;


    //land on ground
    }else{
      if (characterBott >= boardBott) {
        //change sprite back to running
        if(sprite == "player"){
          player_img.attr('src', 'images/running-man.gif');
          player_img.css({"width":"40px","height":"100px","bottom":"0","left":"0"})
        }

        clearInterval(jumpInt);
      //reset character variables 
      yvelocity = 0;
      yacceleration = 0;
      ypos = 259;
      setCharPos();
      pressed = false;

      }
    }
  }

});
