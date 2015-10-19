var idLineCount = 0;

function Line(keyboard, startX, startY, spaceX, spaceY, keys) {
    this.id = idLineCount++;
    this.context = keyboard.context;
    this.startX = startX;
    this.startY = startY;
    this.spaceX = spaceX;
    this.spaceY = spaceY;
    this.keys = keys || [];
    this.keyboard = keyboard;
    keyboard.pushLine(this);
}

Line.prototype.pushKey = function (Key) {
    this.keys.push(Key);
};