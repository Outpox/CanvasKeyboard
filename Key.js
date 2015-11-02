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
    this.content = content || "";
    this.type = type || "standard";
    this.data = data || {};
    this.line = line;
    this.selected = false;
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
    this.draw(this.selected ? this.line.keyboard.keySelectedBorderColor : this.line.keyboard.keyBorderColor);
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
    this.draw(this.selected ? this.line.keyboard.keySelectedHoverBorderColor : this.line.keyboard.keyHoverBorderColor, true);
};

/**
 * Default drawing of a key.
 * @param strokeColor
 * @param hover
 */
Key.prototype.draw = function (strokeColor, hover) {
    hover = hover || false;
    var ctx = this.line.context;
    var textWidth = this.startX + (this.lengthX / 2);
    var textHeight = ctx.measureText("I").width + this.startY + (this.lengthY / 2);
    var borderRadius = hover ? (this.selected ? this.line.keyboard.keySelectedHoverBorderRadius : this.line.keyboard.keyHoverBorderRadius) : (this.selected ? this.line.keyboard.keySelectedBorderRadius : this.line.keyboard.keyBorderRadius);
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.selected ? this.line.keyboard.keySelectedBackgroundColor : this.line.keyboard.keyBackgroundColor;
    ctx.strokeStyle = strokeColor || (this.selected ? this.line.keyboard.keySelectedBorderColor : this.line.keyboard.keyBorderColor);
    ctx.lineWidth = hover ? (this.selected ? this.line.keyboard.keySelectedHoverBorderWidth : this.line.keyboard.keyHoverBorderWidth) : (this.selected ? this.line.keyboard.keySelectedBorderWidth : this.line.keyboard.keyBorderWidth);;
    ctx._roundRect(this.startX, this.startY, this.lengthX, this.lengthY, parseInt(borderRadius), true, true);
    ctx.font = hover ? (this.selected ? this.line.keyboard.keySelectedHoverFontType : this.line.keyboard.keyHoverFontType) : (this.selected ? this.line.keyboard.keySelectedFontType : this.line.keyboard.keyFontType);
    ctx.textAlign = "center";
    ctx.fillStyle = hover ? (this.selected ? this.line.keyboard.keySelectedHoverFontColor : this.line.keyboard.keyHoverFontColor) : (this.selected ? this.line.keyboard.keySelectedFontColor : this.line.keyboard.keyFontColor);
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