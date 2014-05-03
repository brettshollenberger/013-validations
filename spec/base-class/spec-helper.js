var Mocks, BaseClass, Post, BCValidations, Validation;
beforeEach(module('BaseClass'));
beforeEach(module('Mocks'));
beforeEach(inject(function(_BaseClass_, _Mocks_, _BCValidations_) {
  BaseClass     = _BaseClass_;
  Mocks         = _Mocks_;
  Post          = Mocks.Post;
  BCValidations = _BCValidations_;
  Validation    = BCValidations.Validation;
}));
