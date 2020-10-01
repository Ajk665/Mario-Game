var END = 0;
var PLAY = 1;
var gameState = 1;

var score = 0;

var MarioGame;
function preload(){
  
  brick = loadImage("brick.png");
  
  MarioGame = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
 BackgroundImage = loadImage("bg.png"); 
  GroundImage = loadImage("ground2.png");
  CactusImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  End = loadImage("gameOver.png");
  Restart = loadImage("restart.png");
  mario = loadImage("collided.png")
  
  Die = loadSound("die.mp3");
  point1 = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 350);
  Marioman = createSprite(50,260,10,20);
  Marioman.addAnimation("Mario",MarioGame);
  Marioman.scale = 1.5
  Ground1 = createSprite(200,325,400,75);
  Ground1.addImage("ground1",GroundImage);

  
  
  end = createSprite(300,200,10,50);
  end.addImage(End);
  end.scale = 0.75
  
  restart = createSprite(300,250,10,50);
  restart.addImage(Restart);
  restart.scale = 0.75
  
  
  CactusGroup = new Group();
  BrickGroup = new Group();
  
}

function draw() {
 background(BackgroundImage);
   if(Ground1.x < 0){
   Ground1.x = Ground1.width/2;
   }
  
   
  fill("black")
  text("Score = "+ score,500,25 );
  
  if(gameState == PLAY){
    
     Ground1.velocityX = -5;
    
    for(var i = 0;i < BrickGroup.length;i++){
        if(BrickGroup.get(i).isTouching(Marioman)){
           BrickGroup.get(i).remove();
           score = score + 1;
        }
    }
    
    if(score%10 == 0 && score > 0){
       point1.play();
    }
    
    
    if(CactusGroup.isTouching(Marioman)){
       gameState = END;
       Die.play();
    }
    
    if(keyDown("space") && Marioman.y >= 256.5){
  Marioman.velocityY = -10
      jump.play();
  }
    end.visible = false;
    restart.visible = false;
      
  SpawnCactus();
  brick1();
    
  Marioman.velocityY += 0.5
  Marioman.collide(Ground1);
  
  }else if(gameState == END){
    
    score = 0;
    
    CactusGroup.setVelocityXEach(0);
    BrickGroup.setVelocityXEach(0);
    
    CactusGroup.setLifetimeEach(-1);
    BrickGroup.setLifetimeEach(-1);
    
    end.visible = true;
    restart.visible = true;
    
    Marioman.velocityY = 0;
    Ground1.velocityX = 0;
    
    Marioman.addImage("Mario",mario)
    if(mousePressedOver(restart)){
       gameState = PLAY
      BrickGroup.destroyEach();
      CactusGroup.destroyEach();
      Marioman.addAnimation("Mario",MarioGame);
    }
  
  }

  drawSprites();
  
 
  
  
}

function SpawnCactus(){
  
  if(World.frameCount % 100 == 0){
    Cactus1 = createSprite(600,260,10,20);
    Cactus1.addAnimation("Mario2",CactusImage);
    Cactus1.velocityX = -5;
    Cactus1.lifetime = 200;
    Cactus1.depth = Marioman.depth - 1;
    CactusGroup.add(Cactus1);
  }
 
}

function brick1(){
  
  if(World.frameCount % 60 === 0){
  brick2 = createSprite(600,Math.round(random(125,150)));
  brick2.addImage(brick);
  brick2.velocityX = -3;
    brick2.lifetime = 200
    brick2.depth = Marioman.depth - 1;
    BrickGroup.add(brick2);
}
}