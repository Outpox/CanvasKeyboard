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
                console.log(this.lines[i].keys[j].content);
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
                    console.log(this.lines[i].keys[j].content);
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
            for (var j = 0; j < layout.rows[i].keys.length; j++) {
                var key = layout.rows[i].keys[j];
                var createdKey = new Key(line, line.startX + j * line.spaceX, line.startY + i * line.spaceY, 40, 40, key.content, key.type || "standard");
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
