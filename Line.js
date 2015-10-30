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

Line.prototype.dot = function () {
    this.context.beginPath();
    this.context.strokeStyle = "red";
    this.context.rect(this.startX, this.startY, 1, 1);
    this.context.stroke();
};