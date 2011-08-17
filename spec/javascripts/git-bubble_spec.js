describe("git-bubble", function () {
  var paper = mock("circle");

  it("formats the date correctly", function () {
    var date = new Date("August 8, 2011");

    expect(format_date(date)).toMatch("8/8");
  });

  it("mocks the circle", function () {
    paper.circle(10, 10, 10);
    expect(paper.circle).toHaveBeenCalledWith(10, 10, 10);
  });
});
