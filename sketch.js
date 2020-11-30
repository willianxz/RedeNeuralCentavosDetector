var video;
var classifier;
var label;
var confidence;
var coinSoundDetector;
function preload(){
 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BjPsn2FXm/model.json');
  
   coinSoundDetector = loadSound('sound/metaldetector1.mp3');
}


function setup() {  
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  label = 'Aguarde...';
  video = createCapture(VIDEO);
  video.hide();

  
  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}

function draw() {
  
  classifyVideo();
  
  background(0);
  image(video, 0, 0, width, height - 45);
  
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 25);
  
   
}

function gotResults(error, results){
  if(error){
    console.log(error);
    return;
  }
    confidence = results[0].confidence;
    
    if(confidence == 1){
       label = results[0].label;
       coinSoundDetector.play();
    }else{
      label = "Não Identificado";
    }

   
    //console.log(results[0].label);
    //console.log(results[0].confidence);
    //console.log(results);
}
  
