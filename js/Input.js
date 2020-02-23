// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  player.setupControls(KEY_LETTER_W,KEY_LETTER_S,KEY_LETTER_A,KEY_LETTER_D);
}

function setKeyHoldState(thisKey, setTo) {
  if(thisKey == player.controlKeyForTurnLeft) {
    player.keyHeld_TurnLeft = setTo;
  }
  if(thisKey == player.controlKeyForTurnRight) {
    player.keyHeld_TurnRight = setTo;
  }
  if(thisKey == player.controlKeyForForward) {
    player.keyHeld_Forward = setTo;
  }
  if(thisKey == player.controlKeyForBackward) {
    player.keyHeld_Backward = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}