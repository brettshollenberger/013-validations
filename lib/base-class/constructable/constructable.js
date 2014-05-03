angular
  .module('BaseClass')
  .factory('BCConstructable', [function() {

    function Constructable() {
      this.new = function(attributes) {
        var instance = new this(attributes);
        this.setPrimaryKey(instance, attributes);
        this.cache(instance);
        return instance;
      }
    }

    return Constructable;
  }]);
