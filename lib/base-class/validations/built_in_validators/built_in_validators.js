angular
  .module('BaseClass')
  .factory('BCValidations.builtInValidators', 
  ['BCValidations.builtInValidators.required', 'BCValidations.builtInValidators.length',
    function(required, length) {
      var builtInValidators = {
        required: required,
        length: length
      }

      return builtInValidators;
  }]);
