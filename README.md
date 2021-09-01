sdfdfsdf# ae2gs
Move your animation from After Effects to the browser, animated with the Greensock library.

Supports rotation, scaling, opacity and position from After effects.

#### Export from After Effects
1. Name the layers as class names (e.g. `.circle1`)
1. Select the layers and properties that you want to export from the timeline
2. File -> Scripts -> Run scripts file, and select the ae.jsx file.
3. Select the code (double click) that pops up, right click and copy.

testing123
#### Import into browser
```html
<script src="js/ae2gs.js"></script>
```
```javascript
var animJson = ""; //Put JSON from After Effects in this var
var animate = new Animation.init(animJson, {repeat: 0});
animate.start();
```
new changes
new changes 2