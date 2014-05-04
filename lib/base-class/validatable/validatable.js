angular
  .module('BaseClass')
  .factory('BCValidatable', ['BCValidatable.Validation', 
  'BCValidatable.validators', 'BCValidatable.Validator', 'BCValidatable.ValidationNotFoundError',
  'BCValidatable.ValidationMessageNotFoundError', 'BCValidatable.validators.required',
  'BCValidatable.validators.length', 'BCValidatable.validators.length.min',
  'BCValidatable.validators.length.max',
  function(Validation, validators, Validator, ValidationNotFoundError, 
  ValidationMessageNotFoundError) { 

    function Field(name, validationSet) { 
      var field = [];

      field.addValidationSet = function(options, validationName) {
        var validator     = validators.find(validationName) || new Validator(options, validationName),
            configuredFns = _.flatten([validator.configure(options)]);

        _.each(configuredFns, field.addValidation);
      }

      field.addValidation = function(validationFn) {
        field.push(new Validation(name, validationFn));
      }

      _.each(validationSet, field.addValidationSet);

      return field;
    }

    return function Validatable(validationsDescription) {

      var _validations = {};

      privateVariable(_validations, 'add', function add(validationsDescription) {
        _.each(validationsDescription, function(validationSet, fieldName) {
          _validations[fieldName] = new Field(fieldName, validationSet);
        }, _validations);
      });

      privateVariable(_validations, 'validate', function validate(instance, fieldName) {
        var toValidate = getFieldsToValidate(fieldName),
            isValid    = true;

        _.each(toValidate, function(validation) {
          if (validation.validate(instance) == false) {
            instance.$errors.add(validation.field, validation.message);
            isValid = false;
          } else {
            instance.$errors.clear(validation.field, validation.message);
          }
        });

        return isValid;
      });

      function getFieldsToValidate(fieldName) {
        if (fieldName && _validations[fieldName]) return _validations[fieldName];
        var toValidate = [];
        _.each(_validations, function(validations, fieldName) {
          toValidate.push(validations);
        });

        return _.flatten(toValidate);
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
