angular
  .module('BaseClass')
  .factory('BCValidatable.Validator', ['BCValidatable.ValidationFn', 'BCValidatable.validators', 
  'BCValidatable.ValidationMessageNotFoundError', 
  function(ValidationFn, validators, ValidationMessageNotFoundError) {

    function AnonymousValidator(options, name) {
      if (!_.isUndefined(options.validator)) {
        if (options.message) options.validator.message = options.message;
        return new Validator(options.validator, name);
      }
    }

    function Validator(validationFn, name) {
      if (validationFn.validator) return new AnonymousValidator(validationFn, name);

      this.options   = validationFn.options;
      this.name      = validationFn.name || name;
      this.message   = validationFn.message;
      this.configure = function(options) {
        options = defaultOptions(options);
        if (_.isUndefined(options.message) && _.isUndefined(this.message)) {
          throw new ValidationMessageNotFoundError(this.name);
        }

        if (hasChildren(options)) return configuredChildren(options);
        else                      return new ValidationFn(validationFn, _.defaults(options, this));
      }

      // Private interface
      var validator             = this;
      validator.childValidators = {};
      addChildren(validationFn.options);
      validators.register(this);

      function addChildren(options) {
        _.each(options, function(option, childName) {
          if (isValidator(option)) validator.childValidators[childName] = option;
        });
      }

      function isValidator(option) {
        return option.constructor.name == "Validator";
      }

      function defaultOptions(options) {
        if (!_.isObject(options)) { options = {value: options, message: this.message} }
        if (!_.isUndefined(validationFn.name)) options[validationFn.name] = options.value;
        return options;
      }

      function hasChildren(options) {
        return Object.keys(validator.childValidators).length > 0;
      }

      function configuredChildren(options) {
        return _.chain(validator.childValidators)
                .map(function(val, name) {
                  if (options[name]) return [validator.childValidators[name], options[name]];
                })
                .compact()
                .map(function(c) {
                  var child = c[0], options = c[1];
                  return child.configure(options);
                })
                .compact()
                .value();
      }

    }

    return Validator;
  }]);


