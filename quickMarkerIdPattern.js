/*
  Quickie to generate Marker IDs on canvas without needing the original images nor knowing the hamming code ;p

  StephaneAG - 2017
*/

(function(){
  // the base patterns
  var markerIdPatternBaseLocsAndBits = [
    //row 1
    {x: 0, y: 0, bit: 0}, // bit: 0
    {x: 1, y: 0, bit: 0}, // bit: 0
    {x: 2, y: 0, bit: 0}, // bit: 0
    {x: 3, y: 0, bit: 0}, // bit: 0
    {x: 4, y: 0, bit: 0}, // bit: 0
    {x: 5, y: 0, bit: 0}, // bit: 0
    {x: 6, y: 0, bit: 0}, // bit: 0
    //row 2
    {x: 0, y: 1, bit: 0}, // bit: 0
    {x: 1, y: 1, bit: 1}, // bit: 1
    {x: 2, y: 1, bit: 1}, // bit: 1
    {x: 3, y: 1, bit: 1}, // bit: 1
    {x: 4, y: 1, bit: 1}, // bit: 1
    {x: 5, y: 1, bit: 1}, // bit: 1
    {x: 6, y: 1, bit: 0}, // bit: 0
    //row 3
    {x: 0, y: 2, bit: 0}, // bit: 0
    {x: 1, y: 2, bit: 0}, // bit: 0
      // ..
    {x: 6, y: 2, bit: 0}, // bit: 0
    //row 4
    {x: 0, y: 3, bit: 0}, // bit: 0
    {x: 1, y: 3, bit: 1}, // bit: 1
      // ..
    {x: 6, y: 3, bit: 0}, // bit: 0
    //row 5
    {x: 0, y: 4, bit: 0}, // bit: 0
    {x: 1, y: 4, bit: 0}, // bit: 0
      // ..
    {x: 6, y: 4, bit: 0}, // bit: 0
    //row 6
    {x: 0, y: 5, bit: 0}, // bit: 0
    {x: 1, y: 5, bit: 1}, // bit: 1
    {x: 2, y: 5, bit: 0}, // bit: 0
    {x: 3, y: 5, bit: 1}, // bit: 1
    {x: 4, y: 5, bit: 0}, // bit: 0
    {x: 5, y: 5, bit: 1}, // bit: 1
    {x: 6, y: 5, bit: 0}, // bit: 0
    //row 7
    {x: 0, y: 6, bit: 0}, // bit: 0
    {x: 1, y: 6, bit: 0}, // bit: 0
    {x: 2, y: 6, bit: 0}, // bit: 0
    {x: 3, y: 6, bit: 0}, // bit: 0
    {x: 4, y: 6, bit: 0}, // bit: 0
    {x: 5, y: 6, bit: 0}, // bit: 0
    {x: 6, y: 6, bit: 0}, // bit: 0
  ];

  var markerIdPatternLocs = [
    { x: 2, y: 2}, // 1
    { x: 3, y: 2}, // 2
    { x: 4, y: 2}, // 3
    { x: 5, y: 2}, // 4
    { x: 2, y: 3}, // 5
    { x: 3, y: 3}, // 6
    { x: 4, y: 3}, // 7
    { x: 5, y: 3}, // 8
    { x: 2, y: 4}, // 9
    { x: 3, y: 4}, // 10
    { x: 4, y: 4}, // 11
    { x: 5, y: 4}, // 12
  ];

  var markerIdPatternLocWidth = 300 / 7;

  // the "generated" ( extracted from images ) Marker ID Patterns
  var jsonMarkerIdPatterns = "[[1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,0,1,1,1,1],[0,0,1,0,1,1,1,0,1,1,1,1],[1,1,0,1,1,1,1,1,1,1,1,0],[0,1,0,1,1,1,1,0,1,1,1,0],[1,0,0,0,1,1,1,0,1,1,1,0],[0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,0,1,1,0,1,1,1,1,1],[0,1,1,1,1,1,0,0,1,1,1,1],[1,0,1,0,1,1,0,0,1,1,1,1],[0,0,1,1,1,1,0,1,1,1,1,0],[1,1,0,1,1,1,0,0,1,1,1,0],[0,1,0,0,1,1,0,0,1,1,1,0],[1,0,0,1,1,1,0,1,1,1,1,1],[0,0,0,0,1,1,0,1,1,1,1,1],[1,1,1,1,1,1,1,0,1,1,0,1],[0,1,1,0,1,1,1,0,1,1,0,1],[1,0,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,1,1,0,0],[1,1,0,0,1,1,1,0,1,1,0,0],[0,1,0,1,1,1,1,1,1,1,0,1],[1,0,0,0,1,1,1,1,1,1,0,1],[0,0,0,1,1,1,1,0,1,1,0,1],[1,1,1,0,1,1,0,0,1,1,0,1],[0,1,1,1,1,1,0,1,1,1,0,0],[1,0,1,1,1,1,0,0,1,1,0,0],[0,0,1,0,1,1,0,0,1,1,0,0],[1,1,0,1,1,1,0,1,1,1,0,1],[0,1,0,0,1,1,0,1,1,1,0,1],[1,0,0,1,1,1,0,0,1,1,0,1],[0,0,0,0,1,1,0,0,1,1,0,1],[1,1,1,1,1,1,1,1,1,0,1,0],[0,1,1,1,1,1,1,0,1,0,1,0],[1,0,1,0,1,1,1,0,1,0,1,0],[0,0,1,1,1,1,1,1,1,0,1,1],[1,1,0,0,1,1,1,1,1,0,1,1],[0,1,0,1,1,1,1,0,1,0,1,1],[1,0,0,0,1,1,1,0,1,0,1,1],[0,0,0,1,1,1,1,1,1,0,1,0],[1,1,1,1,1,1,0,0,1,0,1,0],[0,1,1,0,1,1,0,0,1,0,1,0],[1,0,1,1,1,1,0,1,1,0,1,1],[0,0,1,0,1,1,0,1,1,0,1,1],[1,1,0,1,1,1,0,0,1,0,1,1],[0,1,0,0,1,1,0,0,1,0,1,1],[1,0,0,1,1,1,0,1,1,0,1,0],[0,0,0,1,1,1,0,0,1,0,1,0],[1,1,1,0,1,1,1,0,1,0,0,0],[0,1,1,1,1,1,1,1,1,0,0,1],[1,0,1,0,1,1,1,1,1,0,0,1],[0,0,1,1,1,1,1,0,1,0,0,1],[1,1,0,0,1,1,1,0,1,0,0,1],[0,1,0,1,1,1,1,1,1,0,0,0],[1,0,0,1,1,1,1,0,1,0,0,0],[0,0,0,0,1,1,1,0,1,0,0,0],[1,1,1,1,1,1,0,1,1,0,0,1],[0,1,1,0,1,1,0,1,1,0,0,1],[1,0,1,1,1,1,0,0,1,0,0,1],[0,0,1,0,1,1,0,0,1,0,0,1],[1,1,0,1,1,1,0,1,1,0,0,0],[0,1,0,1,1,1,0,0,1,0,0,0],[1,0,0,0,1,1,0,0,1,0,0,0],[0,0,0,1,1,1,0,1,1,0,0,1],[1,1,1,0,1,1,1,1,0,1,1,1],[0,1,1,1,1,1,1,0,0,1,1,1],[1,0,1,0,1,1,1,0,0,1,1,1],[0,0,1,1,1,1,1,1,0,1,1,0],[1,1,0,1,1,1,1,0,0,1,1,0],[0,1,0,0,1,1,1,0,0,1,1,0],[1,0,0,1,1,1,1,1,0,1,1,1],[0,0,0,0,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,0,0,0,1,1,1],[0,1,1,0,1,1,0,0,0,1,1,1],[1,0,1,1,1,1,0,1,0,1,1,0],[0,0,1,1,1,1,0,0,0,1,1,0],[1,1,0,0,1,1,0,0,0,1,1,0],[0,1,0,1,1,1,0,1,0,1,1,1],[1,0,0,0,1,1,0,1,0,1,1,1],[0,0,0,1,1,1,0,0,0,1,1,1],[1,1,1,0,1,1,1,0,0,1,0,1],[0,1,1,1,1,1,1,1,0,1,0,0],[1,0,1,1,1,1,1,0,0,1,0,0],[0,0,1,0,1,1,1,0,0,1,0,0],[1,1,0,1,1,1,1,1,0,1,0,1],[0,1,0,0,1,1,1,1,0,1,0,1],[1,0,0,1,1,1,1,0,0,1,0,1],[0,0,0,0,1,1,1,0,0,1,0,1],[1,1,1,1,1,1,0,1,0,1,0,0],[0,1,1,1,1,1,0,0,0,1,0,0],[1,0,1,0,1,1,0,0,0,1,0,0],[0,0,1,1,1,1,0,1,0,1,0,1],[1,1,0,0,1,1,0,1,0,1,0,1],[0,1,0,1,1,1,0,0,0,1,0,1],[1,0,0,0,1,1,0,0,0,1,0,1],[0,0,0,1,1,1,0,1,0,1,0,0],[1,1,1,1,1,1,1,0,0,0,1,0],[0,1,1,0,1,1,1,0,0,0,1,0],[1,0,1,1,1,1,1,1,0,0,1,1],[0,0,1,0,1,1,1,1,0,0,1,1]]";
  var markerIdPatterns = JSON.parse(jsonMarkerIdPatterns);


  // helper
  var drawBit = function(ctx, pixelBit, x, y, width, height){
    if( pixelBit === 0 ){

      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.rect(x, y, width, height);// draw indicator on capture location
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

    } else {
      /*
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'transparent';
      ctx.beginPath();
      ctx.rect(x, y, width, height);// draw indicator on capture location
      ctx.fill();
      //ctx.stroke();
      ctx.closePath();
      */
    }
  }

  // dynamic marker id pattern "generator" ^^
  var generateMarkerIdPattern = function(ctx, idx){
    // fill with white as background color
    ctx.fillStyle = 'white';
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();

    // add the base bits
    markerIdPatternBaseLocsAndBits.forEach(function(patternLocAndBits, index){
      var bitLocX = markerIdPatternLocWidth * patternLocAndBits.x;
      var bitLocY = markerIdPatternLocWidth * patternLocAndBits.y;
      var pixelBit = patternLocAndBits.bit;
      drawBit(ctx, pixelBit, bitLocX-0.5, bitLocY-0.5, markerIdPatternLocWidth, markerIdPatternLocWidth);
    });

    // add the id-specific bits
    var patternLocBits = markerIdPatterns[idx];
    markerIdPatternLocs.forEach(function(patternLoc, index){
      var bitLocX = markerIdPatternLocWidth * patternLoc.x;
      var bitLocY = markerIdPatternLocWidth * patternLoc.y;
      var pixelBit = patternLocBits[index];
      drawBit(ctx, pixelBit, bitLocX-0.5, bitLocY-0.5, markerIdPatternLocWidth, markerIdPatternLocWidth);
    });

    console.log('markerIdPattern generated for id N°', idx);
  };


  window.quickMarkerIdPattern = function(ctx, idx){
    //markerIdPatternLocWidth = ctx.canvas / 7;
    generateMarkerIdPattern(ctx, idx);
  }
})();
