video = "";
objects = [];
status1 = "";
function preload(){
    video = createVideo('video.mp4');
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function play(){
    classifier = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById('status').innerHTML = "Status = detecting objects";
}
function modelLoaded(){
    console.log('Model Loaded');
    status1 = true;
    video.loop();
    video.speed(2);
    video.volume(0);
}

function gotresults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        classifier.detect(video, gotresults);
        for(i = 0; i<objects.length; i++){
            document.getElementById('status').innerHTML = "Status- object detected";
            document.getElementById('number_of_objects').innerHTML = objects.length;
            fill(r,g,b);
            percentage = floor(objects[i].confidence *100);
            text(objects[i].label + "" + percentage + "%", objects[i].x +15, objects[i].y -15);
            noFill();
            stroke(r,g,b);
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}