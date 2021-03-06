"use strict";

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
    this.layout = options.layout || "keyboards/qwerty_uk.json";
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.keyWidth = options.keyWidth || 40;
    this.keyHeight = options.keyHeight || 40;
    this.offsetX = parseInt(bounds.left) || 0;
    this.offsetY = parseInt(bounds.top) || 0;
    this.defaultCursor = options.defaultCursor || "auto";
    this.hoverCursor = options.hoverCursor || "pointer";
    this.disabledCursor = options.disabledCursor || "auto";
    this.backgroundColor = options.backgroundColor || canvas.style.backgroundColor || "white";

    //Unselected not hovered keys
    this.keyBorderColor = options.keyBorderColor || "gray";
    this.keyBorderWidth = parseInt(options.keyBorderWidth) || 1;
    this.keyBorderRadius = parseInt(options.keyBorderRadius) || 0;
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

    //Active not Selected
    this.keyActiveBackgroundColor = options.keyActiveBackgroundColor || "rgb(22, 160, 133)";

    //Active Selected
    //this.keyActiveSelectedBackgroundColor = options.keyActiveSelectedBackgroundColor || this.keySelectedBackgroundColor;

    this.debug = debug || false;
    this.mouseClick = {x: null, y: null};
    this.lines = lines || [];
    this.selectedKey = {};

    this.canvas.style.backgroundColor = this.backgroundColor;

    if (this.debug) {
        this.defaultCursor = "crosshair";
        this.disabledCursor = "crosshair";
        this.hoverCursor = "crosshair";
    }
}
/**
 * The options object accept the following properties:
 *
 * layout | The layout name of the json file | default: "keyboards/qwerty_uk.json"
 * backgroundColor | The keyboard background color | default: "black"
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
    // document.getElementById("x").innerText = parseInt(e.clientX).toString();
    // document.getElementById("y").innerText = parseInt(e.clientY).toString();
    for (var i = 0; i < this.lines.length; i++) {
        var mouseX = parseInt(e.clientX - this.offsetX + this.lines[i].startX + window.pageXOffset);
        var mouseY = parseInt(e.clientY - this.offsetY + this.lines[i].startY + window.pageYOffset);
        for (var j = 0; j < this.lines[i].keys.length; j++) {
            if (this.lines[i].keys[j].isPointInside(mouseX - this.lines[i].startX, mouseY - this.lines[i].startY) && !this.lines[i].keys[j].disabled) {
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
                this.canvas.dispatchEvent(new CustomEvent("keyClick", {'detail': {'selectedKey': this.selectedKey, 'e': e}}));
                // document.getElementById("selectedKey").innerText = this.selectedKey.content;
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
        var mouseX = parseInt(e.clientX - this.offsetX + this.lines[i].startX + window.pageXOffset);
        var mouseY = parseInt(e.clientY - this.offsetY + this.lines[i].startY + window.pageYOffset);
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
    var self = this;

    loadJSON(self.layout, function (data) {
        layout = JSON.parse(data);
        var maxWidth = self.canvas.width;
        var maxHeight = self.canvas.height;
        var lineStartXSum = 0;
        var lineStartYSum = 0;
        for (var i = 0; i < layout.rows.length; i++) {
            lineStartXSum += layout.rows[i].startX;
            lineStartYSum += layout.rows[i].startY;

            var totalWidth = 0;
            var totalHeight = 0;
            var line = new Line(self, lineStartXSum, lineStartYSum, layout.rows[i].spaceX, layout.rows[i].spaceY);
            if (self.debug) console.group();
            if (self.debug) console.log(line);

            var lineOffsetX = 0;
            var lineOffsetY = 0;

            for (var l = 0; l <= layout.rows[i].keys.length; l++) {
                var key = layout.rows[i].keys[l];
                if (l === layout.rows[i].keys.length) {
                    //totalWidth += line.spaceX;
                }
                else {
                    if (l === 0) {
                        totalWidth += self.keyWidth;
                    }
                    else if (key.data !== undefined) {
                        totalWidth += self.keyWidth * (key.data.widthFactor || 1) + line.spaceX;
                    }
                    else {
                        totalWidth += self.keyWidth + line.spaceX;
                    }
                }
            }

            //Math.round((VALUE HERE) * 100) / 100;
            var spareWidth = Math.round((maxWidth - totalWidth) * 100) / 100;
            var spareWidthPerKey = Math.round((spareWidth/layout.rows[i].keys.length) * 1000) / 1000;
            console.group("Row " + i);
            console.log("maxwidth: " + maxWidth);
            console.log("totalwidth: " + totalWidth);
            console.log("sparewidth: " + spareWidth);
            console.log(layout.rows[i].keys.length + " keys");
            console.log(spareWidthPerKey + " per key");
            console.groupEnd();
            for (var j = 0; j < layout.rows[i].keys.length; j++) {
                var key = layout.rows[i].keys[j];
                var keyWidth = self.keyWidth;
                var keyHeight = self.keyHeight;

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
                if (self.debug) console.log(createdKey);
            }
            if (self.debug) console.groupEnd();
        }
        self.canvas.addEventListener("click", function (e) {
            self.handleMouseDown(e);
        });
        self.canvas.addEventListener("mousemove", function (e) {
            self.handleMouseHover(e);
            if (self.debug) {
                var ctx = self.context;
                var mouseX = parseInt(e.clientX - self.offsetX + window.pageXOffset);
                var mouseY = parseInt(e.clientY - self.offsetY + window.pageYOffset);
                ctx.save();
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.fillStyle = "25px calibri";
                ctx.fillText(mouseX + "\n" + mouseY, mouseX + 10, mouseY - 10);
                ctx.restore();
            }
        });
    });
};

/**
 * Re-render the keyboard
 */
Keyboard.prototype.reDraw = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.lines.length; i++) {
        for (var j = 0; j < this.lines[i].keys.length; j++) {
            this.lines[i].keys[j].draw();
        }
    }
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