angular
  .module('BaseClass')
  .factory('BCValidatable', ['BCValidatable.Validation', 'BCValidatable.Field', 'BCValidatable.ValidationNotFoundError',
  'BCValidatable.ValidationMessageNotFoundError', 'BCValidatable.validators.required',
  'BCValidatable.validators.length', 'BCValidatable.validators.length.min',
  'BCValidatable.validators.length.max',
  function(Validation, Field, ValidationNotFoundError, ValidationMessageNotFoundError) { 

    return function Validatable(validationsDescription) {

      var _validations = {};

      privateVariable(_validations, 'add', function add(validationsDescription) {
        _.each(validationsDescription, addField);
      });

      privateVariable(_validations, 'validate', function validate(instance, fieldName) {
        var toValidate = getFieldsToValidate(fieldName);
        _.each(toValidate, _.curry(validateField)(instance));
        return instance.$errors.countFor(fieldName) == 0;
      });

      function addField(validationSet, fieldName) {
        if (_validations[fieldName]) _validations[fieldName].addValidators(validationSet);
        else _validations[fieldName] = new Field(fieldName, validationSet);
      }

      function validateField(instance, validation) {
        if (validation.validate(instance) === false) {
          instance.$errors.add(validation.field, validation.message);
        } else {
          instance.$errors.clear(validation.field, validation.message);
        }
      }

      function getFieldsToValidate(fieldName) {
        if (fieldName && _validations[fieldName]) return _validations[fieldName];

        return _.chain(_validations)
                .map(function(validations) {
                  return validations;
                })
                .flatten()
                .value();
      }

      _validations.add(validationsDescription);

      this.validations = _validations;
      this.validates   = _validations.add;
      this.__validate  = function(fieldName) {
        return this.constructor.validations.validate(this, fieldName);
      }

      Object.defineProperty(this, '__$valid', {
        get: function() { return this.constructor.validations.validate(this); }
      });

      Object.defineProperty(this, '__$invalid', {
        get: function() { return !this.constructor.validations.validate(this); }
      });
    }
  }]);

