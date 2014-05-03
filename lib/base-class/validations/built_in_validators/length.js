angular
  .module('BaseClass')
  .factory('BCValidations.builtInValidators.length', [function() {
    function max() {
      return true;
    }

    max.message = "cannot exceed";

    function min() {
      return true;
    }

    min.message = "must be at least";

    return {
      max: max,
      min: min
    }
  }]);
