angular
  .module('BaseClass')
  .factory('BCValidatable', ['BCValidatable.Validation', 
      'BCValidatable.builtInValidators', 'BCValidatable.ValidationNotFoundError',
      'BCValidatable.ValidationMessageNotFoundError', 'BCErrors',
      function(Validation, builtInValidators, ValidationNotFoundError,
               ValidationMessageNotFoundError, Errors) { 

    return function Validatable(validationsDescription) {

      var _validations = {};

      privateVariable(_validations, 'add', function add(validationsDescription) {
        _.each(validationsDescription, function(validations, fieldName) {
          if (_.isUndefined(_validations[fieldName])) _validations[fieldName] = [];
          parseValidationsForField(validations, fieldName);
        }, _validations);
      });

      privateVariable(_validations, 'validate', function validate(instance, fieldName) {
        var toValidate = getFieldsToValidate(fieldName),
            isValid    = true;

        _.each(toValidate, function(validation) {
          if (validation.validate(instance[validation.field]) == false) {
            instance.$errors.add(validation.field, validation.message);
            isValid = false;
          } else {
            instance.$errors.clear(validation.field, validation.message);
          }
        });

        return isValid;
      });

      // Private interface
      function getFieldsToValidate(fieldName) {
        if (fieldName && _validations[fieldName]) return _validations[fieldName];
        var toValidate = [];
        _.each(_validations, function(validations, fieldName) {
          toValidate.push(validations);
        });

        return _.flatten(toValidate);
      }

      function parseValidationsForField(validations, fieldName) {
        _.each(validations, function(options, validationName) {
          parseValidation(fieldName, builtInValidators, validationName, options);
        });
      }

      function parseValidation(fieldName, validators, validationName, options) {
        if (_.isObject(options) && _.isFunction(options.validator)) {
          return addValidation(fieldName,
                               validationName,
                               options.validator,
                               options);
        }

        if (_.isFunction(validators[validationName])) {
          return addValidation(fieldName,
                               validationName,
                               validators[validationName],
                               options);
        }

        if (!_.isObject(options) && validators === builtInValidators) {
          throw new ValidationNotFoundError(validationName);
        }

        _.each(options, function(val, key) {
          parseValidation(fieldName,
                          validators[validationName],
                          key,
                          options);
        });

      }

      function addValidation(fieldName, validationName, validationFn, options) {
        var message = findMessage(fieldName, validationName, validationFn, options);
        _validations[fieldName].push(new Validation(fieldName,
                                     message,
                                     validationFn));
      }

      function findMessage(fieldName, validationName, validationFn, options) {
        if (_.isObject(options) && options.message) { return options.message; }
        if (_.isString(options))                    { return options; }
        if (_.isString(validationFn.message))       { return validationFn.message; }
        throw new ValidationMessageNotFoundError(fieldName, validationName)
      }

      _validations.add(validationsDescription);
      this.validations = _validations;
      this.validates   = _validations.add;
      this.__$errors   = new Errors();
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
