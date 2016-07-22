var subject = require('../app/index.js');

describe('index', function() {

  it('Should run', function(done) {
    var context = {
      done: function() {},
      fail: function() {}
    };
    subject.handler({}, context);
    done();
  });

});
