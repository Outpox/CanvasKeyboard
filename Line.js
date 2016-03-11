"use strict";

var idLineCount = 0;

class Line {
    /**
     * The Line constructor.
     * @param keyboard
     * @param startX
     * @param startY
     * @param spaceX
     * @param spaceY
     * @param keys
     * @constructor
     */
    constructor (keyboard, startX, startY, spaceX, spaceY, keys) {
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

    /**
     * Shortcut for the Key class in order to add itself to the current Line.
     * @param Key
     */
    pushKey(Key) {
        this.keys.push(Key);
    }

    /**
     * Was used for debug. Display the Line starting point.
     */
    dot() {
        this.context.beginPath();
        this.context.strokeStyle = "red";
        this.context.rect(this.startX, this.startY, 1, 1);
        this.context.stroke();
    }
}