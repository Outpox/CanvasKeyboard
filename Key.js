"use strict";

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
class Key {
    constructor(line, startX, startY, lengthX, lengthY, content, type, data) {
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
        this.active = false;
        this.disabled = this.data.disabled || false;
        line.pushKey(this);
        this.draw();
    }

    /**
     * Redraw the key if it changed.
     * @param x
     * @param y
     * @returns {Key}
     */
    reDraw(x, y) {
        var self = this;
        self.startX = x || self.startX;
        self.startY = y || self.startY;
        self.draw(self.selected ? self.line.keyboard.keySelectedBorderColor : self.line.keyboard.keyBorderColor);
        return (self);
    }

    /**
     * Handle the hover event of a key.
     * @param x
     * @param y
     */
    hover(x, y){
        var self = this;
        self.startX = x || self.startX;
        self.startY = y || self.startY;
        self.draw(self.selected ? self.line.keyboard.keySelectedHoverBorderColor : self.line.keyboard.keyHoverBorderColor, true);
    }

    /**
     * Default drawing of a key.
     * @param strokeColor
     * @param hover
     */
    draw(strokeColor, hover) {
        hover = hover || false;
        var ctx = this.line.context;
        var textWidth = this.startX + (this.lengthX / 2);
        var textHeight = ctx.measureText("I").width + this.startY + (this.lengthY / 2);
        var borderRadius = hover ? (this.selected ? this.line.keyboard.keySelectedHoverBorderRadius : this.line.keyboard.keyHoverBorderRadius) : (this.selected ? this.line.keyboard.keySelectedBorderRadius : this.line.keyboard.keyBorderRadius);
        ctx.save();
        ctx.beginPath();
        if (this.disabled) ctx.globalAlpha = 0.5;
        ctx.fillStyle = hover ? (this.selected ? this.line.keyboard.keySelectedHoverBackgroundColor : (this.active ? this.line.keyboard.keyActiveBackgroundColor : this.line.keyboard.keyHoverBackgroundColor)) : (this.selected ? this.line.keyboard.keySelectedBackgroundColor : (this.active ? this.line.keyboard.keyActiveBackgroundColor : this.line.keyboard.keyBackgroundColor));
        ctx.strokeStyle = strokeColor || (this.selected ? this.line.keyboard.keySelectedBorderColor : this.line.keyboard.keyBorderColor);
        ctx.lineWidth = hover ? (this.selected ? this.line.keyboard.keySelectedHoverBorderWidth : this.line.keyboard.keyHoverBorderWidth) : (this.selected ? this.line.keyboard.keySelectedBorderWidth : this.line.keyboard.keyBorderWidth);
        if (this.type === "custom") {
            textWidth = this.startX + (this.data.customWidth / 2) || textWidth;
            textHeight = this.startX + (this.data.customHeight / 2) || textHeight;

            //ctx._customShape(this);
            //ctx._roundPoly(this, parseInt(borderRadius));
        } else if (this.type === "square") {
            this.lengthX = this.data.customWidth || this.lengthX;
            this.lengthY = this.data.customHeight || this.lengthY;
            textWidth = this.startX + (this.lengthX / 2) || textWidth;
            textHeight = ctx.measureText("I").width + this.startY + (this.lengthY / 2);
            ctx._roundRect(this.startX, this.startY, this.lengthX, this.lengthY, parseInt(borderRadius), true, true);
        } else {
            ctx._roundRect(this.startX, this.startY, this.lengthX, this.lengthY, parseInt(borderRadius), true, true);
        }
        ctx.font = hover ? (this.selected ? this.line.keyboard.keySelectedHoverFontType : this.line.keyboard.keyHoverFontType) : (this.selected ? this.line.keyboard.keySelectedFontType : this.line.keyboard.keyFontType);
        ctx.textAlign = "center";
        ctx.fillStyle = hover ? (this.selected ? this.line.keyboard.keySelectedHoverFontColor : this.line.keyboard.keyHoverFontColor) : (this.selected ? this.line.keyboard.keySelectedFontColor : this.line.keyboard.keyFontColor);
        ctx.fillText(this.content, textWidth, textHeight);
        ctx.restore();
    }

    /**
     * Return true if the given coordinates of a point are inside the key.
     * @param x
     * @param y
     * @returns {boolean}
     */
    isPointInside(x, y) {
        if (this.type === "custom") {
            var polygon = [];
            for (var i = 0; i < this.data.customShape.length; i++) {
                if (this.data.customShape[i].function === "lineTo") {
                    polygon.push([parseInt(this.data.customShape[i].x + this.startX), parseInt(this.data.customShape[i].y + this.startY)]);
                }
            }
            return inside([x, y], polygon);
        }
        else {
            var res = x >= this.startX && x <= this.startX + this.lengthX && y >= this.startY && y <= this.startY + this.lengthY;
            if (this.line.keyboard.debug) console.log(res + " | mouseX: " + x + " | mouseY: " + y + " | keyX: " + this.startX + " | keyY: " + this.startY);
            return (res);
        }
    }

    getValue() {
        return (this.data.value !== undefined) ? this.data.value : this.content;
    }
}