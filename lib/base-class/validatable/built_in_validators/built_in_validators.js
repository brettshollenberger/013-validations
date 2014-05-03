angular
  .module('BaseClass')
  .factory('BCValidatable.builtInValidators', 
  ['BCValidatable.builtInValidators.required', 'BCValidatable.builtInValidators.length',
    function(required, length) {
      var builtInValidators = {
        required: required,
        length: length
      }

      return builtInValidators;
  }]);
