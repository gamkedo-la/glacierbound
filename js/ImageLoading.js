var leftHandPic = document.createElement('img');
var rightHandPic = document.createElement('img');

var imagesToLoad = 0;

var textureList = {"wall": []};

function loadImages() {
	
	var imageList = [
		{tileType: 'wall', fileName: 'wall_blue.png'},
		{tileType: 'wall', fileName: 'wall_blue_2.png'},
		{varName: leftHandPic, fileName: 'leftHand.png'},
		{varName: rightHandPic, fileName: 'rightHand.png'}
	]
	
	imagesToLoad = imageList.length;
	
	for (var i=0; i<imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].fileName)
		} else if (imageList[i].tileType != undefined) {
			let newTexture = document.createElement('img');
			beginLoadingImage(newTexture, imageList[i].fileName);
			textureList[imageList[i].tileType].push(newTexture)
		}
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.src = 'images/'+fileName;
	imgVar.onload = function() {countImagesOrStartGame()};
}	

function countImagesOrStartGame() {
	imagesToLoad--;
	if (imagesToLoad == 0) {
		initRenderLoop();
	}
}