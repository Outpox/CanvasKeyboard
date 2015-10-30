var idKeyCount = 0;

/**
 * Key constructor.
 * @param line
 * @param startX
 * @param startY
 * @param lengthX
 * @param lengthY
 * @param content
 * @param type
 * @param data
 * @constructor
 */
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

/**
 * Redraw the key if it changed.
 * @param x
 * @param y
 * @returns {Key}
 */
Key.prototype.reDraw = function (x, y) {
    this.startX = x || this.startX;
    this.startY = y || this.startY;
    this.draw(this.strokeColor);
    return (this);
};

/**
 * Handle the hover event of a key.
 * @param x
 * @param y
 */
Key.prototype.hover = function (x, y) {
    this.startX = x || this.startX;
    this.startY = y || this.startY;
    this.draw(this.strokeColorHover);
};

/**
 * Default drawing of a key.
 * @param strokeColor
 */
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

/**
 * Return true if the given coordinates of a point are inside the key.
 * @param x
 * @param y
 * @returns {boolean}
 */
Key.prototype.isPointInside = function (x, y) {
    return (x >= this.startX && x <= this.startX + this.lengthX && y >= this.startY && y <= this.startY + this.lengthY);
};