Function.prototype.inherits = function(baseclass) {
  var _constructor = this;
  _constructor = baseclass.apply(_constructor);
};

Function.prototype.extend = function(Module) {
  var methods = new Module(),
      classMethods = _.omit(methods, function(val, key) {
        return key.slice(0, 2) == '__';
      });
  _.extend(this, classMethods);
};

Function.prototype.include = function(Module) {
  var methods = new Module(),
      instanceMethods = _.chain(methods)
                         .omit(methods, function(val, key) { 
                           return key.slice(0, 2) != '__'; 
                         })
                         .transform(function(result, val, key) { 
                           result[key.slice(2)] = val; 
                         })
                         .value(),
      oldConstructor = this.new;

  this.new = function() {
    var instance = oldConstructor.apply(this, arguments);
    _.extend(instance, instanceMethods);
    return instance;
  }
};

function privateVariable(object, name, value) {
  var val;
  Object.defineProperty(object, name, {
    enumerable: false,
    configurable: false,
    get: function()       { return val; },
    set: function(newval) { val = newval; }
  });

  if (value !== undefined) object[name] = value;
};

Array.prototype.nonduppush = function(arg) {
  if (!_.include(this, arg)) this.push(arg);
}

angular
  .module('BaseClass', [])
  .factory('BaseClass', ['BCBase', function(Base) {
    BaseClass      = {};
    BaseClass.Base = Base;
    return BaseClass;
  }]);
