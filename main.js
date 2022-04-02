video = "";
dstatus = "";
objects = [];
function preload() {
    video = createVideo('video.mp4');
    video.hide();   
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

}

function draw() {
    image(video, 0, 0, 480, 380);
}

function start() {
    objectDetector  = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function modelLoaded() {
    console.log("Modal Loaded");
    dstatus = true
    video.loop();
    video.speed();
    video.volume(0);
}


function gotresult (error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
} 

function draw() {
    image(video, 0, 0, 480, 380);

    if(dstatus != "")
    {
        objectDetector.detect(video, gotresult);
        for( i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are :" + objects.length;
            fill("blueviolet");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent  + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("blueviolet");
rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
