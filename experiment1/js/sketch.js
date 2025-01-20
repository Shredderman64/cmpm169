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
  colorMode(HSB, 360, 100, 100);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  clear();
  background(mouseY / 2, 100, 100);
  // call a method on the instance
  myInstance.myMethod();

  rectMode(CENTER);

  noStroke();
  fill(360 - (mouseY / 2), 100, 100);
  for (let i = 0; i <= width + 50; i += 50) {
    for (let j = 0; j <= height + 50; j += 50) {
      let distance = dist(mouseX, mouseY, i, j);
      push();
      translate(i, j);
      rotate(atan2(mouseY - j, mouseX - i) + 60 * (PI / 180));
      rect(0, 0, distance * 0.2, distance * 0.2);
      pop();
    }
  }

  stroke('black');
  fill((mouseY / 2), 100, 100);
  for (let i = 0; i <= width + 40; i += 40) {
    for (let j = 0; j <= height + 40; j += 40) {
      let distance = dist(mouseX, mouseY, i, j);
      push();
      translate(i, j);
      if (distance > 300)
        rect(0, 0, 30, 30);
      pop();
    }
  }

  fill('black');
  ellipse(mouseX, mouseY, 100, 400);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}