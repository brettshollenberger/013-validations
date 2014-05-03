angular
  .module('BaseClass')
  .factory('BCValidations', ['Validation', function(Validation) {
    return {
      Validation: Validation
    }
  }])
  .factory('Validation', [function() {
    return function Validation(field, message, validationFn) {
      this.field    = field;
      this.message  = message;
      this.validate = validationFn;
    }
  }]);
