(function(){
	var keyboard = document.getElementById("keyboard");
	var ctx = keyboard.getContext("2d");

	var line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"];

	//Line 1
	drawKey(ctx, 10, 10, 40, 40, "Q");
	drawKey(ctx, 55, 10, 40, 40, "W");
	drawKey(ctx, 100, 10, 40, 40, "E");

	//Line 2
	drawKey(ctx, 20, 55, 40, 40, "A");
	drawKey(ctx, 65, 55, 40, 40, "S");
})();

function drawKey(context, startX, startY, lengthX, lengthY, text) {
	context.beginPath();
	context.rect(startX, startY, lengthX, lengthY);
	context.font = "25px Calibri";
	var textWidth = startX + (lengthX/2);
	console.group();
	console.log("w: " + textWidth);
	var textHeight = context.measureText("j").width + startY + (lengthY/2);
	console.log("h: " + textHeight);
	console.groupEnd();
	context.textAlign = "center";
	context.fillText(text, textWidth, textHeight);
	context.stroke();
	context.closePath();
}