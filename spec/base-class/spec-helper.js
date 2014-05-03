var Mocks, BaseClass, Post, Person, Validatable, Validation;
beforeEach(module('BaseClass'));
beforeEach(module('Mocks'));
beforeEach(inject(["BaseClass", "Mocks", "BCValidatable", "BCValidatable.Validation", 
  "BCErrorable", 
  function(_BaseClass_, _Mocks_, _BCValidatable_, _BCValidation_) {
    BaseClass   = _BaseClass_;
    Mocks       = _Mocks_;
    Post        = Mocks.Post;
    Person      = Mocks.Person;
    Validatable = _BCValidatable_;
    Validation  = _BCValidation_;
}]));
