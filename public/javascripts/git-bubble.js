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

function format_date(date) {
  return date.getDate() + "/" + (date.getMonth() + 1);
}

function is_other_day(date1, date2) {
  var day = 24 * 60 * 60 * 1000;

  return (date2 - date1) > day;
}

Raphael.fn.commit = function (x, y, radius, author) {
  var color = str_to_color(author),
      radius_growth = radius * 1.5,
      circle = this.circle(x, y, radius).animate({r: radius, fill: color, "opacity": 0.5, stroke: "none"}, 1000, "bounce"),
      author_text = this.text(x, y - 10 - radius_growth, author).hide(),
      commit_size = this.text(x, y, radius).hide()
      elements = [circle, author_text, commit_size];

  var onmouseover = function () {
    circle.animate({r: radius_growth}, 100);
    author_text.show();
    commit_size.show();
  };

  var onmouseout = function () {
    circle.animate({r: radius}, 100);
    author_text.hide();
    commit_size.hide();
  };

  for (var i = 0; i < elements.length; i++) {
    elements[i].node.onmouseover = onmouseover;
    elements[i].node.onmouseout = onmouseout;
  }
};

Raphael.fn.xy_axis = function (x, y, width, height, commits) {
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
  var y_values = ["100%", "", "80%", "", "60%", "", "40%", "", "20%", "", "0%"],
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
  var num_commits = Object.keys(commits).length,
      get_commit_x = function (date) {
        var hashes = Object.keys(commits),
            first_commit = commits[hashes[0]],
            last_commit = commits[hashes[hashes.length - 1]],
            first_date = new Date(first_commit.date).getTime(),
            last_date = new Date(last_commit.date).getTime();

        return (function (date) {
          var time = date.getTime(),
              offset = 50;

          return (time - first_date) * ((width - offset * 2) / (last_date - first_date)) + (x + offset);
        });
      }();

  var last_date = null;
  for (hash in commits) {
    var commit = commits[hash],
        commit_y = y_min + (height - y_offset) * (-commit.ratio + 1),
        date = new Date(commit.date);

    this.commit(get_commit_x(date), commit_y, commit.size, commit.author);

    if (is_other_day(last_date, date)) {
      date.setHours(12);
      date.setMinutes(0);
      var commit_x = get_commit_x(date)
      this.rect(commit_x, y, 0.5, height + thickness * 2).attr({fill: grid_color, stroke: "none"});
      this.text(commit_x, y + height + thickness * 3, format_date(date));

      last_date = date;
    }
  }
};

window.onload = function () {
  var paper = Raphael("canvas", 800, 600);
  var commits = {
    "hash-1": {date: "August 8, 2011 00:00:00", ratio: 0.6, size: 20, author: "vitorbaptista"},
    "hash-2": {date: "August 8, 2011 11:33:00", ratio: 0, size: 10, author: "bozo"},
    "hash-3": {date: "August 8, 2011 21:02:00", ratio: 1, size: 10, author: "God"},
    "hash-4": {date: "August 9, 2011 14:54:00", ratio: 0.3, size: 45, author: "monkey"},
    "hash-5": {date: "August 9, 2011 19:00:00", ratio: 0.5, size: 30, author: "God"},
    "hash-6": {date: "August 10, 2011 03:00:00", ratio: 0.2, size: 32, author: "monkey"},
    "hash-7": {date: "August 10, 2011 07:30:00", ratio: 0.4, size: 50, author: "God"},
    "hash-8": {date: "August 10, 2011 23:53:00", ratio: 0.8, size: 42, author: "monkey"},
  };

  paper.rect(0, 0, paper.width, paper.height, 10).attr({fill: "#fff", stroke: "none"});
  paper.xy_axis(10, 10, 800, 600, commits);
};
