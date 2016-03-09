# CanvasKeyboard

The goal of this tool is to add and manage a keyboard made with the html5 element ```<canvas>``` and javascript in your webpage.  
Currently the keyboard is loaded from a ```.json``` file.

I made this tool to replace the keyboard on [http://csgobindsgenerator.com](http://csgobindsgenerator.com) but I'm trying my best to keep this project as much neutral as possible.   

## How to use
Still a wip, but if you want to test it just clone this repository and open the index.html file.
Make sure to have a local server to test it, an ajax request is made on the default json keyboard and therefore will not work when loading it from ```file://```  
Most basic and working call (will display the keyboard as the screenshot at the bottom):
```js
var htmlCanvas = document.getElementById("yourCanvas");
new Keyboard(htmlCanvas, {}).init();
```

Check the doc inside the files for more explanations. I'll write an online documentation when I think the project is ready to be shared.

##Current features
* Highly configurable keyboard
  * Colors
  * Size
  * Font
* Support click, selected and hover events
  * You can configure the keyboard for each state and each combination of events
* Custom shaped keys
* Custom cursor for hover, click, disabled keys...
* Easy to use

## To do
* Automatic resize of the keys (in order to use the whole available space)
* Improve custom keys
* Add more options
* Multiple values for a key
* Handle Caps Lock, Num Lock, Shift
* Bind physical and software keyboard (to some extent, won't do more than the browser allows)
* Some fix/improvements for other browsers (using Chrome)
* Keyboard maker

## Test
You can test an online version of the keyboard [here](http://62.210.236.193/csgobindsgenerator)

## Preview
![Default keyboard](http://i.imgur.com/XsGywSn.png)
