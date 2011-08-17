describe("plane", function () {
  var width = height = 500,
      canvas = mock("rect", "attr");

  canvas.rect.andReturn(canvas);
  canvas.height = 100;
  canvas.width = 500;

  beforeEach(function () {
    canvas.reset();
    plane = newPlane(canvas);
  });

  it("holds the canvas it was initialized with", function () {
    expect(plane.canvas).toEqual(canvas);
  });

  describe("axes", function () {
    it("has x and y axes", function () {
      expect(plane.x).toBeDefined();
      expect(plane.y).toBeDefined();
    });

    it("can define the labels for each axis", function () {
      var aug_17 = new Date("Aug 17 2011").getTime(),
          aug_18 = new Date("Aug 18 2011").getTime();

      var labelsX = { aug_17: "Aug 17", aug_18: "Aug 18" },
          labelsY = { 0: "0%", 50: "50%", 100: "100%" };

      plane.x.labels = labelsX;
      plane.y.labels = labelsY;

      expect(plane.x.labels).toEqual(labelsX);
      expect(plane.y.labels).toEqual(labelsY);
    });

    it("keeps track of each axis range min and max", function () {
      var labelsX = { 8: "", 100: "", 0: "" },
          labelsY = { 9: "", 800: "", 2: "" };

      plane.x.labels = labelsX;
      plane.y.labels = labelsY;

      expect(plane.x.min()).toEqual(0);
      expect(plane.x.max()).toEqual(100);
      expect(plane.y.min()).toEqual(2);
      expect(plane.y.max()).toEqual(800);
    });
  });

  describe("draw", function () {
    it("draws the x and y axes", function () {
      var axis_color = "#bbd1d9",
          thickness = 10,
          border = thickness * 4,
          x = y = border,
          width = canvas.width - x,
          height = canvas.height - y;

      plane.draw();

      expect(canvas.rect).toHaveBeenCalledWith(x, y, thickness, height - border);
      expect(canvas.attr).toHaveBeenCalledWith({fill: axis_color, stroke: "none"});

      expect(canvas.rect).toHaveBeenCalledWith(x, height, width - border, thickness);
      expect(canvas.attr).toHaveBeenCalledWith({fill: axis_color, stroke: "none"});
    });
  });
});
