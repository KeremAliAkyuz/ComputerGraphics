var gl;
var theta;
var thetaLoc;
var isDirClockwise = false;
var delay = 50;
var isRunning=true;
var color;

function buttonPressedFunc(){
	isDirClockwise=!isDirClockwise;
}
function startPressedFunc(){
  isRunning=true;
}
function stopPressedFunc(){
	isRunning=false;
}

window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	// Only continue if WebGL is available and working
	if (!gl) {
	alert("Unable to initialize WebGL. Your browser or machine may not support it.");
	return;
	}

	var program = initShaders(gl, "vertex-shader", "fragment-shader")
	gl.useProgram( program );

	var myButton = document.getElementById("DirectionButton");
	myButton.addEventListener("click", buttonPressedFunc);

	var startButton = document.getElementById("StartRotationButton");
	startButton.addEventListener("click",startPressedFunc);

	var stopButton = document.getElementById("StopRotationButton");
	stopButton.addEventListener("click",stopPressedFunc);

	document.addEventListener('keydown', (event) => {

	  var code = event.code;
		if(code==="NumpadAdd"&&delay>=0){
			delay-=10;
		}
		if(code==="NumpadSubtract"&&delay<=100){
			delay+=10;
		}
	  // Alert the key name and key code on keydown
    console.log(delay);
	}, false);


	var slider = document.getElementById("myRange");
  slider.addEventListener("click", function(){
		var x = document.getElementById("myRange").value;

		if(x==4){
				delay = 150;
		}
		if(x==3){
				delay = 100;
    }
		if(x==2){
			delay = 50;
		}
		if(x==1){
			delay = 25;
		}
		if(x==0){
			delay = 10;
		}
	})

	var vertices = [

	      //-----------K-----------------------
				vec2(-.6, 0),
				vec2(-.55, 0),
				vec2(-.2, -.6),

				vec2(-.2, -.6),
	      vec2(-.25, -.6),
				vec2(-.6, 0),

				vec2(-.6, 0),
				vec2(-.55, 0),
				vec2(-.2, .6),

				vec2(-.25, .6),
				vec2(-.6, 0),
				vec2(-.2, .6),

				vec2(-.6, -.6),
				vec2(-.55, -.6),
				vec2(-.55, .6),

				vec2(-.6, -.6),
				vec2(-.55, .6),
	      vec2(-.6, .6),
				//-------------A----------------
				vec2(.1, -.6),
				vec2(.15, -.6),
	      vec2(.5, .6),

	      vec2(.5, .6),
				vec2(.45, .6),
				vec2(.1, -.6),

				vec2(.5, .6),
				vec2(.45, .6),
	      vec2(.75, -0.6),

				vec2(.75, -0.6),
	      vec2(.8, -0.6),
				vec2(.5, .6),

				vec2(.23, -.23),
	      vec2(.23, -.18),
				vec2(.67, -.23),

				vec2(.67, -.23),
	      vec2(.23, -.18),
				vec2(.67, -.18)


		];


	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );





	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation(program, "theta");

	theta = 0;
	gl.uniform1f(thetaLoc, theta);
//--------------------------------------------------------------------------
	var positionLocation = gl.getAttribLocation (program, "a_position");
	gl.vertexAttribPointer( positionLocation, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( positionLocation );

  colorLoc = gl.getUniformLocation(program, "color");


	var m = document.getElementById("mymenu");
	m.addEventListener("click", function() {
	  {
			var x = document.getElementById("mymenu").value;

		 if(x==0){
			 gl.uniform4f (colorLoc,1.0,0.0,0.0,1.0);//red
		}
    if(x==1){
			 gl.uniform4f (colorLoc,0.0, 1.0, 0.0, 1.0);//green
		 }
    if(x==2){
			 gl.uniform4f (colorLoc, 0.0, 0.0, 1.0, 1.0);//blue
		 }

	 }});

	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	requestAnimFrame(render);
}

function render(){
	setTimeout(function() {
		// Clear the color buffer with specified clear color
		gl.clear(gl.COLOR_BUFFER_BIT);
		if(isRunning){
			theta += (isDirClockwise ? -0.1 : 0.1);}
		gl.uniform1f(thetaLoc, theta);
		gl.drawArrays(gl.TRIANGLES, 0, 36);
		render();
		}, delay);




}
