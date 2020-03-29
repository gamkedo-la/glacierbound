var startHighlighted = false;
var creditsHighlighted = false;

function drawTitleScreen(){

    if (mousePos.x > (canvas.width / 2) - 50 &&
        mousePos.x < (canvas.width / 2) + 50 &&
        mousePos.y > (canvas.height / 2) - 10 &&
        mousePos.y < (canvas.height / 2) + 10){
            startHighlighted = true;
    } else {
        startHighlighted = false
    }

    if (mousePos.x > (canvas.width / 2) - 50 &&
        mousePos.x < (canvas.width / 2) + 50 &&
        mousePos.y > ((canvas.height / 2) - 10) + 40 &&
        mousePos.y < ((canvas.height / 2) + 10) + 40){
            creditsHighlighted = true;
    } else {
        creditsHighlighted = false;
    }

    document.exitPointerLock();
    colorRect(0, 0, canvas.width, canvas.height, 'Black');

    canvasContext.fillStyle = 'white';
    canvasContext.font = '80px Arial';
    canvasContext.textAlign = 'center';

    canvasContext.fillText("GLACIERBOUND", canvas.width / 2, canvas.height / 3);

    if (startHighlighted){
            canvasContext.fillStyle = 'blue';
        } else {
            canvasContext.fillStyle = 'white';
        }

    canvasContext.font = '20px Arial';
    canvasContext.fillText("Start", canvas.width / 2, canvas.height / 2);


    if (creditsHighlighted){
            canvasContext.fillStyle = 'blue';
        } else {
            canvasContext.fillStyle = 'white';
        }
    canvasContext.fillText("Credits", canvas.width / 2, (canvas.height / 2) + 40);
    
}