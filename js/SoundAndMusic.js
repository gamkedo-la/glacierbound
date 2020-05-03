var audioFormat;
setFormat(); // do it only once

var isMuted = false;
var soundSetforMeetings = false; //make false to hear at normal level

let musicVolume = 0.5; // TODO: add menu option to up and down volume
let musicVolumeStep = 0.1;
let allBGMs = [];
let currentBGM = null;

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

function playBGM(newBGM, withLooping = true) {
	if(currentBGM) currentBGM.stop();
	currentBGM = newBGM;
	currentBGM.setVolume(musicVolume);
	currentBGM.play(withLooping);
}

function stopBGM()
{
	if(currentBGM)
		currentBGM.stop();
}

//sounds
//background music
var hauntedHoedownSound = new BackgroundMusicClass("HauntedHoedown"); //borrowed from Ghost Rustlers
var laserShot = new SoundOverlapsClass("laser");
var fireBallShot = new SoundOverlapsClass("fireBallShot");
var doorOpen = new SoundOverlapsClass("klaim-door_open");
var doorClose = new SoundOverlapsClass("klaim-door_close");

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("sound/mp3")) {
		audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg";
    }
}

function SoundOverlapsClass(filenameWithPath) {
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
	let filePath = "audio/" + filenameWithPath + audioFormat;
	let musicSound = new Audio(filePath);
	let playing = false;

	this.isPlaying = function() {
		return playing;
	}

	this.getVolume = function(){
		return musicSound.volume;
	};

	this.setVolume = function(value) {
		if(value < 0.0)
			value = 0.0;
		if(value > 1.0)
			value = 1.0;
		musicSound.volume = value;
	};

	this.play = function(loop = true) {
		this.setVolume(musicVolume);
		musicSound.currentTime = 0;
		musicSound.loop = loop;
		musicSound.play().then(() => {
			playing = true;
			allBGMs.push(this); // Make sure changes applied to BGM reach this object.
			console.log("Playing " + filePath);
		 }, (error_reason) => {
			console.warn(`Failed to play music ${filePath} : ${error_reason}`);
		 });
	};

	this.stop = function() {
		musicSound.pause();
		playing = false;

		// Remove from BGMs if not playing.
		const index = allBGMs.indexOf(this);
		if (index > -1) {
			allBGMs.splice(index, 1);
		}
	};
}
