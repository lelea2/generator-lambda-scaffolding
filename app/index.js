'use strict';

require('dotenv').load(); //loading config files

exports.handler = function(event, context) {
  context.done('Hello Reesio');
};
