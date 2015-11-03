var options = {"keySelectedBorderWidth": 1};

var kb = new Keyboard(document.getElementById("keyboard"), options);
kb.init();
console.log(kb);

var borderRadius = document.getElementById("borderRadiusValue");
var borderRadiusInput = document.getElementById("borderRadius");
var borderWidth = document.getElementById("borderWidthValue");
var borderWidthInput = document.getElementById("borderWidth");
var borderColor = document.getElementById("borderColorValue");
var borderColorInput = document.getElementById("borderColor");
var backGroundColor = document.getElementById("backgroundColorValue");
var backGroundColorInput = document.getElementById("backgroundColor");
var fontColor = document.getElementById("fontColorValue");
var fontColorInput = document.getElementById("fontColor");
var fontType = document.getElementById("fontTypeValue");
var fontTypeInput = document.getElementById("fontType");

borderRadius.innerHTML = borderRadiusInput.value = kb.keyBorderRadius;
borderRadiusInput.addEventListener("change", function () {
    borderRadius.innerHTML = borderRadiusInput.value;
    kb.keyBorderRadius = borderRadiusInput.value;
});

borderWidth.innerHTML = borderWidthInput.value = kb.keyBorderWidth;
borderWidthInput.addEventListener("change", function () {
    borderWidth.innerHTML = borderWidthInput.value;
    kb.keyBorderWidth = borderWidthInput.value;
});
borderColor.innerHTML = borderColorInput.value = kb.keyBorderColor;
borderColorInput.addEventListener("change", function () {
    borderColor.innerHTML = borderColorInput.value;
    kb.keyBorderColor = borderColorInput.value;
});
backGroundColor.innerHTML = backGroundColorInput.value = kb.keyBackgroundColor;
backGroundColorInput.addEventListener("change", function () {
    backGroundColor.innerHTML = backGroundColorInput.value;
    kb.keyBackgroundColor = backGroundColorInput.value;
});
fontColor.innerHTML = fontColorInput.value = kb.keyFontColor;
fontColorInput.addEventListener("change", function () {
    fontColor.innerHTML = fontColorInput.value;
    kb.keyFontColor = fontColorInput.value;
});
fontType.innerHTML = fontTypeInput.value = kb.keyFontType;
fontTypeInput.addEventListener("change", function () {
    fontType.innerHTML = fontTypeInput.value;
    kb.keyFontType = fontTypeInput.value;
});