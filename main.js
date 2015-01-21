var canvas, context;


document.addEventListener("DOMContentLoaded", function(){

  canvas = document.querySelector("#myCanvas");
  context = canvas.getContext("2d");
      
    addButtonListeners();
    showPie();

    });


function setDefaultStyles(){
  
  context.strokeStyle = "#333";	
  context.lineWidth = 3;
  context.font = "bold 10pt Verdana";
  context.fillStyle = "#333";
  context.textAlign = "left";
}

function showPie(){ //pie graph

   
context.clearRect(0, 0, canvas.width, canvas.height);
    setDefaultStyles();
    
  var cx = canvas.width/2;
  var cy = canvas.height/2;
  var radius = 100;
  var currentAngle = 0;
    var total = 0;
    var values = null; // added this
           
    $.getJSON( "cheese.json", function( data ) {
    
    values = data;     

for(var i=0; i<values.segments.length; i++){
  total += values.segments[i].value;
}
        
        
    
    for(var i=0; i<values.segments.length; i++){
    var pct = values.segments[i].value/total;
        
        //check for biggest and smallest segments
        if (values.segments[i].value > 40) {
            radius = 90;
        }
        else if (values.segments[i].value < 5) {
            radius = 110;
        }
        else {
            radius = 100;
        }
    
    var colour = values.segments[i].color;
    var endAngle = currentAngle + (pct * (Math.PI * 2));
    
    context.moveTo(cx, cy);
    context.beginPath();
    context.fillStyle = colour;
    context.arc(cx, cy, radius, currentAngle, endAngle, false);  
    context.lineTo(cx, cy);
    context.fill();
    
    context.save();
    context.translate(cx, cy);
    context.strokeStyle = "#0CF";
    context.lineWidth = 1;
    context.beginPath();
    
    var midAngle = (currentAngle + endAngle)/2;
    context.moveTo(0,0);
    
    var dx = Math.cos(midAngle) * (0.8 * radius);
    var dy = Math.sin(midAngle) * (0.8 * radius);
    context.moveTo(dx, dy);
    
    var dx = Math.cos(midAngle) * (radius + 30); 
    var dy = Math.sin(midAngle) * (radius + 30);
    context.lineTo(dx, dy);
    context.stroke();
    
    context.font = "bold 10pt Arial";
    context.fillText(values.segments[i].label, dx - 25 , dy);
        

    context.restore();
  
    currentAngle = endAngle;
  }
    
    })
    
        
};


function showBars(){ //bar graph
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  setDefaultStyles();
    var total = 0;

    $.getJSON( "cheese.json", function( data ) {
    
    values = data;
    
    for(var i=0; i<values.segments.length; i++){
  total += values.segments[i].value;
}    
    
  var graphHeight = 350;
  var offsetX = 20;	
  var barWidth = 30;	
  var spaceBetweenPoints = 20; 

  var x = offsetX + 20;	
        
  context.beginPath();
  for(var i=0; i<values.segments.length; i++){
      var colour = values.segments[i].color;
    var pct = values.segments[i].value / total;
    var barHeight = (graphHeight * pct + 50);
    context.fillStyle = colour; 
      context.fillRect(x, graphHeight-1, barWidth, -1 * barHeight); //changed to fillRect
    var lbl = values.segments[i].label;
    context.fillText(lbl, x , graphHeight - barHeight - 30-1);
    x = x + barWidth + spaceBetweenPoints;	
   
    
     
      context.stroke();	
  context.fill(); 	
  }
         
  context.strokeStyle = "#000000";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(offsetX, canvas.height-graphHeight);
  context.lineTo(offsetX, graphHeight);
  context.lineTo(canvas.width-offsetX, graphHeight);
  context.stroke(); 
    })
}



function addButtonListeners(){ //for buttons
  document.querySelector("#btnPie").addEventListener("click", showPie);
  document.querySelector("#btnCustom").addEventListener("click", showBars);
}


     