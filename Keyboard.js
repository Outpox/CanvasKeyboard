var idKeyboardCount = 0;

/**
 * The "master" class. You should only interact with this one.
 *
 * @param canvas - The <canvas> html element.
 * @param options - An object of settings for the keyboard.
 * @param debug - Boolean value.
 * @param lines - The object containing the lines. Might be removed from the constructor parameter.
 * @constructor
 */
function Keyboard(canvas, options, debug, lines) {
    var bounds = canvas.getBoundingClientRect();
    this.id = idKeyboardCount++;
    this.layout = options.layout || "qwerty_uk";
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.offsetX = bounds.left || 0;
    this.offsetY = bounds.top || 0;
    this.defaultCursor = options.defaultCursor || "auto";
    this.hoverCursor = options.hoverCursor || "pointer";
    this.disabledCursor = options.disabledCursor || "auto";
    this.backGroundColor = options.backGroundColor || "black";

    //Unselected not hovered keys
    this.keyBorderColor = options.keyBorderColor || "gray";
    this.keyBorderWidth = options.keyBorderWidth || 1;
    this.keyBorderRadius = options.keyBorderRadius || 1;
    this.keyBackgroundColor = options.keyBackgroundColor || "black";
    this.keyFontType = options.keyFontType || "25px Calibri";
    this.keyFontColor = options.keyFontColor || "gray";

    //Unselected hovered keys
    this.keyHoverBorderColor = options.keyHoverBorderColor || "white";
    this.keyHoverBorderWidth = options.keyHoverBorderWidth || this.keyBorderWidth;
    this.keyHoverBorderRadius = options.keyHoverBorderRadius || this.keyBorderRadius;
    this.keyHoverBackgroundColor = options.keyHoverBackgroundColor || this.keyBackgroundColor;
    this.keyHoverFontType = options.keyHoverFontType || this.keyFontType;
    this.keyHoverFontColor = options.keyHoverFontColor || this.keyFontColor;

    //Selected not hovered keys
    this.keySelectedBorderColor = options.keySelectedBorderColor || "#3FB55E";
    this.keySelectedBorderWidth = options.keySelectedBorderWidth || this.keyBorderWidth;
    this.keySelectedBorderRadius = options.keySelectedBorderRadius || this.keyBorderRadius;
    this.keySelectedBackgroundColor = options.keySelectedBackgroundColor || this.keyBackgroundColor;
    this.keySelectedFontType = options.keySelectedFontType || this.keyFontType;
    this.keySelectedFontColor = options.keySelectedFontColor || this.keyFontColor;

    //Selected hovered keys
    this.keySelectedHoverBorderColor = options.keySelectedHoverBorderColor || this.keySelectedBorderColor;
    this.keySelectedHoverBorderWidth = options.keySelectedHoverBorderWidth || this.keySelectedBorderWidth;
    this.keySelectedHoverBorderRadius = options.keySelectedHoverBorderRadius || this.keyBorderRadius;
    this.keySelectedHoverBackgroundColor = options.keySelectedHoverBackgroundColor || this.keySelectedBackgroundColor;
    this.keySelectedHoverFontType = options.keySelectedHoverFontType || this.keySelectedFontType;
    this.keySelectedHoverFontColor = options.keySelectedHoverFontColor || this.keySelectedFontColor;

    this.debug = debug || false;
    this.mouseClick = {x: null, y: null};
    this.lines = lines || [];
    this.selectedKey = {};
}
/**
 * The options object accept the following properties:
 *
 * layout | The layout name of the json file (without "templates/") | default: "qwerty_uk.json"
 * backGroundColor | The keyboard background color | default: "black"
 * keyBorderColor | The keys border color | default: "gray"
 * keyFontColor | The keys font color | default: "gray"
 * keyFontType | The keys text font and size | default: "25px Calibri"
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
                this.mouseClick.x = mouseX;
                this.mouseClick.y = mouseY;
                if (this.debug) console.log(this.lines[i].keys[j].content);
                if (this.selectedKey === this.lines[i].keys[j]) {
                    this.selectedKey.selected = false;
                    this.selectedKey = {};
                } else {
                    this.selectedKey.selected = false;
                    this.selectedKey = this.lines[i].keys[j];
                    this.selectedKey.selected = true;
                }
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
    var hover = {"hover": false};
    for (var i = 0; i < this.lines.length; i++) {
        var mouseX = parseInt(e.clientX - this.offsetX + this.lines[i].startX);
        var mouseY = parseInt(e.clientY - this.offsetY + this.lines[i].startY);
        for (var j = 0; j < this.lines[i].keys.length; j++) {
            if (this.lines[i].keys[j].isPointInside(mouseX - this.lines[i].startX, mouseY - this.lines[i].startY)) {
                //Prevent the click event to be casted twice
                if (mouseX !== this.mouseClick.x || mouseY !== this.mouseClick.y) {
                    hover = {"hover": true, "i": i, "j": j};
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
    if (this.debug) console.log(hover);
    if (hover.hover) {
        var currentKey = this.lines[hover.i].keys[hover.j];
        if (currentKey.disabled) {
            this.canvas.style.cursor = this.disabledCursor;
            currentKey.draw();
        } else {
            this.canvas.style.cursor = this.hoverCursor;
            currentKey.hover();
        }
        if (this.debug) console.log(this.lines[i].keys[j].content);
    }
    else {
        this.canvas.style.cursor = this.defaultCursor;
    }
};

/**
 * This initialize the keyboard.
 */
Keyboard.prototype.init = function () {
    var layout = {};
    var thisKeyboard = this;

    loadJSON("keyboards/" + thisKeyboard.layout + ".json", function (data) {
        layout = JSON.parse(data);
        var maxWidth = thisKeyboard.canvas.width;
        var maxHeight = thisKeyboard.canvas.height;
        for (var i = 0; i < layout.rows.length; i++) {
            var lineWidth = 0;
            var lineHeight = 0;
            var line = new Line(thisKeyboard, layout.rows[i].startX, layout.rows[i].startY, layout.rows[i].spaceX, layout.rows[i].spaceY);
            if (thisKeyboard.debug) console.group();
            if (thisKeyboard.debug) console.log(line);

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
                            lineOffsetY += (keyHeight * (key.data.heightFactor || 1)) - keyHeight;

                            keyWidth *= (key.data.widthFactor || 1);
                            keyHeight *= (key.data.heightFactor || 1);
                    }
                }
                else {
                    keyStartX = line.startX + lineOffsetX + j * line.spaceX + j * keyWidth;
                    keyStartY = line.startY + lineOffsetY + i * line.spaceY + i * keyHeight;
                }

                keyStartY = line.startY + i * line.spaceY + i * keyHeight;
                var createdKey = new Key(line, keyStartX, keyStartY, keyWidth, keyHeight, key.content, key.type || "standard", key.data);
                if (thisKeyboard.debug) console.log(createdKey);
            }
            if (thisKeyboard.debug) console.groupEnd();
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