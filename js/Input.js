// keyboard keycode constants, determined by printing out evt.keyCode from a key handler
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_LETTER_E = 69;
const KEY_LETTER_L = 76;
const KEY_LETTER_M = 77;
const KEY_LETTER_P = 80;
const KEY_ALT = 18;
const KEY_SPACE = 32;
const KEY_NUMBER_1 =  49; //Health Pick-up activate
const KEY_NUMBER_2 =  50; //Armor Pick-up
const KEY_NUMBER_3  = 51; //Damage Boost Type 1
const KEY_NUMBER_4  = 52; //Damage Boost Type 2
const KEY_RIGHT_BRACKET = 221;
const KEY_LEFT_BRACKET = 219;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  player.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D, KEY_LETTER_E);

  initMouse();
}

function pollInput() {
  pollMouseButtons();
}

function setKeyHoldState(thisKey, setTo) {
  if (thisKey == player.controlKeyForStrafeLeft) player.keyHeld_Left = setTo;

  if (thisKey == player.controlKeyForStrafeRight) player.keyHeld_Right = setTo;

  if (thisKey == player.controlKeyForForward) player.keyHeld_Forward = setTo;

  if (thisKey == player.controlKeyForBackward) player.keyHeld_Backward = setTo;

  if (thisKey == player.controlKeyForFire) player.keyHeld_Fire = setTo;

  if (thisKey === KEY_SPACE && setTo === true) player.frob();

  if (thisKey === KEY_LETTER_L && setTo === true) toggleLevelEditMode();

  if (thisKey === KEY_LETTER_M && setTo === true) toggleDebugMode();

  if (thisKey == KEY_LETTER_P && setTo === true) pauseGame();

  if (thisKey == KEY_NUMBER_1 && setTo === true) player.activatePickUp('health');
  if (thisKey == KEY_NUMBER_2 && setTo === true) player.activatePickUp('armor');
  if (thisKey == KEY_NUMBER_3 && setTo === true) player.activatePickUp('damageboost1');
  if (thisKey == KEY_NUMBER_4 && setTo === true) player.activatePickUp('damageboost2');

  if (thisKey == KEY_RIGHT_BRACKET && setTo === true) increaseBGMVolume();
  if (thisKey == KEY_LEFT_BRACKET && setTo === true) decreaseBGMVolume();

}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}