angular
  .module('BaseClass')
  .factory('BCValidatable.builtInValidators.length', [function() {
    function max(options) {
      return function max(value) {
        var max = options.max;
        if (value === undefined || value === '' || value === null) return true;
        return value.length <= max;
      };
    };

    function min(min) {
      return function min(value) {
        if (value === undefined || value === '' || value === null) return true;
        return value.length >= min;
      };
    };

    max.message = function(options) {
      return "Must be no more than " + options.max + " characters";
    }

    min.message = function(options) {
      return "Must be at least " + options.min + " characters";
    }

    return {
      max: max,
      min: min
    }
  }]);
