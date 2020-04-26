var audioFormat;
var isMuted = false;
var soundSetforMeetings = false; //make false to hear at normal level

let musicVolume = 0.3; // TODO: add menu option to up and down volume
let musicVolumeStep = 0.1;
let allBGMs = [];

if(soundSetforMeetings){
	musicVolume = 0.04; //quieter for screen sharing during meetings
}

function updateAllBGMVolumes() {
	if(musicVolume < 0.0)
		musicVolume = 0.0;
	if(musicVolume > 1.0)
		musicVolume = 1.0;
	allBGMs.forEach(bgm => {
		bgm.setVolume(musicVolume);
		console.log("new volume = " + bgm.getVolume());
	});
}

function increaseBGMVolume(){
	console.log("BGM Volume UP");
	musicVolume += musicVolumeStep;
	updateAllBGMVolumes();
}

function decreaseBGMVolume(){
	console.log("BGM Volume DOWN");
	musicVolume -= musicVolumeStep;
	updateAllBGMVolumes();
}

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
	let musicSound = null;
	let filePath = "audio/" + filenameWithPath + audioFormat;

	this.getVolume = function(){
		return musicSound ? musicSound.volume : 0.0;
	};

	this.setVolume = function(value) {
		if(value < 0.0)
			value = 0.0;
		if(value > 1.0)
			value = 1.0;
		if(musicSound != null){
			musicSound.volume = value;
		}
	};

    this.play = function(loop = true) {
		stop();
		musicSound = new Audio(filePath);
		this.setVolume(musicVolume);
		musicSound.loop = loop;
		musicSound.play();
		allBGMs.push(this); // Make sure changes applied to BGM reach this object.
	};

	this.stop = function() {
		if(musicSound != null)
		{
			musicSound.pause();
		}

		// Remove from BGMs if not playing.
		const index = allBGMs.indexOf(this);
		if (index > -1) {
			allBGMs.splice(index, 1);
		}
	};

}
