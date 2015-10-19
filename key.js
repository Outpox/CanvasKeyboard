var Key = (function(){
	var idCount = 0;
	function Key(startX, startY, lengthX, lengthY, fillColor, strokeColor, strokeWidth){
		this.id = idCount++;
		this.startX = startX;
		this.startY = startY;
		this.width = lengthX;
		this.height = lengthY;
		
	};
})();