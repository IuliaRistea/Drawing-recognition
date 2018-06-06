const len = 784;
const totalData = 1000;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;
const TREE = 3
const FLOWER = 4;
const CLOCK = 5;
//const BOOK = 6

let catsData;
let trainsData;
let rainbowsData;
let treesData;
let flowerData;
let clockData;
//let bookData;

let cats = {};
let trains = {};
let rainbows = {};
let trees = {};
let flowers = {};
let clocks = {};
//let books = {};

let nn;

function preload() {
  catsData = loadBytes('data/cats1000.bin');
  trainsData = loadBytes('data/trains1000.bin');
  rainbowsData = loadBytes('data/rainbows1000.bin');
  treesData = loadBytes('data/tree1000.bin');
  flowerData = loadBytes('data/flower1000.bin');
  clockData = loadBytes('data/clock1000.bin');
  //bookData = loadBytes('data/book1000.bin');
}


function setup() {
  
  createCanvas(280, 280);
  
  background(255);

  // Preparing the data
  prepareData(cats, catsData, CAT);
  prepareData(rainbows, rainbowsData, RAINBOW);
  prepareData(trains, trainsData, TRAIN);
  prepareData(trees, treesData, TREE);
  prepareData(flowers, flowerData, FLOWER);
  prepareData(clocks, clockData, CLOCK);
  //prepareData(books, bookData, BOOK);
  // Making the neural network
  nn = new NeuralNetwork(784, 100, 6);

  // Randomizing the data
  let training = [];
  training = training.concat(cats.training);
  training = training.concat(rainbows.training);
  training = training.concat(trains.training);
  training = training.concat(trees.training);
  training = training.concat(flowers.training);
  training = training.concat(clocks.training);
  //training = training.concat(books.training);

  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(trains.testing);
  testing = testing.concat(trees.testing);
  testing = testing.concat(flowers.testing);
  testing = testing.concat(clocks.testing);
  //testing = testing.concat(books.testing);


  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(function() {
    trainEpoch(training);
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let percent = testAll(testing);
    console.log("Percent: " + nf(percent, 2, 2) + "%");
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < len; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }

    let guess = nn.predict(inputs);
    // console.log(guess);
    let m = max(guess);
    let classification = guess.indexOf(m);
    if (classification === CAT) {
      console.log("cat");
      select('#prediction').value('cat');
    } else if (classification === RAINBOW) {
      console.log("rainbow");
      select('#prediction').value('rainbow');
    } else if (classification === TRAIN) {
      console.log("train");
      select('#prediction').value('train');
    } else if (classification === TREE){
      console.log("tree");
      select('#prediction').value('tree');
    } else if (classification === FLOWER){
      console.log("flower");
      select('#prediction').value('flower');
    } else if (classification === CLOCK){
      console.log("clock");
      select('#prediction').value('clock');
    } //else if (classification === BOOK){
     // console.log("book");
   // }

   
   
  });


  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(255);
    select('#prediction').value('');
  });
}


function draw() {
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
