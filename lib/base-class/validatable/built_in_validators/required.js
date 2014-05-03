angular
  .module('BaseClass')
  .factory('BCValidatable.builtInValidators.required', [function() {
    function required(value) {
      if (value === undefined || value === null) return false;
      if (value.constructor.name == 'String') return !!(value && value.length || typeof value == 'object');
      return value !== undefined;
    };

    required.message = "cannot be blank.";

    return required;
  }])
