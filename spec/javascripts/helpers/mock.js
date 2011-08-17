function mock() {
  var mock = {};

  for (i in arguments) {
    var method_name = arguments[i];
    mock[method_name] = jasmine.createSpy(method_name);
  }

  return mock;
}
