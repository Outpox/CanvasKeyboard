var keyboard = document.getElementById("keyboard");
var ctx = keyboard.getContext("2d");

var options = {};
var kb = new Keyboard(keyboard, ctx, options, true);
kb.init();

//ctx.beginPath();
//ctx.moveTo(550, 10);
//
//ctx.lineTo(620, 10); //620
//ctx.lineTo(620, 95);
//ctx.lineTo(560, 95);
//ctx.lineTo(560, 50);
//ctx.lineTo(550, 50);
//ctx.lineTo(550, 10);
//
//ctx.strokeStyle = "red";
//ctx.lineWidth = 1;
//ctx.stroke();