angular
  .module('BaseClass')
  .factory('BCBase', ['BCConstructable', 'BCCacheable', 'BCValidatable', 'BCErrorable',
    function(Constructable, Cacheable, Validatable, Errorable) {

    function Base(attributes) {
      var constructor = this;
      var prototype   = constructor.prototype;
      privateVariable(constructor, 'primaryKey', 'id');

      constructor.extend(Constructable);
      constructor.extend(Cacheable);
      constructor.extend(Validatable);
      constructor.include(Validatable);
      constructor.include(Errorable);
    };

    return Base;
  }]);
