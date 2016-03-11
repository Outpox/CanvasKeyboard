"use strict";

/**
 * Do an Ajax Request with json mime type
 * @param filename
 * @param callback
 */
function loadJSON(filename, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

/**
 * Return if the given coordinate are inside the polygon
 * Source: https://github.com/substack/point-in-polygon
 * @param points
 * @param polygon
 * @returns {boolean}
 */
function inside(points, polygon) {
    var x = points[0], y = points[1];

    var inside = false;
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0], yi = polygon[i][1];
        var xj = polygon[j][0], yj = polygon[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

/**
 * Draw a rounded rectangle
 * Source: http://stackoverflow.com/a/3368118
 * @param x - Starting X.
 * @param y - Starting Y.
 * @param width - Rectangle width.
 * @param height - Rectangle height.
 * @param radius - Corner radius.
 * @param fill - Boolean value.
 * @param stroke - Boolean value.
 */
CanvasRenderingContext2D.prototype._roundRect = function (x, y, width, height, radius, fill, stroke) {
    if (radius !== 0 && radius !== 1) {
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        this.beginPath();
        this.moveTo(x + radius.tl, y);
        this.lineTo(x + width - radius.tr, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        this.lineTo(x + width, y + height - radius.br);
        this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        this.lineTo(x + radius.bl, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        this.lineTo(x, y + radius.tl);
        this.quadraticCurveTo(x, y, x + radius.tl, y);
        this.closePath();
        if (fill) {
            this.fill();
        }
        if (stroke) {
            this.stroke();
        }
    }
    else {
        this.rect(x, y, width, height);
        this.fill();
        this.stroke();
    }
};

/**
 *
 * @param key
 * @param radius
 */
CanvasRenderingContext2D.prototype._roundPoly = function (key, radius) {
    var shape = key.data.shape;
    var x = null;
    var y = null;
    var lastX = null;
    var lastY = null;
    var lastChange = null; //horizontal || vertical

    for (var i = 0; i < shape.length; i++) {
        x = shape[i].x;
        y = shape[i].y;
        switch (shape[i].function) {
            case "moveTo":
                this.moveTo(parseInt(key.startX + x), parseInt(key.startY + y));
                break;

            case "lineTo":
                this.lineTo(parseInt(key.startX + x), parseInt(key.startY + y));

                break;
        }
    }
    this.stroke();
    this.fill();
};

CanvasRenderingContext2D._customShape = function (key) {
    var shape = key.data.customShape;
    for (var i = 0; i < shape.length; i++) {
        var func = shape[i].function;
        var x = shape[i].x;
        var y = shape[i].y;
        if (func === "moveTo") {
            this.moveTo(parseInt(key.startX + x), parseInt(key.startY + y));
        }
        if (func === "lineTo") {
            this.lineTo(parseInt(key.startX + x), parseInt(key.startY + y));
        }
    }
    this.stroke();
    this.fill();
};

/**
 * Override the CustomEvent function to add IE support
 * Source: https://developer.mozilla.org/fr/docs/Web/API/CustomEvent
 */
(function () {
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();