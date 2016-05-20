var Animation = (function(){

  var animJson;

  var init = function(json, options){
    animJson = json;
    var mainTimeline = new TimelineMax();

    if(!options) {
        var options = {};
        options.repeat = 0;
    }

    for(var layer in animJson){
        for(var propName in animJson[layer]['props']){
            if(typeof animJson[layer] == "object"){
                mainTimeline.add(animate(layer, propName, options.repeat), 0);
            }
        }
    }

    mainTimeline.pause();

    /*
    var slider = new GSAPTLSlider(mainTimeline, "container", {
       width: 300
    });
    */

    mainTimeline.eventCallback("onUpdate", updateSlider);

    $("#slider").slider({
      range: false,
      min: 0,
      max: 100,
      step:.1,
      slide: function ( event, ui ) {
        mainTimeline.pause();
        //adjust the timeline's progress() based on slider value
        mainTimeline.progress( ui.value/100 );
        }
    });

    function updateSlider() {
      $("#slider").slider("value", mainTimeline.progress() *100);
    }

    $("#play").click(function() {
		mainTimeline.play();
    });

    $("#pause").click(function() {
    		mainTimeline.pause();
    });

    $("#reverse").click(function() {
    		mainTimeline.reverse();
    });

    $("#resume").click(function() {
    		mainTimeline.resume();
    });

    $("#stagger").click(function() {
    		mainTimeline.play("stagger");
    });

    $("#restart").click(function() {
    		mainTimeline.restart();
    });

    //mainTimeline.pause();
    return {

      start: function(){
         mainTimeline.restart();
      }

    }



  };

  var animate = function(identifier, property, repeat){
    var timeline = new TimelineMax({repeat: repeat });
    var counter = 1;
    var props = animJson[identifier]['props'];

    for(var key in props[property]){
      if(counter == 1){
        var firstArgs = {};

        if(props[property][key]['value'].length == 2){
          firstArgs['x'] = props[property][key]['value'][0];
          firstArgs['y'] = props[property][key]['value'][1];
          timeline.set(props[property][key]['selector'], {x: "-50%"});
          timeline.set(props[property][key]['selector'], {y: "-50%"});

          console.log(firstArgs);
        }
        else{
          firstArgs[property] = props[property][key]['value'];
        }

        timeline.set(props[property][key]['selector'], firstArgs);
      }

      else{
        var easing = [];

        //TODO: Implement easing
        if(props[property][key]['easing']){
          easing[0] = props[property][key]['easing'][0];
          easing[1] = props[property][key]['easing'][1];
          easing[2] = props[property][key]['easing'][2];
          easing[3] = props[property][key]['easing'][3];
        }
        else{
          easing[0] = 1;
          easing[1] = 1;
          easing[2] = 1;
          easing[3] = 1;
        }

        var timelineArgs = { ease: Power0.easeNone};
        if(props[property][key]['value'].length == 2){
          timelineArgs['x'] = props[property][key]['value'][0];
          timelineArgs['y'] = props[property][key]['value'][1];
        }
        else{
          timelineArgs[property] = props[property][key]['value'];
        }

        timeline.to(props[property][key]['selector'], props[property][key]['time'], timelineArgs);

      }
        counter++;
    }

    return timeline;
  };

  return {
    init: init,
  }

})();
