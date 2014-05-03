describe("BCValidations", function() {
  var nameRequired;
  beforeEach(function() {
    nameRequired = new Validation("name", "Name cannot be blank", function(value) {
      return value !== void 0 && String(value).length > 0;
    });
  });

  it("validates a particular field", function() {
    expect(nameRequired.field).toEqual("name");
  });

  it("contains a validation message", function() {
    expect(nameRequired.message).toEqual("Name cannot be blank");
  });

  it("validates values affirmatively", function() {
    expect(nameRequired.validate("hello")).toBe(true);
  });

  it("validates values negatively", function() {
    expect(nameRequired.validate("")).toBe(false);
  });
});
