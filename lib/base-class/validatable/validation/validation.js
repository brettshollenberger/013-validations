angular
  .module('BaseClass')
  .factory('BCValidatable.Validation', [function() {
    return function Validation(field, message, validationFn) {
      this.field    = field;
      this.message  = message;
      this.validate = validationFn;
    }
  }]);
