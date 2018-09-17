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
  var obs = 0;

  // var obstacleObject = generateObstacle();
  //
  var obstacleSpeed = 0.2;

  // randomly generate obstacles
  var obstacleArray = [];
  var newObs = generateObstacle();
  obstacleArray.push(newObs);
  console.log(obstacleArray);
  interval3 = setInterval(function(){
    var newObs = generateObstacle();
    obstacleArray.push(newObs);
    console.log(obstacleArray);
  },1000)

  interval2 = setInterval(function(){
    for(o of obstacleArray){
      moveObstacle(o)
    }

  },5);

  var yacceleration = 0.05;
  var yvelocity = -4.5;

  var ypos = 270;


  var jumping = false;

  if(jumping == false) {
     $("body").keydown(function (e) {
       if(e.keyCode == 32){
         jump();
         jumping = true;
         yacceleration = 0.05;
         yvelocity = -4.5;
         ypos = 270;
       }

     });
   }

   function generateObstacle(){
     var newId = "#obstacle" + obs
     var newObstacle = {
       id: newId,
       class: ".barrier",
       left: 0,
       top: 0,
       xpos: 90
     }
     $("#obstacles").append("<div id='obstacle"+obs+"' class='barrier'></div>")
     $(newObstacle.id).css({"left":"90%"})
     obs++
     return(newObstacle);
   }

  function jump(){

    interval = setInterval(function(){
      //get positions
      characterPosition();
      boardPosition();

      //on spacebar move the character
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
    // console.log(object);


    // Find right and bottom edge of the obstacle
    // obstacleRight = obstacleLeft + obstacle.width();
    // obstacleBott = obstacleTop + obstacle.height();
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
      // console.log(interval);
      }
    }
  }

  function horizontalCollisions(object){
    if (characterRight >= object.left && characterBott >= object.top && object.left >= 100) {
      console.log("over");
      clearInterval(interval2)
      obstacleSpeed=0;
      clearInterval(interval2)
      clearInterval(interval3)
    }
  };


  function moveObstacle(object){

      obstaclePosition(object);

      characterPosition();
      object.xpos -= obstacleSpeed;
      // console.log(object.id);
      $(object.id).css({
        "left": object.xpos + "%"
      });
      horizontalCollisions(object);

      hideCheck(object);



  };

  function hideCheck(object){
    // console.log(object.left);
    if(object.left <=50){
      $(object.id).hide();
    }
  }




});
