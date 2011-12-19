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
    return !(date1.getYear() == date2.getYear() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getDate() == date2.getDate());
}

Raphael.fn.commit = function (x, y, radius, author) {
  var color = str_to_color(author),
      radius_growth = radius * 1.2,
      circle = this.circle(x, y, radius).animate({r: radius, fill: color, opacity: 0.5}, 1000, "bounce"),
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

Raphael.fn.xy_axis = function(commits) {
  var axis_color = "#bbd1d9",
      grid_color = "#d8e4eb",
      thickness = 10,
      width = this.width,
      height = this.height,
      border = thickness * 4,
      // Refactor these variables below
      x = 10,
      y = 10,
      paper = this,
      num_y_values = 11,
      y_offset = height / num_y_values,
      y_min = y + y_offset/2;

  x += border;
  width -= border * 1.5;
  height -= border * 1.5;

  drawAxes(this);
  drawYLabels(this);
  plotCommits(this);

  function drawAxes(paper) {
      paper.rect(x, y, thickness, height).attr({fill: axis_color, stroke: "none"});
      paper.rect(x, y + height, width, thickness).attr({fill: axis_color, stroke: "none"});
  }

  function drawYLabels(paper) {
      var y_values = ["100%", "", "80%", "", "60%", "", "40%", "", "20%", "", "0%"],
          num_y_values = y_values.length,
          y_offset = height / num_y_values,
          y_min = y + y_offset/2,
          y_max = y - y_offset/2 + height,
          actual_y = y_min;

      for (var i = 0; i < y_values.length; i++) {
          paper.rect(x - thickness, actual_y, width + thickness * 2, 0.5)
               .attr({fill: grid_color, stroke: "none"});
          paper.text(x - thickness * 3, actual_y, y_values[i]);
          actual_y += y_offset;
      }
  }

  function plotCommits(paper) {
      var num_commits = Object.keys(commits).length,
          last_date = null;

      for (hash in commits) {
          var commit = commits[hash],
              commit_y = y_min + (height - y_offset) * (-commit.ratio + 1),
              date = new Date(commit.date);

          paper.commit(get_commit_x(date), commit_y, commit.size, commit.author);

          var createLabelForNewDate = last_date == null || is_other_day(last_date, date); 

          if (createLabelForNewDate) {
              date.setHours(12);
              date.setMinutes(0);
              var commit_x = get_commit_x(date);
              paper.rect(commit_x, y, 0.5, height + thickness * 2).attr({fill: grid_color, stroke: "none"});
              paper.text(commit_x, y + height + thickness * 3, format_date(date));

              last_date = date;
          }
      }
  }

  function get_commit_x(date) {
      var hashes = Object.keys(commits),
          first_commit = commits[hashes[0]],
          last_commit = commits[hashes[hashes.length - 1]],
          first_date = new Date(first_commit.date).getTime(),
          last_date = new Date(last_commit.date).getTime(),
          time = date.getTime(),
          offset = 50;

      return (time - first_date) * ((width - offset * 2) / (last_date - first_date)) + (x + offset);
  }
};

window.onload = function () {
  var paper = Raphael("canvas", 800, 600);
  paper.rect(0, 0, paper.width, paper.height).attr({fill: "#fff", stroke: "none"});

  $.getJSON('/commits', function(paper) {
      return function(commits) {
        paper.xy_axis(commits);
      }
  }(paper));
};

