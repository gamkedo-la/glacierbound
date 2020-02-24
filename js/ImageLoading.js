var mapWallTex = document.createElement('img');

var imagesToLoad = 0;

function loadImages() {
	
	var imageList = [
		{varName: mapWallTex, fileName: 'wall_blue.png'},
	]
	
	imagesToLoad = imageList.length;
	
	for (var i=0; i<imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].fileName)
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