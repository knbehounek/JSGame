
document.body.onkeyup = function(e){
  if(e.keyCode == 32){
      //your code
      gameStart();
  }
}
//Responsive Canvas

var canvas = document.getElementById('snakeCanvas');
var aspectRatio = .6;    // height:width = 3:2
canvas.height = canvas.width * aspectRatio;


// GAME VARIABLES

const gameSpeed = 45;
const canvasBorder = 'black';
const canvasBackground = "black";
const snakeColor = 'purple';
const snakeBorder = 'gray';
const foodColor = "yellow";
const foodBorder = 'black';
let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150}
]
// The user's score
var gameScore = 0;

// When set to true the snake is changing direction
let directionChange = false;
// Food coordinates
let foodX;
let foodY;
// Horizontal velocity
let horizontalSpeed = 10;
// Vertical velocity
let verticalSpeed = 0;
// Get the canvas element
const snakeCanvas = document.getElementById("snakeCanvas");
// Return a two dimensional drawing context
const ctx = snakeCanvas.getContext("2d");

// Create the first food location
createFood();
// Call changeDirection whenever a key is pressed
document.addEventListener("keydown", changeDirection);



/**
 * Main function of the game
 */
function gameStart() {
  // If the game ended return early to stop game
  if (didGameEnd()) 
  return location.reload();
  setTimeout(function onTick() {
    directionChange = false;
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    // Call game again
    gameStart();
  }, gameSpeed)
  
}
/**
 * Change the background color and draw a border around it
 */
function clearCanvas() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = canvasBackground;
  //  Select the colour for the border of the canvas
  ctx.strokestyle = canvasBorder;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
}
/**
 * Draw the food on the canvas
 */
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.strokestyle = foodBorder;
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}
/**
 * Advances the snake by changing the x-coordinates of its parts
 * according to the horizontal velocity and the y-coordinates of its parts
 * according to the vertical veolocity
 */
function moveSnake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + horizontalSpeed, y: snake[0].y + verticalSpeed};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    // Increase score
    gameScore += 10;
    document.getElementById('score').innerHTML =  gameScore;
    createFood();
  } else {
    snake.pop();
  }
}
/**
 * Returns true if the head of the snake touched another part of the game
 * or any of the walls
 */
function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeCanvas.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeCanvas.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}
/**
 * Generates a random number that is a multiple of 10 given a minumum
 * and a maximum number
 * @param { number } min - The minimum number the random number can be
 * @param { number } max - The maximum number the random number can be
 */
function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
/**
 * Creates random set of coordinates for the snake food.
 */
function createFood() {
  // Generate a random number the food x-coordinate
  foodX = randomTen(0, snakeCanvas.width - 10);
  // Generate a random number for the food y-coordinate
  foodY = randomTen(0, snakeCanvas.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function isFoodOnSnake(part) {
    const foodIsoNsnake = part.x == foodX && part.y == foodY;
    if (foodIsoNsnake) createFood();
  });
}
/**
 * Draws snake on canvas
 */
function drawSnake() {
  // loop through the snake parts drawing each part on the canvas
  snake.forEach(drawSnakePart)
}
/**
 * @param { object } snakePart - The coordinates where the part should be drawn
 */
function drawSnakePart(snakePart) {
  ctx.fillStyle = snakeColor;
  ctx.strokestyle = snakeBorder;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
/**
 * Changes the vertical and horizontal velocity of the snake according to the
 * key that was pressed.
 * @param { object } event - The keydown event
 */
function changeDirection(event) {
  const leftKey = 65;
  const rightKey = 68;
  const upkey = 87;
  const downKey = 83;
  /*
   * Prevent the snake from reversing
   */
  if (directionChange) return;
  directionChange = true;
  const keyPressed = event.keyCode;
  const goingUp = verticalSpeed === -10;
  const goingDown = verticalSpeed === 10;
  const goingRight = horizontalSpeed === 10;
  const goingLeft = horizontalSpeed === -10;
  if (keyPressed === leftKey && !goingRight) {
    horizontalSpeed = -10;
    verticalSpeed = 0;
  }
  if (keyPressed === upkey && !goingDown) {
    horizontalSpeed = 0;
    verticalSpeed = -10;
  }
  if (keyPressed === rightKey && !goingLeft) {
    horizontalSpeed = 10;
    verticalSpeed = 0;
  }
  if (keyPressed === downKey && !goingUp) {
    horizontalSpeed = 0;
    verticalSpeed = 10;
  }
}
  