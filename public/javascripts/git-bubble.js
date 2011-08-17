window.onload = function () {
  var canvas = Raphael("canvas", 800, 600),
      plane = newPlane(canvas);

  plane.draw();
};
