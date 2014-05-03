angular
  .module('Mocks')
  .factory('Post', ['BaseClass', function(BaseClass) {

    Post.inherits(BaseClass.Base);

    function Post(attributes) {
      this.id = attributes.id;
    };

    Post.validates({
      title: {
        required: true,
        length: {
          min: 5,
          max: 20
        }
      }
    });

    return Post;
  }]);
