var imagesToLoad = 0;

var textureList = {"wall": []};

var spriteList = {};

function loadImages() {
	
	var imageList = [
		{tileType: 'wall', fileName: 'wall_blue_3.png'},
		{tileType: 'wall', fileName: 'wall_blue_2.png'},
		{tileType: 'wall', fileName: 'wall_blue.png'},
		{spriteName: 'leftHand', fileName: 'leftHand.png'},
		{spriteName: 'rightHand', fileName: 'rightHand.png'}
	]
	
	imagesToLoad = imageList.length;
	
	for (var i=0; i<imageList.length; i++) {
		let newImage = document.createElement('img');
		beginLoadingImage(newImage, imageList[i].fileName);
		
		if(imageList[i].spriteName != undefined) {
			spriteList[imageList[i].spriteName] = newImage;
		} else if (imageList[i].tileType != undefined) {
			textureList[imageList[i].tileType].push(newImage)
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