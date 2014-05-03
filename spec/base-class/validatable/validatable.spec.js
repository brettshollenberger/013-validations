describe("BCValidatable", function() {

  describe("Constructing individual validations", function() {
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

  describe("Constructing a set of validations for a model", function() {
    var person;
    beforeEach(function() {
      Person.validates({
        name: {
          required: true,
          length: {
            min: 5,
            max: 20
          }
        },
        age: {
          required: {message: "is required"},
          legal: {validator: function(age) { return Number(age) >= 21; },
                  message: "must be at least 21"}
        }
      });

      person = Person.new({
        name: "Troy Barnes",
        age: 25
      });
    });

    it("adds validations with no options passed", function() {
      expect(Person.validations.name[0].field).toEqual("name");
    });

    it("adds validations with options passed", function() {
      expect(Person.validations.name[1].field).toEqual("name");
    });

    it("adds custom error messages", function() {
      expect(Person.validations.age[0].message).toEqual("is required");
    });

    it("adds custom validations", function() {
      person.age = 21;
      expect(person.validate("age")).toEqual(true);
      person.age = 20;
      expect(person.validate("age")).toEqual(false);
    });

    it("describes whether an instance is valid in general", function() {
      person.age = 20;
      expect(person.validate()).toBe(false);
      person.age = 21;
      expect(person.validate()).toBe(true);
    });

    it("throws an error if a validation is added with no error message", function() {
      var validationsDescription = {
        name: {
          weird: {validator: function(name) { return true; }}
        }
      }

      expect(function() { new Validatable(validationsDescription); }).toThrow();
    });

    it("adds errors when invalid", function() {
      person.name = "";
      person.age  = 20;
      person.validate();
      expect(person.$errors.age).toContain("must be at least 21");
      expect(person.$errors.name).toContain("cannot be blank.");
    });

    it("does not add errors when valid", function() {
      person.validate();
      expect(person.$errors.count).toEqual(0);
    });

    it("removes previously invalid fields", function() {
      person.name = "";
      person.validate();
      expect(person.$errors.name).toContain("cannot be blank.");
      person.name = "Troy";
      person.validate();
      expect(person.$errors.count).toEqual(0);
    });

    it("sets $valid as a property of the instance", function() {
      expect(person.$valid).toBe(true);
    });

    it("sets $invalid as a property of the instance", function() {
      expect(person.$invalid).toBe(false);
      person.name = "";
      expect(person.$invalid).toBe(true);
    });
  });
});
