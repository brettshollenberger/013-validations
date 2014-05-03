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
    var validationsDescription, validatable, person;
    beforeEach(function() {
      person = {
        name: "Troy Barnes",
        age: 25
      }

      person.$errors = new Errors();

      validationsDescription = {
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
      }

      validatable = new Validatable(validationsDescription);
    });

    it("adds validations with no options passed", function() {
      expect(validatable.validations.name[0].field).toEqual("name");
    });

    it("adds validations with options passed", function() {
      expect(validatable.validations.name[1].field).toEqual("name");
    });

    it("adds custom error messages", function() {
      expect(validatable.validations.age[0].message).toEqual("is required");
    });

    it("adds custom validations", function() {
      expect(validatable.validations.age[1].validate(21)).toEqual(true);
      expect(validatable.validations.age[1].validate(20)).toEqual(false);
    });

    it("throws an error if a validation is added with no error message", function() {
      var validationsDescription = {
        name: {
          weird: {validator: function(name) { return true; }}
        }
      }

      expect(function() { new Validatable(validationsDescription); }).toThrow();
    });

    it("describes whether an instance is valid on a particular field", function() {
      person.age = 20;
      expect(validatable.validations.validate(person, "age")).toBe(false);
      person.age = 21;
      expect(validatable.validations.validate(person, "age")).toBe(true);
    });

    it("describes whether an instance is valid in general", function() {
      person.age = 20;
      expect(validatable.validations.validate(person)).toBe(false);
      person.age = 21;
      expect(validatable.validations.validate(person)).toBe(true);
    });

    it("adds errors when invalid", function() {
      person.name = "";
      person.age  = 20;
      validatable.validations.validate(person);
      expect(person.$errors.age).toContain("must be at least 21");
      expect(person.$errors.name).toContain("cannot be blank.");
    });

    it("does not add errors when valid", function() {
      validatable.validations.validate(person);
      expect(person.$errors.count).toEqual(0);
    });

    it("removes previously invalid fields", function() {
      person.name = "";
      validatable.validations.validate(person);
      expect(person.$errors.name).toContain("cannot be blank.");
      person.name = "Troy";
      validatable.validations.validate(person);
      expect(person.$errors.count).toEqual(0);
    });
  });

  describe("Integration with Base Class", function() { 
    var post;
    beforeEach(function() {
      post = Post.new({});
    });

    it("adds validations the model instance", function() {
      post.validate();
      expect(post.$errors.title).toContain("cannot be blank.");
    });

    it("sets $valid as a property of the instance", function() {
      expect(post.$valid).toBe(false);
    });

    it("sets $invalid as a property of the instance", function() {
      expect(post.$invalid).toBe(true);
      post.title = "Fun Post";
      expect(post.$invalid).toBe(false);
    });
  });
});
