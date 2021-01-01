var dog,happyDog,dogS;
var dogImg,database,foodS,foodStock;

var feedTime,food;
var Food;
var lastFed=0
var feed,addFood;

function preload(){
    dogImg = loadImage("DOG.png")
 
    happyDog= loadImage("dogImg1.png")
}

function setup() {
   createCanvas(1000,1000);
    database=firebase.database();
    food = new Foods(200,100);
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    dog = createSprite(700,250,10,10);
    dog.addImage(dogImg)
    dog.scale = 0.3

    feed=createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)

 
  
}


function draw() {  
  background("pink")
  food.display();
  stroke("Blue")
  textSize(20)

  text("I am your little puppy!! :D I am hungry can you  please feed me",200,120)
  stroke("blue")


  feedTime=database.ref('feedTime')
    feedTime.on("value",function(data){
        lastFed=data.val();
    })

 
  
  fill(255,255,255);
      
        
        drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  dog.x=600

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
  
    Food:food.getFoodStock(),
    feedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS)
}
 

function showError(){
  console.log("Error in writing to the database");
}
 
 