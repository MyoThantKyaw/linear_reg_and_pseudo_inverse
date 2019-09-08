// HTML 
// <div id="calculator" style="width: 700px; height: 400px;"></div>
//

var point_count = 0;

var elt = document.getElementById('calculator');
var calculator = Desmos.Calculator(elt, { expressions: false, settingsMenu: false, showGrid : false, xAxisStep : 2, yAxisStep : 2  });

calculator.updateSettings({ xAxisArrowMode: Desmos.AxisArrowModes.BOTH , yAxisArrowMode: Desmos.AxisArrowModes.BOTH });

//calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
calculator.setExpression({ id: 'graph2', latex: '(3,3)', style: 'CROSS', showLabel: true, dragMode: "XY" });

calculator.setExpression({ id: 'a-slider', latex: 'a=2'});
var a = calculator.HelperExpression({ latex: 'a' });

calculator.setExpression({ id: 'a-slider1', latex: 'b=2'});
var b = calculator.HelperExpression({ latex: 'b' });

calculator.setExpression({ id: 'a-aa', latex: 'f=(1,2)', style: 'CROSS', showLabel: true, dragMode: "XY" });
var g = calculator.HelperExpression({ latex: 'f=(,)' });

calculator.setExpression({ id: 'list', latex: 'L=[1, 2, 3]' });
var L = calculator.HelperExpression({ latex: 'L' });

var calculatorRect = elt.getBoundingClientRect();
document.addEventListener('click', addNewPoint);


L.observe('listValue', function () {
    console.log(L.listValue);
});

a.observe('numericValue', function () {
    console.log(a.numericValue);
});

g.observe('listValue', function () {
    console.log(g.listValue);
});

function getExp() 
{
    calculator.getExpressions().forEach(element => {
        console.log(element);
    });
}

function getPoints()
{
    var points = [];
    calculator.getExpressions().forEach(element => {
        if (element.id.substring(0, 2) == 'pt')
        {
            var mid_str = element.latex.substring(1, element.latex.length - 1);
            var point = JSON.parse("[" + mid_str + "]");
            points.push(point);
        }
    });
    return points;
}

// Click event handler, adding new point
function addNewPoint(evt)
{
    console.log("here..")
    if(cntrlIsPressed)
    {
        var coor = calculator.pixelsToMath({
            x: evt.clientX - calculatorRect.left,
            y: evt.clientY - calculatorRect.top
        });
    
        calculator.setExpression({id : "pt" + point_count.toString(), latex: '(' + coor['x'] + ',' + coor['y'] + ')', dragMode: "XY" });
        point_count++;
    
    }
}


// Ctrl press event handling..

$(document).keydown(function(event){
    console.log("Key down")
    if(event.which=="17")
        cntrlIsPressed = true;
});

$(document).keyup(function(){
    cntrlIsPressed = false;
});

var cntrlIsPressed = false;
