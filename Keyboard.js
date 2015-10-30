var idKeyboardCount = 0;

/**
 * The "master" class. You should only interact with this one.
 *
 * @param canvas - The <canvas> html element.
 * @param context - The context of the canvas (.getContext("2d")).
 * @param options - An object of settings for the keyboard.
 * @param debug - Boolean value.
 * @param lines - The object containing the lines. Might be removed from the constructor parameter.
 * @constructor
 */
function Keyboard(canvas, context, options, debug, lines) {
    var bounds = canvas.getBoundingClientRect();
    this.id = idKeyboardCount++;
    this.layout = options.layout || "qwerty_uk.json";
    this.canvas = canvas;
    this.context = context;
    this.offsetX = bounds.left || 0;
    this.offsetY = bounds.top || 0;
    this.backGroundColor = options.backGroundColor || "black";
    this.keyColor = options.keyColor || "gray";
    this.fontColor = options.fontColor || "gray";
    this.fontType = options.fontType || "25px Calibri";
    this.debug = debug || false;
    this.cursor = {x: null, y: null};
    this.lines = lines || [];
    this.selectedKey = {};
}
/**
 * The options object accept the following properties:
 *
 * layout | The layout name of the json file (without "templates/") | default: "qwerty_uk.json"
 * backGroundColor | The keyboard background color | default: "black"
 * keyColor | The keys border color | default: "gray"
 * fontColor | The keys font color | default: "gray"
 * fontType | The keys text font and size | default: "25px Calibri"
 */

/**
 * A shortcut for the line class to add itself to the keyboard list of lines.
 * @param Line
 */
Keyboard.prototype.pushLine = function (Line) {
    this.lines.push(Line);
};

/**
 * The function which handles the click event of a key.
 * @param e
 */
Keyboard.prototype.handleMouseDown = function (e) {
    document.getElementById("x").innerText = parseInt(e.clientX).toString();
    document.getElementById("y").innerText = parseInt(e.clientY).toString();
    for (var i = 0; i < this.lines.length; i++) {
        var mouseX = parseInt(e.clientX - this.offsetX + this.lines[i].startX);
        var mouseY = parseInt(e.clientY - this.offsetY + this.lines[i].startY);
        for (var j = 0; j < this.lines[i].keys.length; j++) {
            if (this.lines[i].keys[j].isPointInside(mouseX - this.lines[i].startX, mouseY - this.lines[i].startY)) {
                this.cursor.x = mouseX;
                this.cursor.y = mouseY;
                if (this.debug) console.log(this.lines[i].keys[j].content);
                this.selectedKey = this.lines[i].keys[j];
                document.getElementById("selectedKey").innerText = this.selectedKey.content;
            }
        }
    }
};

/**
 * The function which handle the hover event of a key.
 * @param e
 */
Keyboard.prototype.handleMouseHover = function (e) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.lines.length; i++) {
        var mouseX = parseInt(e.clientX - this.offsetX + this.lines[i].startX);
        var mouseY = parseInt(e.clientY - this.offsetY + this.lines[i].startY);
        for (var j = 0; j < this.lines[i].keys.length; j++) {
            if (this.lines[i].keys[j].isPointInside(mouseX - this.lines[i].startX, mouseY - this.lines[i].startY)) {
                if (mouseX !== this.cursor.x || mouseY !== this.cursor.y) {
                    this.lines[i].keys[j].hover();
                    if (this.debug) console.log(this.lines[i].keys[j].content);
                }
                else {
                    this.lines[i].keys[j].reDraw();
                }
            }
            else {
                this.lines[i].keys[j].reDraw();
            }
        }
    }
};

/**
 * This initialize the keyboard.
 */
Keyboard.prototype.init = function () {
    var layout = {};
    var thisKeyboard = this;

    loadJSON("keyboards/" + thisKeyboard.layout, function (data) {
        layout = JSON.parse(data);
        var maxWidth = thisKeyboard.canvas.width;
        var maxHeight = thisKeyboard.canvas.height;
        for (var i = 0; i < layout.rows.length; i++) {
            var lineWidth = 0;
            var lineHeight = 0;
            var line = new Line(thisKeyboard, layout.rows[i].startX, layout.rows[i].startY, layout.rows[i].spaceX, layout.rows[i].spaceY);
            console.group();
            console.log(line);

            var lineOffsetX = 0;
            var lineOffsetY = 0;

            for (var j = 0; j < layout.rows[i].keys.length; j++) {
                var key = layout.rows[i].keys[j];
                var keyWidth = 40;
                var keyHeight = 40;

                var keyStartX = 0;
                var keyStartY = 0;
                if ((key.type || "standard") !== "standard") {
                    switch (key.type) {
                        default:
                            keyStartX = line.startX + lineOffsetX + j * line.spaceX + j * keyWidth;
                            keyStartY = line.startY + lineOffsetY + i * line.spaceY + i * keyHeight;

                            lineOffsetX += (keyWidth * (key.data.widthFactor || 1)) - keyWidth;
                            lineOffsetY += (keyHeight* (key.data.heightFactor || 1)) - keyHeight;

                            keyWidth *= (key.data.widthFactor || 1);
                            keyHeight *= (key.data.heightFactor || 1);
                    }
                }
                else {
                    keyStartX = line.startX + lineOffsetX + j * line.spaceX + j * keyWidth;
                    keyStartY = line.startY + lineOffsetY + i * line.spaceY + i * keyHeight;
                }

                keyStartY = line.startY + i * line.spaceY + i * keyHeight;
                var createdKey = new Key(line, keyStartX, keyStartY, keyWidth, keyHeight, key.content, key.type || "standard");
                console.log(createdKey);
            }
            console.groupEnd();
        }
        thisKeyboard.canvas.addEventListener("click", function (e) {
            thisKeyboard.handleMouseDown(e);
        });
        thisKeyboard.canvas.addEventListener("mousemove", function (e) {
            thisKeyboard.handleMouseHover(e);
        });
    });
};

/**
 * I don't remember why I wrote this, but it seems to just resize the keyboard. Keeping for eventual later use.
 * @param width - New canvas width.
 * @param height - New canvas height.
 */
Keyboard.prototype.resizeCanvas = function (width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
};