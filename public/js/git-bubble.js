function str_to_color(str) {
  var total = 0,
      hex,
      leading_zeros = '000000';
  for (var i = 0; i < str.length; i++) {
    total =+ Math.pow(str.charCodeAt(i), 4);
  }

  hex = leading_zeros + total.toString(16);
  return "#" + hex.slice(-6);
}

Raphael.fn.commit = function (x, y, radius, author) {
  var color = str_to_color(author),
      circle = this.circle(x, y, 10).animate({r: radius, fill: color, "opacity": 0.5, stroke: "none"}, 1000, "bounce"),
      text = this.text(x, y - radius - 10, author).hide();
  circle.node.onmouseover = function () {
    circle.animate({r: radius * 1.5}, 100);
    text.show();
  };

  circle.node.onmouseout = function () {
    circle.animate({r: radius}, 100);
    text.hide();
  };
};

Raphael.fn.xy_axis = function (x, y, width, height, values) {
  var axis_color = "#bbd1d9",
      grid_color = "#d8e4eb",
      thickness = 10,
      border = thickness * 4;
      x += border;
      width -= border * 1.5;
      height -= border * 1.5;

  this.rect(x, y, thickness, height).attr({fill: axis_color, stroke: "none"});
  this.rect(x, y + height, width, thickness).attr({fill: axis_color, stroke: "none"});

  // Fills Y Axis
  var y_values = ["100%", "80%", "60%", "40%", "20%", "0%"],
      num_y_values = y_values.length,
      y_offset = height / num_y_values,
      y_min = y + y_offset/2,
      y_max = y - y_offset/2 + height,
      actual_y = y_min;
  for (var i = 0; i < y_values.length; i++) {
    this.rect(x - thickness, actual_y, width + thickness * 2, 0.5).attr({fill: grid_color, stroke: "none"});
    this.text(x - thickness * 3, actual_y, y_values[i]);
    actual_y += y_offset;
  }

  // Fills X Axis
  var num_x_values = Object.keys(values).length;
  var x_offset = (width - thickness) / (num_x_values + 1),
      actual_x = x + thickness + x_offset;

  for (key in values) {
    this.rect(actual_x, y, 0.5, height + thickness * 2).attr({fill: grid_color, stroke: "none"});
    this.text(actual_x, y + height + thickness * 3, key);
    for (i in values[key]) {
      var commit = values[key][i],
          commit_y = y_min + (height - y_offset) * (-commit.ratio + 1);

      this.commit(actual_x, commit_y, commit.size, commit.author);
    }
    actual_x += x_offset
  }

};

window.onload = function () {
  var paper = Raphael("canvas", 800, 600);
  var values = {
    "01/08": [{ratio: 0.6, size: 10, author: "vitorbaptista"}, {ratio: 0, size: 10, author: "bozo"}],
    "02/08": [{ratio: 1, size: 10, author: "God"}, {ratio: 0.3, size: 10, author: "monkey"}],
    "03/08": [{ratio: 0.5, size: 10, author: "God"}, {ratio: 0.2, size: 10, author: "monkey"}],
    "04/08": [{ratio: 0.4, size: 10, author: "God"}, {ratio: 0.8, size: 10, author: "monkey"}],
  };

  paper.rect(0, 0, paper.width, paper.height, 10).attr({fill: "#fff", stroke: "none"});
  paper.xy_axis(10, 10, 800, 600, values);
};
