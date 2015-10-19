var idKeyboardCount = 0;

function Keyboard(canvas, context, backGroundColor, keyColor, fontColor, fontType, lines) {
    var bounds = canvas.getBoundingClientRect();
    console.log(bounds);
    this.id = idKeyboardCount++;
    this.canvas = canvas;
    this.context = context;
    this.offsetX = bounds.left || 0;
    //this.offsetX = 0;
    //this.offsetY = 0;
    this.offsetY = bounds.top || 0;
    this.backGroundColor = backGroundColor || "black";
    this.keyColor = keyColor || "gray";
    this.fontColor = fontColor || "limegreen";
    this.fontType = fontType || "25px Calibri";
    this.lines = lines || [];
    this.selectedKey = {};
    console.log(this.offsetX);
    console.log(this.offsetY);
}

Keyboard.prototype.pushLine = function (Line) {
    this.lines.push(Line);
};

Keyboard.prototype.handleMouseDown = function (e) {
    for (var i = 0; i < this.lines.length; i++) {
        var mouseX = parseInt(e.clientX - this.offsetX + this.lines[i].startX);
        var mouseY = parseInt(e.clientY - this.offsetY + this.lines[i].startY);
        for (var j = 0; j < this.lines[i].keys.length; j++) {
            if (this.lines[i].keys[j].isPointInside(mouseX - this.lines[i].startX, mouseY - this.lines[i].startY)) {
                console.log(this.lines[i].keys[j].content);
                this.selectedKey = this.lines[i].keys[j];
                document.getElementById("selectedKey").innerText = this.selectedKey.content;
            }
        }
    }
};

Keyboard.prototype.handleMouseHover = function (e) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.lines.length; i++) {
        var mouseX = parseInt(e.clientX - this.offsetX + this.lines[i].startX);
        var mouseY = parseInt(e.clientY - this.offsetY + this.lines[i].startY);
        for (var j = 0; j < this.lines[i].keys.length; j++) {
            if (this.lines[i].keys[j].isPointInside(mouseX - this.lines[i].startX, mouseY - this.lines[i].startY)) {
                this.lines[i].keys[j].hover();
                console.log(this.lines[i].keys[j].content);
            }
            else {
                this.lines[i].keys[j].reDraw();
            }
        }
    }
};