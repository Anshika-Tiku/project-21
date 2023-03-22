var PLAY = 1;
var END = 0;
var gameState = PLAY;

var coinImg;
var crown;
var flying_astronaut;
var spaceImage;
var standing_astronaut;
var astronaut;
var stars;
var invisibleGround;
var obstacle, obstacle1, obstacle2, obstacle3;
var score;
var gameOverImg, restartImg;
var gameOver, restart;
var jumpSound, checkPointSound, dieSound;
var coinsGroup, obstaclesGroup;
var crownGroup;

function preload() {
  flying_astronaut = loadAnimation("flying_astronaut.png");
  standing_astronaut = loadAnimation("standing_astronaut.png");
  spaceImage = loadImage("space.bg.jpg");
  stars = loadImage("stars.jpg");
  coinImg = loadImage("coins.png");
  crown = loadImage("crown.png");
  obstacle1 = loadImage("obstacle_meteroid.png");
  obstacle2 = loadImage("obstacle_meteroid1.png");
  obstacle3 = loadImage("obstacle_meteroid2.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    
  astronaut = createSprite(50, 160, 20, 50);
  astronaut.addAnimation("standing", standing_astronaut);
  astronaut.addAnimation("collided or flying", flying_astronaut);
  astronaut.scale = 0.5;
    
  space = createSprite(200, 180, 400, 20);
  space.addImage("space", spaceImage);
  space.y = space.height / 2;
    
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
    
  restart = createSprite(300,140);
  restart.addImage(restartImg);
    
  gameOver.scale = 0.5;
  restart.scale = 0.5;
    
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
    
  obstaclesGroup = createGroup();
  crownGroup = createGroup();
  coinsGroup= createGroup();

  astronaut.setCollider("rectangle",0,0,astronaut.width,astronaut.height);
  astronaut.debug = false;
  score = 0;
}

function draw() {
  background(space);
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    space.velocityX = -(4 + 3* score/100);
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
      checkPointSound.play(); 
    }
    
    if (space.x < 0){
      space.x = space.height/2;
    }
    
    if(keyDown("space")&& astronaut.y >= 100) {
      astronaut.velocityY = -12;
      jumpSound.play();
    }
    
    astronaut.velocityX = astronaut.velocityX + 0.8;
    spawnCoins();
    spawnCrown();
    spawnObstacles();


      if(obstaclesGroup.isTouching(astronaut)){
     astronaut.velocityY = -12;
          jumpSound.play();
          gameState = END;
          dieSound.play()        
      }
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
     
        astronaut.changeAnimation("collided or flying", flying_astronaut);
      
       
       
        space.velocityX = 0;
        astronaut.velocityY = 0
        
       
        
      obstaclesGroup.setLifetimeEach(-1);
      crownGroup.setLifetimeEach(-1);
       
       obstaclesGroup.setVelocityXEach(0);
       coinsGroups.setVelocityXEach(0);    
     }
    
   
   
    astronaut.collide(invisibleGround);
    
    if(mousePressedOver(restart)) {
        reset();
      }
  
  
    drawSprites();
  }
  
  function reset(){
    gameState=PLAY
    score=0
   obstaclesGroup.destroyEach()
   crownGroup.destroyEach()
   coinsGroups.destroyEach()
   astronaut.changeAnimation("standing", standing_astronaut)
   astronaut.x = 50
    astronaut.y = 160
   gameOver.visible=false
   restart.visible=false
   
  
  }
  
  
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var obstacle = createSprite(600,165,10,40);
     obstacle.velocityX = -(6 + score/100);
     
     
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        default: break;
      }
     
             
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
     
 
      obstaclesGroup.add(obstacle);
   }
  }
  
  function spawnCoins() {
    if (frameCount % 60 === 0) {
      var newCoin = createSprite(600, 120, 40, 10);
      newCoin.y = Math.round(random(80, 120));
      newCoin.addImage(coinImg);
      newCoin.scale = 0.5;
      newCoin.velocityX = -3;
      newCoin.lifetime = 200;
      coinsGroup.add(newCoin);


    }
  }
  
  
  function spawnCrown() {
    
    var crown = createSprite(0,0,10,10)
      crown.y = Math.round(random(80,120));
      crown.addImage(crown);
      crown.scale = 0.5;
      crown.velocityX = -3;
  
      crown.lifetime = 200;

      crown.depth = astronaut.depth;
      astronaut.depth = astronaut.depth + 1;
      
     
      crownGroup.add(crown);
    }
  
  
  