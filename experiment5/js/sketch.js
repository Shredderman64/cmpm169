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

let thomasText;
let frostText;
let kiplingText;

let rawText = "";
let all;
let letterCounts = [];
let maxCount = 0;

let freqOrder = [];
let letterFreqs = [];
let maxFreqHeight = 0;

const barFloor = 560;
const textFloor = 580;
const barWidth = 20;
const barPadding = 55;
const textPadding = 60;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function preload() {
  thomasText = loadStrings("files/thomas.txt");
  frostText = loadStrings("files/frost.txt");
  kiplingText = loadStrings("files/kipling.txt");
  table = loadTable("files/letterFreq.csv", "csv", "header");
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

  numberOfRows = table.getRowCount();
  numberOfCols = table.getColumnCount();

  for (let i = 0; i < 26; i++) {
    freqOrder[i] = table.getString(i, 0);
    letterFreqs[i] = table.getString(i, 1);
    letterCounts[i] = 0;
  }
  
  maxFreqHeight = letterFreqs[0] * 30;
  console.log(maxFreqHeight);

  all = rawText.toUpperCase();

  for (let i = 0; i < all.length; i++) {
    let ch = all.charAt(i);
    if (ch >= "A" && ch <= "Z") {
      letterCounts[freqOrder.indexOf(ch)]++;
    }
  }
  console.log(letterCounts);

  let loadThomas = createButton("Do not go gentle into that good night by Dylan Thomas");
  loadThomas.position(100, 100);
  loadThomas.mousePressed(() => loadText(thomasText));

  let loadFrost = createButton("The Road Not Taken by Robert Frost");
  loadFrost.position(100, 120);
  loadFrost.mousePressed(() => loadText(frostText));

  let loadKipling = createButton("Boots by Rudyard Kipling");
  loadKipling.position(100, 140);
  loadKipling.mousePressed(() => loadText(kiplingText));

  let clearButton = createButton("Clear");
  clearButton.position(100, 160);
  clearButton.mousePressed(() => rawText = "");
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  clear();
  background(200);
  noStroke();

  maxCount = 0;
  for (let i = 0; i < letterCounts.length; i++)
    letterCounts[i] = 0;

  all = rawText.toUpperCase();

  for (let i = 0; i < all.length; i++) {
    let ch = all.charAt(i);
    if (ch >= "A" && ch <= "Z") {
      //letterCounts[freqOrder.indexOf(ch)]++;
      letterCounts[freqOrder.indexOf(ch)]++;
    }
  }
  
  for (let i = 0; i < 26; i++) {
    letterFreqs[i] = table.getString(i, 1);
    let barHeight = letterFreqs[i] * 30;
    if (letterCounts[i] > maxCount)
      maxCount = letterCounts[i];

    fill(220);
    rect(i * 30 + barPadding, barFloor - barHeight, barWidth, barHeight);
    fill(120);
    text(table.getString(i, 0), i * 30 + textPadding, textFloor);
  }

  for (let i = 0; i < letterCounts.length; i++) {
    let barHeight = maxFreqHeight * (letterCounts[i] / maxCount);
    fill(100, 100, 100, 100);
    rect(i * 30 + barPadding, barFloor - barHeight, barWidth, barHeight);
  }

  fill(0);
  text(rawText, 850, 50, 300, 600);
}

function mousePressed() {
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (rawText.length > 0) {
      rawText = rawText.substring(0, rawText.length - 1);   
    }
  }
  if (keyCode >= 32) {
    rawText += key;
  }
  console.log(rawText);
}

function loadText(textFile) {
  rawText = textFile;
  rawText = rawText.join(" ");
}