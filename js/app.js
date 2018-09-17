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

  var yacceleration = 0.05;
  var yvelocity = -4.5;

  var ypos = 270;
  var xpos = 700;

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
    // Find the left and top edge of the ball
    characterLeft = character.offset().left;
    characterTop = character.offset().top;

    // Find right and bottom edge of the ball
    characterRight = characterLeft + character.width();
    characterBott = characterTop + character.height();
  };

  function boardPosition(){
    // Find the left and top edge of the ball
    boardLeft = board.offset().left;
    boardTop = board.offset().top;

    // Find right and bottom edge of the ball
    boardRight = boardLeft + board.width();
    boardBott = boardTop + board.height();
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


  function moveObstacle(){
    interval2 = setInterval(function(){
      boardPosition();
      console.log(1);
      xpos -= 1;
      obstacle.css({
        "left": xpos + "px"
      });
    });



  };





});
