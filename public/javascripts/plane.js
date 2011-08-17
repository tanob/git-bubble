function min_max(labels, func) {
  var label_keys_to_int = Object.keys(labels).map(function (x) {
    return parseInt(x, 10);
  });

  return func.apply(Math, label_keys_to_int);
}

function min(arr) {
  return min_max(arr, Math.min);
}

function max(arr) {
  return min_max(arr, Math.max);
}

var newPlane = function (canvas) {
  function draw(plane) {
    var axis_color = "#bbd1d9",
        thickness = 10,
        border = thickness * 4,
        canvas = plane.canvas;

    var x = y = border,
        width = canvas.width - x,
        height = canvas.height - y;

    canvas.rect(x, y, thickness, height - border).attr({fill: axis_color, stroke: "none"});
    canvas.rect(x, height, width - border, thickness).attr({fill: axis_color, stroke: "none"});
  };

  var plane = {
    canvas: canvas,
    draw: function () { draw(plane); },
    x: {
          min: function () { return min(plane.x.labels); },
          max: function () { return max(plane.x.labels); },
    },
    y: {
          min: function () { return min(plane.y.labels); },
          max: function () { return max(plane.y.labels); },
    },
  };

  return plane;
};
