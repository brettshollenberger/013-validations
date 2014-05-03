var Mocks, BaseClass, Post, Validatable, Validation, Errors;
beforeEach(module('BaseClass'));
beforeEach(module('Mocks'));
beforeEach(inject(["BaseClass", "Mocks", "BCValidatable", "BCValidatable.Validation", "BCErrors", function(_BaseClass_, _Mocks_, _BCValidatable_, _BCValidation_, _BCErrors_) {
  BaseClass   = _BaseClass_;
  Mocks       = _Mocks_;
  Post        = Mocks.Post;
  Validatable = _BCValidatable_;
  Validation  = _BCValidation_;
  Errors      = _BCErrors_;
}]));
