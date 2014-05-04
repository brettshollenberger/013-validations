angular
  .module('BaseClass')
  .factory('BCValidatable.Validation', [function() {
    return function Validation(field, validationFn) {
      this.field    = field;
      this.message  = validationFn.message;
      this.validate = function(instance) {
        return validationFn(instance[field]);
      }
    }
  }]);
