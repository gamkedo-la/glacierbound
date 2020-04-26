var audioFormat;
var isMuted = false;
var soundSetforMeetings = false; //make false to hear at normal level

//sounds
//background music
var hauntedHoedownSound = new BackgroundMusicClass("HauntedHoedown"); //borrowed from Ghost Rustlers
var laserShot = new SoundOverlapsClass("laser");
var fireBallShot = new SoundOverlapsClass("fireBallShot");

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("sound/mp3")) {
		audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg";
    }
}
setFormat(); // do it only once

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("audio/" + filenameWithPath + audioFormat);
    var altSound = new Audio("audio/" + filenameWithPath + audioFormat);

    this.play = function() {
    	if (isMuted) {
    		console.log ("audio muted");
    		return;
    	}
		if (altSoundTurn) {
			altSound.currentTime = 0;
			if(soundSetforMeetings){
				altSound.volume = 0.05;  //quieter for screen sharing during meetings
			}
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			if(soundSetforMeetings){
				mainSound.volume = 0.05; //quieter for screen sharing during meetings
			}
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
    }
}

function BackgroundMusicClass(filenameWithPath) {
	var musicSound = null;
	var filePath = "audio/" + filenameWithPath + audioFormat;

    this.play = function(loop = true) {
		stop();
		musicSound = new Audio(filePath);
		if(soundSetforMeetings){
			musicSound.volume = 0.04; //quieter for screen sharing during meetings
		}
		musicSound.loop = loop;
		musicSound.play();
	}

	this.stop = function() {
		if(musicSound != null)
		{
			musicSound.pause();
		}
	}

    this.startOrStopMusic = function() {
        if (!musicSound) {
            console.error("ERROR: musicSound not initialized before startOrStopMusic was run!");
            return;
        }
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
