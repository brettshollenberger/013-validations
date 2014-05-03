angular
  .module('BaseClass')
  .factory('BCValidatable.ValidationNotFoundError', [function() {
    function ValidationNotFoundError(name) {
      this.name    = "ValidationNotFound";
      this.message = "Validation " + name + " not found.";
    }

    ValidationNotFoundError.prototype = Error.prototype;

    return ValidationNotFoundError;
  }]);
