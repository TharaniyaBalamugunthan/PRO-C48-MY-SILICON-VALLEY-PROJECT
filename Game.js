class Game {
    constructor(){

    }

  getState(){
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value",function(data){
        gameState = data.val();
      })
  }

  update(state){
    database.ref('/').update({
        gameState: state
      });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    greenGhost = createSprite(200, 200, 50, 50);
    greenGhost.addImage("greenGhost",greenGhostImg);
    purpleGhost = createSprite(100,700,50,50);
    purpleGhost.addImage("purpleGhost",purpleGhostImg);
    Ghost = [greenGhost,purpleGhost];
    
    
}

play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background("#FFFFFF");
      image(backgroundImg, 0,-displayHeight*4,displayWidth, displayHeight*5);
      var index = 0;
      var x = 200;
      var y = 0;
      
      drawSprites();
      for(var plr in allPlayers){
        index = index + 1 ;
      
         x = 500 - allPlayers[plr].distanceX;
         y = 100 - allPlayers[plr].distanceY;

        Ghost[index - 1].x = x;
        Ghost[index - 1].y = y;
        console.log(Ghost[index - 1].x);
        console.log(Ghost[index - 1].y);

        if (index === player.index){
          Ghost[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = Ghost[index-1].y
          
        }
   
        }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distanceY +=10
        player.update();
      }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distanceY -=10
        player.update();
      }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distanceX -=10
        player.update();
      }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distanceX +=10
        player.update();
      }
    
    if(frameCount % 20 === 0){
        blueFireBalls = createSprite(random(100,1000),random(100,800),20,20);
        blueFireBalls.addImage("blueFireballs",blueFireBallsImg);
        blueFireBallsGroup.add(blueFireBalls);
       
    }

    if(player.index !== null){
      for(var i = 0;i < blueFireBallsGroup.length; i++){
        if(blueFireBallsGroup.get(i).isTouching(Ghost)){
          blueFireBallsGroup.get(i).destroy();
          player.score = player.score + 1;
          player.update();
        }
      
    }

    }
   
}

end(){
  textSize("Game Ended");
  
}
    


}
