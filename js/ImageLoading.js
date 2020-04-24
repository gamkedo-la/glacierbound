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
		{tileType: 'door', fileName: 'door.png'},
		{tileType: 'door', fileName: 'door_blue.png'},
		{tileType: 'door', fileName: 'door_red.png'},
		{tileType: 'door', fileName: 'door_green.png'},
		{spriteName: 'logo', fileName: 'logo.png'},
		{spriteName: 'cursor', fileName: 'cursor.png'},
		{spriteName: 'leftHand', fileName: 'leftHand.png'},
		{spriteName: 'rightHand', fileName: 'rightHand.png'},
		{spriteName: 'snow', fileName: 'snow.png'},
		{spriteName: 'enemy1', fileName: 'enemy1.png'},
		{spriteName: 'enemy2', fileName: 'enemy2.png'},
		{spriteName: 'gameover', fileName: 'game-over.png'},
		{spriteName: 'healthbar', fileName: 'healthbar.png'},
		{spriteName: 'healthpickup', fileName: 'HealthPickup.png'},
		{spriteName: 'healthpickup_ui', fileName: 'HealthPickup_UI.png'},
		{spriteName: 'armorbar', fileName: 'armorbar.png'},
		{spriteName: 'armorpickup', fileName: 'ShieldPickup.png'},
		{spriteName: 'armorpickup_ui', fileName: 'ShieldPickup_UI.png'},
		{spriteName: 'blueKey', fileName: 'bluekey.png', rotationFrames: 8, frameWidth: 64, frameHeight: 64},
		{spriteName: 'greenKey', fileName: 'greenkey.png', rotationFrames: 8, frameWidth: 64, frameHeight: 64},
		{spriteName: 'redKey', fileName: 'redkey.png', rotationFrames: 8, frameWidth: 64, frameHeight: 64},
		{spriteName: 'skybox', fileName: 'skybox.png'},
	]
	
	imagesToLoad = imageList.length;
	
	for (var i=0; i<imageList.length; i++) {
		let newImage = document.createElement('img');
		beginLoadingImage(newImage, imageList[i].fileName);
		
		if(imageList[i].spriteName != undefined) {
			if (imageList[i].animationFrames || imageList[i].rotationFrames) {
				newImage.rotationFrames = imageList[i].rotationFrames;
				newImage.animationFrames = imageList[i].animationFrames;
				newImage.frameWidth = imageList[i].frameWidth;
				newImage.frameHeight = imageList[i].frameHeight;
			}
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