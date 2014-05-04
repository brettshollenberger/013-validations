var Mocks, BaseClass, Post, Person, Validatable, Validation, ValidationOptions;
beforeEach(module('BaseClass'));
beforeEach(module('Mocks'));
beforeEach(inject(["BaseClass", "Mocks", "BCValidatable", "BCValidatable.Validation", 
  "BCValidatable.Validator", "BCValidatable.ValidationOptions",
  function(_BaseClass_, _Mocks_, _BCValidatable_, _BCValidation_, _BCValidator_, 
    _BCValidationOptions_) {

    BaseClass         = _BaseClass_;
    Mocks             = _Mocks_;
    Post              = Mocks.Post;
    Person            = Mocks.Person;
    Validatable       = _BCValidatable_;
    Validation        = _BCValidation_;
    Validator         = _BCValidator_;
    ValidationOptions = _BCValidationOptions_;

}]));
