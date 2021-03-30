var person,edges;
var ground;
var PLAY=1;
var END=0;
var gameState=1;
var enemyGroup,enemyAnimation,enemyImage;
var gold,goldImage,goldGroup,coin,coinImage,coinGroup;
var score =0;




function preload(){
  K = loadImage("K.png");
  K2 = loadAnimation("K2.png","K3.png","K4.png","K5.png");
  enemyAnimation = loadAnimation("Dragon1.png","Dragon2.png","Dragon3.png");
  enemyImage = loadImage("Dragon.png");
  goldImage = loadImage("Gold.png");
  coinImage = loadImage("coin.png");
}




function setup() {
  createCanvas(1300,500);

  person = createSprite(80,200,50,50);
  //person.addImage(K);
  person.scale = 1.2  

  edges = createEdgeSprites();

  ground = createSprite(600,500,1400,143);
  ground.shapeColor= "green"

  enemyGroup = new Group();
  goldGroup = new Group();
  coinGroup = new Group();
}


function draw() {
  background(69, 135, 176 );

  if(keyDown("w")){
    person.y -=10
  } 
  if(keyDown("s")){
    person.y +=10
  } 
  if(keyDown("d")){
    person.addAnimation("walking",K2)
    person.changeAnimation("walking");
    person.x +=10
  } 
  if(keyDown("a")){
    person.x -=10
  } 


  person.collide(edges);
  person.collide(ground);
if(gameState===PLAY)  {
     if(frameCount%100  ===0){
        var r = Math.round(random(1,2))
        if(r===1){
          coins();
        
        }
        else{
          golds();
          
        }
      }
      enemies();
  if(coinGroup.isTouching(person)){
    score = score +10
    coinGroup.destroyEach();
  }  
  else{
    if(goldGroup.isTouching(person)){
      score = score +50
      goldGroup.destroyEach();
    }
  }

  if(enemyGroup.isTouching(person)){
    enemy.addAnimation("standing",enemyImage)
    enemy.changeAnimation("standing") 
    enemyGroup.setVelocityXEach(0);
    person.destroy();
    gameState=END;

  }
 }
 

else if (gameState === END){
  textSize(35)
  fill("black");
  text("GameOver",500,500);
}


  drawSprites();

  textSize(35)
  fill("black");
  text("SCORE: "+score,1000,50);
}






function enemies(){


  if(frameCount%100  ===0){
    enemy = createSprite(1300,100,50,50)
    enemy.y = Math.round(random(50, 400));
    enemy.velocityX = -5  
    enemy.addAnimation("flying",enemyAnimation);
    enemy.changeAnimation("flying")
    enemy.scale=0.7 
    enemyGroup.add(enemy)
    enemy.lifetime = 260
  }
}



function golds(){
  
    gold = createSprite(1300,100,50,50)
    gold.y = Math.round(random(50,400));
    gold.velocityX = -7
    gold.addImage(goldImage)
    gold.scale=0.15
    goldGroup.add(gold)
    gold.lifetime = 260
  }



function coins(){
    coin = createSprite(1300,100,50,50)
    coin.y = Math.round(random(50,400));
    coin.velocityX = -7
    coin.addImage(coinImage)
    coin.scale=0.23
    coinGroup.add(coin)
    coin.lifetime = 260
  }

