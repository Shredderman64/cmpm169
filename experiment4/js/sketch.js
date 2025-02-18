// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let textTyped = "bookkeeper";
let letters = [];

let animate = false;
class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  frameRate(30);
  colorMode(HSB);

  let x = 40, y = 150;
  splitText(x, y);

  strokeWeight(4);
}

function draw() {
  if ((frameCount % 60) == 0) {
    let chooseLetter = letters.filter((letter) => !letter.falling);
    let letter = chooseLetter[floor(random(chooseLetter.length - 1))];

    if (letter && animate) {
      letter.fall();
    }
  }

  fill("white");
  stroke(0);

  if (!animate) clear();
  letters.forEach((letter) => letter.draw());
}

// draw() function is called repeatedly, it's the main animation loop
// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {

}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }

  if (keyCode == ENTER) {
    animate = true;
  } else {
    if (keyCode >= 32) textTyped += key;
    animate = false;
    splitText(40, 150);
  }
}

function splitText(x, y) {
  letters = [];

  textFont("Arial", 120);
  textTyped.split('').forEach(ch => {
    letters.push(new Letter(ch, x, y));
    x += (textWidth(ch) + 20);
  });
}

class Letter {
  constructor(ch, x, y) {
    this.ch = ch;
    this.x = x;
    this.y = y;
    this.dy = 0;

    this.gibs = [];
    for (let i = 0; i < 5; i++) {
      this.gibs.push(new LetterGib(this.ch, this.x, height));
    }
    this.falling = false;
  }

  draw() {
    if (this.y < height) {
      if (this.falling) {
        this.dy += 0.1;
        this.y += this.dy;
      }

      textFont("Arial", 120);
      fill("white");
      text(this.ch, this.x, this.y);
    }
    else {
      this.gibs.forEach((gib) => gib.draw());
    }
  }

  fall() {
    this.falling = true;
  }
}

class LetterGib {
  constructor(ch, x, y) {
    this.ch = ch;
    this.x = x;
    this.y = y;
    this.dx = random(-3, 3);
    this.dy = random(-3, -7);
    this.color = color(random(0, 360), 100, 100);
  }

  draw() {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.1;

    if (this.y > height) {
      this.dy *= -0.8;
      this.y = height;
    }

    textFont("Arial", 60);
    fill(this.color);
    text(this.ch, this.x, this.y);
  }
}