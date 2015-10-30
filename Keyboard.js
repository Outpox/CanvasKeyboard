var idKeyboardCount = 0;

function Keyboard(canvas, context, options, debug, lines) {
    var bounds = canvas.getBoundingClientRect();
    this.id = idKeyboardCount++;
    this.layout = options.layout || "templates/qwerty_uk.json";
    this.canvas = canvas;
    this.context = context;
    this.offsetX = bounds.left || 0;
    this.offsetY = bounds.top || 0;
    this.backGroundColor = options.backGroundColor || "black";
    this.keyColor = options.keyColor || "gray";
    this.fontColor = options.fontColor || "lightpink";
    this.fontType = options.fontType || "25px Calibri";
    this.debug = debug || false;
    this.cursor = {x: null, y: null};
    this.lines = lines || [];
    this.selectedKey = {};
}

Keyboard.prototype.pushLine = function (Line) {
    this.lines.push(Line);
};

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

Keyboard.prototype.init = function () {
    var layout = {};
    var thisKeyboard = this;

    loadJSON("keyboards/qwerty_uk.json", function (data) {
        layout = JSON.parse(data);
        for (var i = 0; i < layout.rows.length; i++) {
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
