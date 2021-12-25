var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("1 (1).jpg");
   balloonImage1=loadAnimation("HotAirBallon-01.png");
   balloonImage2=loadAnimation("HotAirBallon-01.png","HotAirBallon-01.png",
   "HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-02.png",
   "HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-03.png","HotAirBallon-03.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale-0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }
/*
if(keyDown(LEFT_ARROW))
  {
    writePosition(-1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW))
  {
    writePosition(1,0);
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW))
  {
    writePosition(0,-1);
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.scale=balloon.scale-0.005;
  }
  else if(keyDown(DOWN_ARROW))
  {
    writePosition(0,+1);
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.scale=balloon.scale+0.005;
  }
  */
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
