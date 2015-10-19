        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;

        //
        var rect = (function () {

            // constructor
            function rect(id, x, y, width, height, fill, stroke, strokewidth) {
                this.x = x;
                this.y = y;
                this.id = id;
                this.width = width;
                this.height = height;
                this.fill = fill || "gray";
                this.stroke = stroke || "skyblue";
                this.strokewidth = strokewidth || 2;
                this.redraw(this.x, this.y);
                return (this);
            }
            rect.prototype.redraw = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw(this.stroke);
                return (this);
            };
            //
            rect.prototype.highlight = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw("orange");
                return (this);
            };
            //
            rect.prototype.draw = function (stroke) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = this.fill;
                ctx.strokeStyle = stroke;
                ctx.lineWidth = this.strokewidth;
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
                ctx.fill();
                ctx.restore();
            };
            //
            rect.prototype.isPointInside = function (x, y) {
                return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
            };


            return rect;
        })();


        //
        function handleMouseDown(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // Put your mousedown stuff here
            var clicked = "";
            for (var i = 0; i < rects.length; i++) {
                if (rects[i].isPointInside(mouseX, mouseY)) {
                    clicked += rects[i].id + " "
                }
            }
            if (clicked.length > 0) {
                alert("Clicked rectangles: " + clicked);
            }
        }

        //
        function handleMouseMove(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // Put your mousemove stuff here
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < rects.length; i++) {
                if (rects[i].isPointInside(mouseX, mouseY)) {
                    rects[i].highlight();
                } else {
                    rects[i].redraw();
                }
            }
        }


        //
        var rects = [];
        //
        rects.push(new rect("Red-Rectangle", 15, 35, 65, 60, "red", "black", 10));
        rects.push(new rect("Green-Rectangle", 60, 80, 70, 50, "green", "black", 10));
        rects.push(new rect("Blue-Rectangle", 125, 25, 25, 25, "blue", "black", 10));

        //
        $("#canvas").click(handleMouseDown);
        $("#canvas").mousemove(handleMouseMove);