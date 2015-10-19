(function(){
	var keyboard = document.getElementById("keyboard");
	var ctx = keyboard.getContext("2d");

	//var line1 = {};
	var qwer = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"];
	var asdf = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"];

	var kb = new Keyboard(keyboard, ctx);
	var line1 = new Line(kb, 10, 10, 45, 0);
	var line2 = new Line(kb, 10, 60, 45, 0);
	//var key1 = new Key(line1, 10, 10, 40, 40);

	for (var i = 0; i < qwer.length; i++) {
		new Key(line1, 10 + line1.spaceX * i, 10 + i * line1.spaceY, 40, 40, qwer[i]);
	}
	for (var j = 0; j < asdf.length; j++) {
		new Key(line2, 10 + line2.spaceX * j, 10 + j * line2.spaceY, 40, 40, asdf[j]);
	}

	keyboard.addEventListener("click", function (e) {
		kb.handleMouseDown(e);
	});

	keyboard.addEventListener("mousemove", function (e) {
		kb.handleMouseHover(e);
	});

	//Line 1
	//drawKey(ctx, 10, 10, 40, 40, "Q");
	//drawKey(ctx, 55, 10, 40, 40, "W");
	//drawKey(ctx, 100, 10, 40, 40, "E");

	//Line 2
	//drawKey(ctx, 20, 55, 40, 40, "A");
	//drawKey(ctx, 65, 55, 40, 40, "S");
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
	context.fillStyle = "limegreen";
	context.fillText(text, textWidth, textHeight);
	context.strokeStyle = "gray";
	context.stroke();
	context.closePath();
}