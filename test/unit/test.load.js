module('head.load.js');

function getStyle(ele, styleProp) {
    var y = "";

    if (ele.currentStyle) {
        y = ele.currentStyle[styleProp];
    }
    else if (window.getComputedStyle) {
        y = document.defaultView.getComputedStyle(ele, null).getPropertyValue(styleProp);
    }
    
    return y;
}

asyncTest("jquery, mootools (trigger via callback)", function() {
    expect(2);
    
    head.js(
        "http://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js",
        

        function() {                        
            $j = jQuery.noConflict();
                        
            ok(!!$j("#qunit-header").addClass, "Callback: jQuery");
            ok(!!$$("#qunit-header").addClass, "Callback: Mootools");
            
            start();
        }
    );
});

asyncTest("jquery (trigger via filename)", function () {
    expect(1);
    
    head.ready("jquery.min.js", function() {        
        ok(!!jQuery, "Filename: ready('jquery.min.js')");
        
        start();
    });
    
    
    head.js("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");    
});


asyncTest('jshint, jquery, knockout (trigger via label)', function () {
    expect(6);

    head.js(
        { jshint  : "http://ajax.aspnetcdn.com/ajax/jshint/r07/jshint.js" },
        { jquery  : "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" },
        { knockout: "http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.1.0.js" }
    );

    head.ready("jshint", function () {               
        ok(!!JSHINT, "Label: ready('jshint')");
        QUnit.step(1, "step1 jshint");
        
        start();
    });
    
    head.ready("jquery", function () {
        ok(!!jQuery, "Label: ready('jquery')");
        QUnit.step(2, "step2 jquery");
        
        start();
    });
    
    head.ready("knockout", function () {
        ok(!!ko, "Label: ready('knockout')");
        QUnit.step(3, "step3 knockout");
        
        start();
    });       
});

asyncTest('async option', function () {
    expect(12);

    head
    .js(
        {spin       : 'http://fgnass.github.com/spin.js/dist/spin.min.js',          async: true},
        {stapes     : 'http://hay.github.com/stapes/stapes.min.js'},
        {notificon  : 'https://raw.github.com/makeable/Notificon/master/notificon.js'},
        {tinyDOM    : 'https://raw.github.com/ctult/TinyDOM/master/tinyDOM.min.js', async: true},
        {underscore : 'http://underscorejs.org/underscore-min.js',                  async: true},
        {sly        : 'https://raw.github.com/digitarald/sly/master/Sly.js'},

        function(){
            ok(!!Spinner,   "Callback: Spinner");
            ok(!!Stapes,    "Callback: Stapes");
            ok(!!Notificon, "Callback: Notificon");
            ok(!!tinyDOM,   "Callback: tinyDOM");
            ok(!!_,         "Callback: _");
            ok(!!Sly,       "Callback: Sly");

            start();
        }
    )

    .ready(['spin', 'underscore', 'tinyDOM'], function() {
        ok(!!Spinner, "Label: ready('spin')");
        ok(!!_,       "Label: ready('underscore')");
        ok(!!tinyDOM, "Label: ready('tinyDOM')");
    })

    .ready('stapes', function() {
        QUnit.step(1, "step1 stapes");
    })

    .ready('notificon', function() {
        QUnit.step(2, "step2 notificon");
    })

    .ready('sly', function() {
        QUnit.step(3, "step3 sly");
    })
    ;

});

// INFO: will make had fail (and nothing else continues!) if file not exists
asyncTest("css (load)", function () {
    expect(1);

    head.ready("test.css", function () {
        var result = getStyle(document.getElementById("browserscope"), "display");
        ok(result === "block", "Filename: ready('test.css')");

        start();
    });

    head.js("assets/test.css");
});