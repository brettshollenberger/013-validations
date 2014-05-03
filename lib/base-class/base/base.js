angular
  .module('BaseClass')
  .factory('BCBase', ['BCCache', 'BCValidations', 'BCErrors', 
    function(Cache, Validations, Errors) {

    function Base(attributes) {
      var _constructor = this;
      var _prototype   = _constructor.prototype;
      privateVariable(_constructor, 'primaryKey', 'id');

      _constructor.new = function(attributes) {
        var instance = new _constructor(attributes);
        cache(instance);
        return instance;
      };

      function cache(instance) {
        _constructor.cached.cache(instance, _constructor.primaryKey);
      };

      _constructor.cached = new Cache();

      _constructor.extend(Validations.Validations);
      _constructor.include(Validations.Validations);
    };

    return Base;
  }]);
