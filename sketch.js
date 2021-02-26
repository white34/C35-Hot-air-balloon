var balloon, balloonAnimation;
var back;

var Database, position;

function preload(){
back = loadImage("Hot Air Ballon-01.png");
balloonAnimation = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png", "Hot Air Ballon-04.png")

}

function setup() { 
  createCanvas(1870,850);
  Database = firebase.database();

  balloon = createSprite(250, 550, 50, 50);
  balloon.addAnimation("balloon", balloonAnimation);

  var balloonPos = Database.ref('Balloon/position');

  balloonPos.on("value", readPosition, showError);

}

function draw() {
  background(back);  
  drawSprites();

  textSize(30);
  text("**Use arrows to move the balloon!", 100, 50)

  if(keyDown("left")){
    writePosition(-10, 0);
  }
  if(keyDown("right")){
    writePosition(10, 0);
  }
  if(keyDown("up")){
    writePosition(0, -10)
    balloon.scale = balloon.scale-0.015;
  }

  if(keyDown("down")){
    writePosition(0, 10)
    balloon.scale = balloon.scale+0.015;
  }

}

function readPosition(){
  var posi = Database.ref('Balloon/position');
  posi.on("value", (data)=>{
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
  })
  
    
}

function writePosition(x, y){
  Database.ref('Balloon/position').set({
    'x': balloon.x + x,
    'y': balloon.y + y
  })

}

function showError(){
  console.log("error in writing to database");
}