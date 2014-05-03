angular
  .module('BaseClass')
  .factory('BCCacheable', function() {
    function Cacheable() {

      var _cached = {};

      privateVariable(_cached, 'cache', function(instance) {
        var primaryKey = this.primaryKey;
        if (instance && instance[primaryKey] !== undefined) {
          _cached[instance[primaryKey]] = instance;
        };
      });

      privateVariable(_cached, 'isEmpty', function() {
        return !!(!Object.keys(_cached).length);
      });

      privateVariable(_cached, 'where', function(terms) {
        return _.where(_cached, terms, _cached);
      });

      this.cached        = _cached;
      this.cache         = _cached.cache;
      this.setPrimaryKey = function setPrimaryKey(instance, attributes) {
        instance[this.primaryKey] = attributes[this.primaryKey];
      }
    };

    return Cacheable;
  });
