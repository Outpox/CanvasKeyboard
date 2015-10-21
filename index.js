var keyboard = document.getElementById("keyboard");
var ctx = keyboard.getContext("2d");


//var qwer = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"];
//var asdf = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "#"];

//var line1 = new Line(kb, 10, 10, 45, 0);
//var line2 = new Line(kb, 20, 55, 45, 0);
//var key1 = new Key(line1, 10, 10, 40, 40);

//for (var i = 0; i < qwer.length; i++) {
//    new Key(line1, line1.startX + line1.spaceX * i, line1.startY + i * line1.spaceY, 40, 40, qwer[i]);
//}
//for (var j = 0; j < asdf.length; j++) {
//    new Key(line2, line2.startX + line2.spaceX * j, line2.startY + j * line2.spaceY, 40, 40, asdf[j]);
//}

var kb = new Keyboard(keyboard, ctx, {});
kb.init();

//ctx.beginPath();
//ctx.moveTo(550, 10);
//
//ctx.lineTo(620, 10);
//ctx.lineTo(620, 95);
//ctx.lineTo(560, 95);
//ctx.lineTo(560, 50);
//ctx.lineTo(550, 50);
//ctx.lineTo(550, 10);
//
//ctx.strokeStyle = "red";
//ctx.lineWidth = 1;
//ctx.stroke();
