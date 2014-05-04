angular
  .module('BaseClass')
  .factory('BCValidatable.DuplicateValidationRegistrationError', [function() {
    function DuplicateValidationRegistrationError(name) {
      this.name    = "DuplicateValidationRegistration";
      this.message = "A validator by the name '" + name + "' has already been registered. ";
    }

    DuplicateValidationRegistrationError.prototype = Error.prototype;

    return DuplicateValidationRegistrationError;
  }]);
