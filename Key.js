var idKeyCount = 0;

function Key(line, startX, startY, lengthX, lengthY, content, type, data) {
    this.id = idKeyCount++;
    this.startX = startX;
    this.startY = startY;
    this.lengthX = lengthX;
    this.lengthY = lengthY;
    this.fillColor = "black";
    this.strokeColor = "grey";
    this.strokeColorHover = "green";
    this.strokeWidth = 1;
    this.content = content || "";
    this.type = type || "standard";
    this.data = data || {};
    this.line = line;
    line.pushKey(this);
    this.draw();
}

Key.prototype.reDraw = function (x, y) {
    this.startX = x || this.startX;
    this.startY = y || this.startY;
    this.draw(this.strokeColor);
    return (this);
};

Key.prototype.hover = function (x, y) {
    this.startX = x || this.startX;
    this.startY = y || this.startY;
    this.draw(this.strokeColorHover);
};

Key.prototype.draw = function (strokeColor) {
    var ctx = this.line.context;
    var textWidth = this.startX + (this.lengthX / 2);
    var textHeight = ctx.measureText("I").width + this.startY + (this.lengthY / 2);
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = strokeColor || this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.rect(this.startX, this.startY, this.lengthX, this.lengthY);
    ctx.stroke();
    ctx.fill();
    ctx.font = this.line.keyboard.fontType;
    ctx.textAlign = "center";
    ctx.fillStyle = this.line.keyboard.fontColor;
    ctx.fillText(this.content, textWidth, textHeight);
    ctx.restore();
};

Key.prototype.isPointInside = function (x, y) {
    return (x >= this.startX && x <= this.startX + this.lengthX && y >= this.startY && y <= this.startY + this.lengthY);
};