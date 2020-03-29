var imagesToLoad = 0;

var textureList = 	{"wall": [],
					"door": [],
};

var spriteList = {};

function loadImages() {
	
	var imageList = [
		{tileType: 'wall', fileName: 'wall_blue_3.png'},
		{tileType: 'wall', fileName: 'wall_blue_2.png'},
		{tileType: 'wall', fileName: 'wall_snow.png'},
		{tileType: 'door', fileName: 'wall_blue.png'},
		{spriteName: 'cursor', fileName: 'cursor.png'},
		{spriteName: 'leftHand', fileName: 'leftHand.png'},
		{spriteName: 'rightHand', fileName: 'rightHand.png'},
		{spriteName: 'snow', fileName: 'snow.png'},
		{spriteName: 'enemy1', fileName: 'enemy1.png'},
		{spriteName: 'enemy2', fileName: 'enemy2.png'}
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