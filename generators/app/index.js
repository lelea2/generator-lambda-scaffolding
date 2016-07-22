'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var OnepageGenerator = yeoman.generators.Base.extend({
  promptUser: function() {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    },{
      name: 'appDescription',
      message: 'Enter your app description:'
    }, {
      name: 'appURL',
      message: 'Enter your app repository:'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appURL = props.appURL;

      done();
    }.bind(this));
  },

  //Making folder ready
  scaffoldFolders: function(){
    this.mkdir("app");
    this.mkdir("build");
    this.mkdir("test");
  },

  copyMainFiles: function(){
    this.copy("_index.js", "app/index.js");
    this.copy("_index_test.js", "test/index.js");
    this.copy("_env.hbs", "build/env.hbs");
    this.copy("_gruntfile.js", "Gruntfile.js");
    this.copy("_handler.js", "handler.js");
    this.copy("README.md", "README.md");
    this.copy("gitignore", ".gitignore");
    this.copy("jshintrc", ".jshintrc");
    this.copy("jscsrc", ".jscsrc");

    var context = {
        appName: this.appName,
        appDescription: this.appDescription,
        appURL: this.appURL
    };

    this.template("_package.json", "package.json", context);
  },

  runNpm: function(){
    var done = this.async();
    this.npmInstall("", function(){
        console.log("\nEverything Setup !!!\n");
        done();
    });
  }
});

module.exports = OnepageGenerator;
