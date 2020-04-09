function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function drawRect(topLeftX, topLeftY, boxWidth, boxHeight, strokeColor){
    canvasContext.beginPath();
    canvasContext.strokeStyle = strokeColor;
    canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
    canvasContext.stroke();
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorLine(x1, y1, x2, y2, color) {
    canvasContext.beginPath();
    canvasContext.strokeStyle = color;
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

function colorLineAtAngle(x, y, angle, length, color){
    canvasContext.beginPath();
    canvasContext.strokeStyle = color;
    canvasContext.moveTo(x, y);
    canvasContext.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    canvasContext.stroke();
}

function rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")";
}