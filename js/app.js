$(document).ready(function(){

  var interval;
  var interval2;

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
  var obstacle = $("#obstacle")

  var obstacleLeft;
  var obstacleRight;
  var obstacleTop;
  var obstacleBott;

  var yacceleration = 0.05;
  var yvelocity = -4.5;

  var ypos = 270;
  var xpos = 90;

  var jumping = false;

  moveObstacle();

  if(jumping == false) {
     $("body").keydown(function (e) {
       if(e.keyCode == 32){
         game();
         jumping = true;
         yacceleration = 0.05;
         yvelocity = -4.5;
         ypos = 270;
       }

     });

   }

  function game(){

    interval = setInterval(function(){
      //get positions
      characterPosition();
      boardPosition();


      //on spacebar move the character

      setCharPos();
      move();
      verticalCollisions();

      //move the obstacles

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

  function obstaclePosition(){
    // Find the left and top edge of the obstacle
    obstacleLeft = obstacle.offset().left;
    obstacleTop = obstacle.offset().top;

    // Find right and bottom edge of the obstacle
    obstacleRight = obstacleLeft + obstacle.width();
    obstacleBott = obstacleTop + obstacle.height();
  }



  function verticalCollisions(){
    if (jumping == true) {
      jumping = false;

    }else{
      if (characterBott >= boardBott) {
        clearInterval(interval);
      // console.log(3);
      yvelocity = 0;
      yacceleration = 0;
      ypos = 290;
      setCharPos();
      console.log(interval);
      }
    }
  }

  function horizontalCollisions(){
    if (characterRight >= obstacleLeft && characterBott >= obstacleBott && obstacleLeft >= 100) {
      console.log("over");
      clearInterval(interval2)
    }
  };


  function moveObstacle(){
    interval2 = setInterval(function(){
      obstaclePosition();
      characterPosition();
      console.log(1);
      xpos -= 0.1;
      obstacle.css({
        "left": xpos + "%"
      });
        horizontalCollisions();
    },5);



  };





});
