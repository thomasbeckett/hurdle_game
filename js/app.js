$(document).ready(function(){

  var interval;
  var interval2;
  var interval3;

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

  // randomly generate obstacles
  var obstacleArray = [];
  //potention to generate object every 700ms
  interval3 = setInterval(function(){
    var num = Math.random();
    //70% change to generate object
    if(num < 0.7){
      var newObs = generateObstacle();
      obstacleArray.push(newObs);
      // console.log(obstacleArray);

    }
  },800)

  interval2 = setInterval(function(){
    for(o of obstacleArray){
      moveObstacle(o)
    }

  },5);

  var yacceleration = 1;
  var yvelocity = -4.5;

  var ypos;

  var jumping = false;
  var pressed = false;

  if(jumping == false){
    console.log(pressed);
    $("body").keydown(function (e) {
      if(e.keyCode == 32 && pressed == false){
        jump();
        jumping = true;
        yacceleration = 0.08;
        yvelocity = -5;
        ypos = 305;
        pressed = true;
      }

    });
  }

  function generateObstacle(){
     //get a new obstacle id
     var newId = "#obstacle" + obs
     ranHeight = Math.floor(Math.random()*(120-50)+50)
     console.log(ranHeight);
     //create a new object
     var newObstacle = {
       id: newId,
       class: ".barrier",
       left: 0,
       top: 0,
       xpos: 96,
       height: ranHeight
     }
     //create a new div
     $("#obstacles").append("<div id='obstacle"+obs+"' class='barrier'></div>")
     $(newObstacle.id).css({"height":newObstacle.height})
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
      $(".character").css({"background": "url(images/hurdler.gif)","background-size":"cover","background-position":"bottom"})

    //land on ground
    }else{
      if (characterBott >= boardBott) {
        clearInterval(interval);
      yvelocity = 0;
      yacceleration = 0;
      ypos = 305;
      setCharPos();
      pressed = false;
      $(".character").css({"background": "url(images/runner.gif)","background-size":"cover","background-position":"bottom"})
      }
    }
  }

  function horizontalCollisions(object){
    //if object and character collide end the game
    if (characterRight >= object.left && characterBott >= object.top && object.left > 130) {
      console.log("over");
      clearInterval(interval2)
      obstacleSpeed=0;
      clearInterval(interval2)
      clearInterval(interval3)
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
    }
  }




});
