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
  var score = 0;

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

  var obstacleSpeed = 0.2;

  // on spacebar and if the game is not running
  // start the game and change relevant gifs
  $("body").keydown(function (e) {
    if(e.keyCode == 32 && playing == false){
      // start the game
      game();
      playing=true;
      // hide the instructions and the buttons
      $(".start-game").html("")
      $(".buttons").css({"display":"none"})
      // change sprite to running sprite
      if(sprite == "player"){
        $("img").attr('src', 'images/running-man.gif');
        $("img").css({"width":"40px"})
      }else if(sprite == "dinosaur"){
        $("img").attr('src', 'images/dinosaur-moving.gif');
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
    if(jumping == false){
      // on spacebar jump
      $("body").keydown(function (e) {
        if(e.keyCode == 32 && pressed == false){
          jump();
          jumping = true;
          yacceleration = 0.1;
          yvelocity = -6.3;
          ypos = 259;
          pressed = true;
        }

      });
    }
    function changeSprite(){
    if (sprite == "player") {
      $("img").attr('src', 'images/running-man.gif');
      $("img").css({"width":"40px","bottom":"0","left":"0"})
    }else if(sprite == "dinosaur"){
      $("img").attr('src', 'images/dinosaur.gif');
      $("img").css({"width":"60px","right":"0","bottom":"0","left":"-17px"})
    }else if(sprite == "kid"){
      $("img").attr('src', 'images/running-kid.gif');
      $("img").css({"width":"120px","position":"absolute","left":"-40px","bottom":"0"})
    }else if(sprite == "batman"){
      $("img").attr('src', 'images/batman.gif');
      $("img").css({"width":"120px","position":"absolute","left":"-40px", "bottom":"-10px"})
    }

  }
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

      },5);
    }

    function generateObstacle(){
       //get a new obstacle id
       var newId = "#obstacle" + obs
       // get random heights and widths
       var ranHeight = Math.floor(Math.random()*(3))
       switch (ranHeight) {
        case 0:
          ranHeight = 50;
          break;
        case 1:
          ranHeight = 80;
          break;
        case 2:
          ranHeight = 110;
          break;
         default:
          break;

       }

       var ranWidth = Math.floor(Math.random()*(3))
       switch (ranWidth) {
        case 0:
          ranWidth = 10;
          break;
        case 1:
          ranWidth = 30;
          break;
        case 2:
          ranWidth = 60;
          break;
         default:
         ranWidht = 10;
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
       $("#obstacles").append("<div id='obstacle"+obs+"' class='barrier'></div>")
       $(newObstacle.id).css({"height":newObstacle.height})
       $(newObstacle.id).css({"width":newObstacle.width})
       obs++
       return(newObstacle);
     }

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

    function setCharPos(){
      character.css({
        "top": ypos + "px"
      });
    }

    function move(){
      yvelocity += yacceleration;
      ypos+=yvelocity;
    };

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

    function obstaclePosition(object){
      // Find the left and top edge of the obstacle
      object.left = $(object.id).offset().left;
      object.top = $(object.id).offset().top;

    }

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

    function horizontalCollisions(object){
      //if object and character collide end the game
      if (characterRight >= object.left && characterBott >= object.top && object.left > 140-object.width) {
        console.log("over");
        clearInterval(interval)
        clearInterval(interval2)
        clearInterval(interval3)
        obstacleSpeed=0;
        if(sprite == "player"){
          $("img").attr('src', 'images/dead.gif');
          $("img").css({"height":"40px","width":"auto","left":"-85px"})
          $(".character").css({"top":"275px"})
        }else if(sprite == "dinosaur"){
          $("img").attr('src', 'images/dinosaur.gif');
        }


      }
    };

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

    function hideCheck(object){
      if(object.left <=50){
        $(object.id).remove();
        obstacleArray.splice(0,1)
        score++
        obstacleSpeed += 0.005;
      }
    }



});
