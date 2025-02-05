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

let camera;
let scaleToCam;
const camWidth = 320;
const camHeight = 240;

const colors = ["red", "orange", "yellow", "lightgreen", "lightblue", "blue", "purple"];

let osc, playing, freq = 0, amp;

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

  if (height < width)
    scaleToCam = width / camWidth;
  else
    scaleToCam = height / camHeight;

  noStroke();
  camera = createCapture(VIDEO);
  camera.size(camWidth, camHeight);
  camera.hide();

  osc = new p5.Oscillator("sine");
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  clear();
  background(220);    
  // call a method on the instance
  myInstance.myMethod();

  camera.loadPixels();
  scale(scaleToCam);

  let scaledX = floor(map(mouseX, 0, width, 0, camWidth));
  let scaledY = floor(map(mouseY, 0, height, 0, camHeight));

  for (let y = 0; y < (camHeight); y += 3) {
		for (let x = 0; x < camWidth; x += 3) {
      let distance = dist(scaledX, scaledY, x, y);
			let colorIndex = getPixel(x, y);
      if (distance < 30)
        colorIndex = (colors.length - 1) - colorIndex;
      fill(colors[colorIndex]);

      rect(x, y, 3, 3);
		}
	}
  
  let freqIndex = getPixel(scaledX, scaledY);
  freq = (freqIndex + 2) * 100;

  if (playing) {
    osc.freq(freq, 0.1);
    osc.amp(0.5, 0.1);
  }
}

function mousePressed() {
  osc.start();
  playing = true;
}

function mouseReleased() {
  osc.amp(0, 1);
  playing = false;
}

function getPixel(x, y) {
  const i = ((y * camWidth) + x) * 4;
	const r = camera.pixels[i];
	const g = camera.pixels[i + 1];
	const b = camera.pixels[i + 2];

  return index = floor(((r + g + b) / (255 * 3)) * (colors.length - 1));
}