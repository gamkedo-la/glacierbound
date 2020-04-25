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
		//pickups
		{spriteName: 'healthpickup', fileName: 'HealthPickup.png'},
		{spriteName: 'armorpickup', fileName: 'ShieldPickup.png'},
		{spriteName: 'damageboost1pickup', fileName: 'DamageBoost1Pickup.png'},
		{spriteName: 'damageboost2pickup', fileName: 'DamageBoost2Pickup.png'},
		{spriteName: 'armorpickup', fileName: 'ShieldPickup.png'},
		{spriteName: 'blueKey', fileName: 'bluekey.png', rotationFrames: 8, frameWidth: 64, frameHeight: 64},
		{spriteName: 'greenKey', fileName: 'greenkey.png', rotationFrames: 8, frameWidth: 64, frameHeight: 64},
		{spriteName: 'redKey', fileName: 'redkey.png', rotationFrames: 8, frameWidth: 64, frameHeight: 64},
		{spriteName: 'skybox', fileName: 'skybox.png'},
		//projectiles
		{spriteName: 'projectile', fileName: 'projectiles/projectile_normal.png'},
		{spriteName: 'projectile_boost1', fileName: 'projectiles/projectile_boost1.png'},
		{spriteName: 'projectile_boost2', fileName: 'projectiles/projectile_boost2.png'},
		{spriteName: 'projectile_comboboost', fileName: 'projectiles/projectile_comboboost.png'},
		//HUD
		{spriteName: 'healthbar', fileName: 'HUD/healthbar.png'},
		{spriteName: 'armorbar', fileName: 'HUD/armorbar.png'},
		{spriteName: 'projectilebar', fileName: 'HUD/projectilebar_normal.png'},
		{spriteName: 'projectilebar_boost1', fileName: 'HUD/projectilebar_boost1.png'},
		{spriteName: 'projectilebar_boost2', fileName: 'HUD/projectilebar_boost2.png'},
		{spriteName: 'projectilebar_comboboost', fileName: 'HUD/projectilebar_comboboost.png'},
		{spriteName: 'healthpickup_ui', fileName: 'HUD/pickups/HealthPickup_UI.png'},
		{spriteName: 'armorpickup_ui', fileName: 'HUD/pickups/ShieldPickup_UI.png'},
		{spriteName: 'damageboost1pickup_ui', fileName: 'HUD/pickups/damageBoost1Pickup_UI.png'},
		{spriteName: 'damageboost2pickup_ui', fileName: 'HUD/pickups/damageBoost2Pickup_UI.png'},
		{spriteName: 'bars', fileName: 'bars.png'},
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