# ng-tooltip
angulart  directive for tile hint | desscrption | tooltip

# useage
> *  ```<script src="ng-tooltips.js"></script>```
> *  ```<div toolips="options"></div>```
> *  ```var app = angular.module('app', ['ngToolTip']);```
   
 
# tooltips options

``` json
{
  "place": "right",
  "title": "click show/hide",
  "close": false,
  "html":true,
  "timeout":1000,
  "style":{
    "background": "#f00", 
    "color": "#ff0"
  },
}
```

# params description
> * **place**:"top|left|bottom|right"
> * **title**:"your content to show ,for safe,default use .text() , if html is true use .html()"
> * **close**:"true|false,default is true ,will close auto when mouseleave, if close is false, when click your element tooltip will toggle"
> * **timeou**t:"delay the tooltip hide ,default is right now , if close is false , timeout is unused"
> * **html**:"if true use .html() else use .text(), default is false"
> * **style**:"self style for tooltip"
