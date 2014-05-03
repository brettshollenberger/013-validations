angular
  .module('BaseClass')
  .factory('BCValidations.ValidationMessageNotFoundError', [function() {
    function ValidationMessageNotFoundError(fieldName, validationName) {
      this.name    = "ValidationMessageNotFound";
      this.message = "Validation message not found for field '" + fieldName + "' and validation key '" + validationName + "'";
    }

    ValidationMessageNotFoundError.prototype = Error.prototype;

    return ValidationMessageNotFoundError;
  }])
