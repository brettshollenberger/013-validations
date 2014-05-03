var Mocks, BaseClass, Post, BCValidations, Validation, Validations, Errors;
beforeEach(module('BaseClass'));
beforeEach(module('Mocks'));
beforeEach(inject(function(_BaseClass_, _Mocks_, _BCValidations_, _BCErrors_) {
  BaseClass     = _BaseClass_;
  Mocks         = _Mocks_;
  Post          = Mocks.Post;
  BCValidations = _BCValidations_;
  Validation    = BCValidations.Validation;
  Validations   = BCValidations.Validations;
  Errors        = _BCErrors_;
}));
