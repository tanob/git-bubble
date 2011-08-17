function mock() {
  var mock = {};

  for (i in arguments) {
    var method_name = arguments[i];
    mock[method_name] = jasmine.createSpy(method_name);
  }

  function reset() {
    var methods = Object.keys(this);

    for (i in methods) {
      var method = this[methods[i]];

      if (method.isSpy) {
        method.reset();
      }
    }
  }

  mock.reset = reset;

  return mock;
}
