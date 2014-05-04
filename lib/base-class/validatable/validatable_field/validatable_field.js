angular
  .module('BaseClass')
  .factory('BCValidatable.Field', ['BCValidatable.Validation', 'BCValidatable.Validator', 
  'BCValidatable.validators', function(Validation, Validator, validators) {

    function Field(name, validationSet) { 
      var field = [];

      field.addValidators = function(options, validationName) {
        var validator     = validators.find(validationName) || new Validator(options, validationName),
            configuredFns = _.flatten([validator.configure(options)]);

        _.each(configuredFns, field.addValidation);
      }

      field.addValidation = function(validationFn) {
        field.push(new Validation(name, validationFn));
      }

      _.each(validationSet, field.addValidators);

      return field;
    }

    return Field;

  }]);

