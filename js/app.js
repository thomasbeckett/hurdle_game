$(document).ready(function(){

  // Sprites

  var sprite = "player";
  changeSprite();

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




  // Game
  // set up variables
  var playing = false;

  //intervals
  var interval;
  var interval2;
  var interval3;

  // score start
  var score;

  //character
  var character = $("#character");

  var characterRight;
  var characterLeft;
  var characterTop;
  var characterBott;

  //board
  var board = $("#container");

  var boardLeft;
  var boardRight;
  var boardTop;
  var boardBott;

  //obstacle
  var obs = 0;

  var obstacleSpeed;

  // on spacebar and if the game is not running
  // start the game and change relevant gifs
  $("body").keydown(function (e) {
    if(e.keyCode == 32 && playing == false){
      //clear obstacles
      for (var i = obstacleArray.length-1; i>=0; i--){
        console.log(obstacleArray);
        if (obstacleArray.length>0) {
          $(obstacleArray[i].id).remove();
          obstacleArray.splice(i,1)
        }
      }
      // start the game
      game();
      score = 0;
      obstacleSpeed = 0.2;
      playing=true;

      // hide the instructions and the buttons
      $(".start-game").html("")
      $(".buttons").css({"display":"none"})
      // change sprite to running sprite
      if(sprite == "player"){
        $(".player").attr('src', 'images/running-man.gif');
        $(".player").css({"width":"40px","height":"100px","left":"0"})
      }else if(sprite == "dinosaur"){
        $(".player").attr('src', 'images/dinosaur-moving.gif');
      }
    }
  });

    // set up obstacles array
    var obstacleArray = [];

    // set up variables for character
    var yacceleration;
    var yvelocity;

    var ypos;

    var jumping = false;
    var pressed = false;

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

    //change sprite function
    function changeSprite(){
      if (sprite == "player") {
        $(".player").attr('src', 'images/running-man.gif');
        $(".player").css({"width":"40px","height":"100px","bottom":"0","left":"0"})
      }else if(sprite == "dinosaur"){
        $(".player").attr('src', 'images/dinosaur.gif');
        $(".player").css({"width":"60px","height":"100px","right":"0","bottom":"0","left":"-10px"})
      }else if(sprite == "kid"){
        $(".player").attr('src', 'images/running-kid.gif');
        $(".player").css({"width":"120px","height":"100px","position":"absolute","left":"-40px","bottom":"0"})
      }else if(sprite == "batman"){
        $(".player").attr('src', 'images/batman.gif');
        $(".player").css({"width":"120px","height":"100px","position":"absolute","left":"-40px", "bottom":"-10px"})
      }

  }
    ///////////////////////////////////
    //Obstacle Functions
    //////////////////////////////////
    // game function
    // generate and move obstacles and update the score
    function game(){

      //potention to generate object every 800ms
      interval3 = setInterval(function(){
        var num = Math.random();
        //70% change to generate object
        if(num < 0.7){
          var newObs = generateObstacle();
          obstacleArray.push(newObs);
          // console.log(obstacleArray);

        }
      },800)
      // move obstacles in the array and update the score
      interval2 = setInterval(function(){

        for(o of obstacleArray){
          moveObstacle(o)
        }
        $("#score").html(score)
        if (score == 10) {
          $(".sliding-background").css({"background":"linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0, 0.4)), url(\"images/clouds-background.png\")"})
        }

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
            var image = "<img class='barrier-img"+obs+"' src='images/cactus1.gif'>"
          break;
        case 1:
          ranWidth = 76;
          var image = "<img class='barrier-img"+obs+"' src='images/cactus3.gif'><img class='barrier-img"+obs+"' src='images/cactus2.gif'>"
          break;
        case 2:
          ranWidth = 100;
          var image = "<img class='barrier-img"+obs+"' src='images/cactus2.gif'><img class='barrier-img"+obs+"' src='images/cactus3.gif'><img class='barrier-img"+obs+"' src='images/cactus1.gif'>"
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
       if (newObstacle.width == 100) {
         $(".barrier-img"+obs).css({"width": 33,"float":"left"})
       }else if(newObstacle.width == 76){
         $(".barrier-img"+obs).css({"width": 38,"float":"left"})
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

    function characterPosition(){
      // Find the left and top edge of the character
      characterLeft = character.offset().left;
      characterTop = character.offset().top;

      // Find right and bottom edge of the character
      characterRight = characterLeft + character.width();
      characterBott = characterTop + character.height();
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

        clearInterval(interval)
        clearInterval(interval2)
        clearInterval(interval3)

        playing = false;
        obstacleSpeed=0;

        if(sprite == "player"){
          $(".player").attr('src', 'images/dead.gif');
          $(".player").css({"height":"40px","width":"auto","left":"-85px"})
          $(".character").css({"top":"275px"})
        }else if(sprite == "dinosaur"){
          $(".player").attr('src', 'images/dinosaur.gif');
        }

        $(".start-game").html("<h2>Try Again</h2>")
        $(".start-game").show()
        $(".buttons").show()

      }
    };

    function hideCheck(object){
      if(object.left <=50){
        $(object.id).remove();
        obstacleArray.splice(0,1)
        score++
        obstacleSpeed += 0.008;
      }
    }
    /////////////////////////////////////
    //Character functions
    ////////////////////////////////////

    function jump(){

      interval = setInterval(function(){
        //get positions
        characterPosition();
        boardPosition();

        //move the character and check if it has hit the ground
        setCharPos();
        move();
        verticalCollisions();



      },5)
    }

    function boardPosition(){
      // Find the left and top edge of the board
      boardLeft = board.offset().left;
      boardTop = board.offset().top;

      // Find right and bottom edge of the board
      boardRight = boardLeft + board.width();
      boardBott = boardTop + board.height();
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
        jumping = false;


      //land on ground
      }else{
        if (characterBott >= boardBott) {
          clearInterval(interval);
        yvelocity = 0;
        yacceleration = 0;
        ypos = 259;
        setCharPos();
        pressed = false;

        }
      }
    }

});
