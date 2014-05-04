angular
  .module('BaseClass')
  .factory('BCValidatable.ValidationMessageNotFoundError', [function() {
    function ValidationMessageNotFoundError(validatorName) {
      this.name    = "ValidationMessageNotFound";
      this.message = "Validation message not found for validator '" + validatorName + "'";
    }

    ValidationMessageNotFoundError.prototype = Error.prototype;

    return ValidationMessageNotFoundError;
  }])
