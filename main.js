song1 = ""
song2 = ""

leftWristX = ""
rightWristX = ""

scoreLeftWrist = ""
scoreRightWrist = ""

function preload()
{

    song1 = loadSound("BTS Butter.mp3");
    song2 = loadSound("Ice-cream blackpink.mp3");

}

function setup()
{

    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded()
{

    console.log('Posenet Is Initialized');

}

function draw()
{

    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {

        circle(rightWristX, 20);
        song1.stop();

    }

    if(scoreLeftWrist > 0.2)
    {

        circle(leftWristX, 20);
        song2.stop();

    }

    if(song2 == false)
    {

        song2.play();
        document.getElementById("song_name").innerHTML = "Song - Blackpink Ice-cream"

    }

    if(song1 == false)
    {

        song1.play();
        document.getElementById("song_name").innerHTML = "Song - BTS Butter";

    }

}

function play()
{

    song1.play();
    song2.play();

}

function gotPoses(results)
{

    if(results.length > 0)
    {

        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist" + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        console.log("leftWristX = " + leftWristX);

        rightWristX = results[0].pose.rightWrist.x;
        console.log("rightWristX = " + rightWristX);

    }

}