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

let x, y;
let pods = [];
let clusters = [];

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

  ellipseMode(RADIUS);
  x = centerHorz;
  y = centerVert;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  clear();
  background(200);
  // call a method on the instance

  noStroke();
  for (let cluster of clusters) {
    cluster.grow();
    fill(0, random(100, 255), random(100, 255));
    cluster.draw();
  }

  fill("white");
  for (let pod of pods) {
    pod.draw();
    let distance = dist(x, y, pod.x(), pod.y());
    if (distance <= pod.radius()) {
      let index = pods.indexOf(pod);
      pods.splice(index, 1);

      let cluster = createSpores(pod.x(), pod.y());
      clusters.push(cluster);
    }
  }

  stroke("black");
  ellipse(x, y, 10);

  x += random(-5, 5);
  y += random(-5, 5);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  let pod = createPod(mouseX, mouseY, 20);
  pod.draw();
  pods.push(pod);
}

function createPod(x, y, r) {
  return {
    draw() { ellipse(x, y, r); },
    x() { return x; },
    y() { return y; },
    radius() { return r; },
  }
}

function createSpores(xInit, yInit) {
  let maxSpores = 200;
  let currentSpores = 0;
  let x = [xInit];
  let y = [yInit];
  let r = [20];

  return {
    draw() {
      for (let i = 0; i < currentSpores; i++) {
        ellipse(x[i], y[i], r[i]);
      }
    },
    grow() {
      if (currentSpores >= maxSpores) return;

      let newR = random(5, 15);
      let newX = random(newR, width - newR);
      let newY = random(newR, height - newR);

      // find closest spore to new position
      let closestDist = Number.MAX_VALUE;
      let closestIndex = 0;
      for (let i = 0; i < currentSpores; i++) {
        let newDist = dist(newX, newY, x[i], y[i]);
        if (newDist < closestDist) {
          closestDist = newDist;
          closestIndex = i;
        }
      }

      // find the angle between the two spores
      let angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

      let hyp = r[closestIndex] + newR;
      x[currentSpores] = x[closestIndex] + cos(angle) * hyp;
      y[currentSpores] = y[closestIndex] + sin(angle) * hyp;
      r[currentSpores] = newR;

      currentSpores++;
    },
  }
}