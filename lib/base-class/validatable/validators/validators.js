angular
  .module('BaseClass')
  .factory('BCValidatable.validators', ['BCValidatable.DuplicateValidationRegistrationError', 
  function(DuplicateValidatorRegistrationError) {
      var validators = {};

      validators.register = function(validator) {
        if (_.isUndefined(validators[validator.name])) validators[validator.name] = validator;
        else throw new DuplicateValidatorRegistrationError(validator.name);
      }

      validators.find = function(validation) {
        return validators[validation];
      }

      return validators;
  }]);
