angular
  .module('BaseClass')
  .factory('BCValidatable.Validator', ['BCValidatable.ValidationMessageNotFoundError', function(
        ValidationMessageNotFoundError) {
    return function Validator(validationFn) {

      var validator             = this;
      validator.childValidators = {};

      addChildren(validationFn.options);
      validationFn.options = ["value", "message"];
      if (!_.isUndefined(validationFn.name)) validationFn.options.push(validationFn.name);

      function addChildren(options) {
        _.each(options, function(option, childName) {
          if (isValidator(option)) validator.childValidators[childName] = option;
        });
      }

      function isValidator(option) {
        return option.constructor.name == "Validator";
      }

      function findChild(option) {
        var child;
        _.each(validator.childValidators, function(v, name) {
          if (option === name) child = validator.childValidators[name];
        });
        return child;
      }

      function isChild(option) {
        return !_.isUndefined(findChild(option));
      }

      function defaultOptions(options) {
        if (!_.isObject(options)) { options = {value: options, message: this.message} }
        if (!_.isUndefined(validationFn.name)) options[validationFn.name] = options.value;
        options.prototype = validationFn;
        return options;
      }

      function hasChildren(options) {
        return !_.isEmpty(findChildren(options));
      }

      function findChildren(options) {
        var children = [];
        _.each(options, function(childOptions, name) {
          if (isChild(name)) {
            var child = findChild(name);
            children.push(child.configure(childOptions));
          }
        });

        return children;
      }

      function configureMessage(configurationOptions, validator) {
        var message = configurationOptions.message || validator.message;
        if (_.isString(message))   return message;
        if (_.isFunction(message)) return message.apply(configurationOptions);
      }

      this.configure = function(options) {
        options = defaultOptions(options);

        if (hasChildren(options)) return findChildren(options);

        var configuredValidationFn     = _.bind(validationFn, options);
        configuredValidationFn.message = configureMessage(options, this);

        return configuredValidationFn;
      }

      this.options = validationFn.options;
      this.message = validationFn.message;
    }
  }]);
