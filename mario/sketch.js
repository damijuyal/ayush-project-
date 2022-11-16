var PLAY=1;
var END=0;
var gameState=PLAY;
var back
 
function setup(){


back=createSprite(200,200,400,400);
back.setAnimation("Background.jpg");
back.scale=1.7;
back.x = back.width /2;

var mario=createSprite(200,390,20,20);
mario.setAnimation("mario.png");
mario.scale=0.8;
mario.x=50;
mario.setCollider("circle",0,0,70);
mario.debug = false;

var ground=createSprite(200,380,400,20);
ground.setAnimation("ground.jpg");
 ground.x = ground.width/2;


var invisibleGround=createSprite(200,395,400,5);
invisibleGround.visible=false;

var CoinGroup=createGroup();

var EvilGroup=createGroup();

var gameOver = createSprite(200,200);
gameOver.setAnimation("TextGameOver_1.jpg");
gameOver.scale = 0.5;

var restart = createSprite(200,220);
restart.setAnimation("restart.jpg");
restart.scale=0.5;

gameOver.visible=false;
restart.visible=false;




var count=0;
textSize(22);
textFont("Georgia");
textStyle(BOLD);
fill("green");
}
 

function draw() {
  background("white");
ground.velocityX=-3;


  
  console.log(ground);
  
  if(gameState=== PLAY){
  ground.velocityX=-6;
  
    count = count + Math.round(World.frameRate/60);
  
   if (count>0 && count%100 === 0){
      //playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;

     }
   if(keyDown("space")&& mario.y>=200){
       mario.velocityY = -15;
       //playSound("sound://category_swish/motion_whoosh_8v2.mp3");
   }     
  
  mario.velocityY=mario.velocityY+1;
  
 

if (mario.isTouching(CoinGroup)) {
CoinGroup.destroyEach();

}

   if(EvilGroup.isTouching(mario)){
     gameState=END;
     
     // playSound("sound://category_explosion/vibrant_game_arcade_game_negative_hit_10_soft_hifi.mp3");
    }
  }  
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
   
    ground.velocityX = 0;
    mario.velocityY = 0;
   
    EvilGroup.setVelocityXEach(0);
    CoinGroup.setVelocityXEach(0);
    

     EvilGroup.setLifetimeEach(-1);
     CoinGroup.setLifetimeEach(-1);
    
  
}
if(mousePressedOver(restart)){
  reset();
  
}
 
mario.collide(invisibleGround);

spawnCoin();
spawnEvil();
reset();
  
  drawSprites();
   text("Score:"+count,250,50);
}

function reset(){
  gameState=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;

 EvilGroup.destroyEach();
  CoinGroup.destroyEach();
  
  mario.setAnimation("bye.jpg");
  count=0;



  
}

function spawnCoin(){
  if (World.frameCount % 60 === 0) {
    var coin = createSprite(400,320,40,10);
    coin.y = randomNumber(120,200);    
    coin.setAnimation("coin.jpg");
    coin.velocityX = -5;
    coin.scale=0.5;
     
   coin.lifetime = 300;
  coin.depth=mario.depth;
  mario.depth=mario.depth+1;
    
    CoinGroup.add(coin);
  }
}

function spawnEvil(){
  if(World.frameCount % 100 === 0) {
    var evil = createSprite(400,350,10,40);
    evil.velocityX = - (6 + 3*count/200);
    evil.setAnimation("enemy.jpg");
    evil.scale = 0.5;
    evil.lifetime = 300;
 
    EvilGroup.add(evil);
}
}
   
