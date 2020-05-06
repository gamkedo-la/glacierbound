var imagesToLoad = 0;

var textureList = 	{"wall": [],
					"door": [],
};

var spriteList = {};

function loadImages() {

	var imageList = [
		{spriteName: 'logo', fileName: 'logo.png'},
		{spriteName: 'intro-story-screen', fileName: 'intro-story-screen2.png'},
		{spriteName: 'gameover', fileName: 'game-over.png'},
		{spriteName: 'cursor', fileName: 'cursor.png'},
		{spriteName: 'leftHand', fileName: 'leftHand.png'},
		{spriteName: 'rightHand', fileName: 'rightHand.png'},
		{spriteName: 'snow', fileName: 'snow.png'},
		{spriteName: 'skybox', fileName: 'skybox.png'},
		//walls
		{tileType: 'wall', fileName: 'walls/wall_blue_3.png'},
		{tileType: 'wall', fileName: 'walls/wall_blue_2.png'},
		{tileType: 'wall', fileName: 'walls/wall_snow.png'},
		//doors
		{tileType: 'door', fileName: 'doors/door.png'},
		{tileType: 'door', fileName: 'doors/door_blue.png'},
		{tileType: 'door', fileName: 'doors/door_red.png'},
		{tileType: 'door', fileName: 'doors/door_green.png'},
		//enemies
		{spriteName: 'enemy1', fileName: 'enemies/Enemy1.png'},
		{spriteName: 'enemy2', fileName: 'enemies/Enemy2.png'},
		//pickups
		{spriteName: 'healthpickup', fileName: 'itempickups/HealthPickup.png'},
		{spriteName: 'armorpickup', fileName: 'itempickups/ShieldPickup.png'},
		{spriteName: 'damageboost1pickup', fileName: 'itempickups/DamageBoost1Pickup.png'},
		{spriteName: 'damageboost2pickup', fileName: 'itempickups/DamageBoost2Pickup.png'},
		//keys
		{spriteName: 'blueKey', fileName: 'keys/bluekey.png', animationFrames: 8, frameWidth: 16, frameHeight: 16},
		{spriteName: 'greenKey', fileName: 'keys/greenkey.png', animationFrames: 8, frameWidth: 16, frameHeight: 16},
		{spriteName: 'redKey', fileName: 'keys/redkey.png', animationFrames: 8, frameWidth: 16, frameHeight: 16},
		//projectiles
		{spriteName: 'projectile', fileName: 'projectiles/projectile_normal.png'},
		{spriteName: 'projectile_boost1', fileName: 'projectiles/projectile_boost1.png'},
		{spriteName: 'projectile_boost2', fileName: 'projectiles/projectile_boost2.png'},
		{spriteName: 'projectile_comboboost', fileName: 'projectiles/projectile_comboboost.png'},
		{spriteName: 'enemy1_projectile', fileName: 'projectiles/enemy1_projectile.png'},
		{spriteName: 'enemy2_projectile', fileName: 'projectiles/enemy2_projectile.png'},
		//HUD
		{spriteName: 'healthbar', fileName: 'HUD/healthbar.png'},
		{spriteName: 'armorbar', fileName: 'HUD/armorbar.png'},
		{spriteName: 'projectilebar', fileName: 'HUD/projectilebar_normal.png'},
		{spriteName: 'projectilebar_boost1', fileName: 'HUD/projectilebar_boost1.png'},
		{spriteName: 'projectilebar_boost2', fileName: 'HUD/projectilebar_boost2.png'},
		{spriteName: 'projectilebar_comboboost', fileName: 'HUD/projectilebar_comboboost.png'},
		{spriteName: 'healthpickup_ui', fileName: 'HUD/pickups/healthPickup_hud.png'},
		{spriteName: 'armorpickup_ui', fileName: 'HUD/pickups/shieldPickup_hud.png'},
		{spriteName: 'damageboost1pickup_ui', fileName: 'HUD/pickups/damageBoost1Pickup_hud.png'},
		{spriteName: 'damageboost2pickup_ui', fileName: 'HUD/pickups/damageBoost2Pickup_hud.png'},
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