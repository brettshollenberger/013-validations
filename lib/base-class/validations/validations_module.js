angular
  .module('BaseClass')
  .factory('BCValidations', ['BCValidations.Validation', 'BCValidations.Validations', 
      function(Validation, Validations) {
    return {
      Validation: Validation,
      Validations: Validations
    }
  }]);
