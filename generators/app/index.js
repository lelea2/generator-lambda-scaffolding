'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

var OnepageGenerator = yeoman.Base.extend({
  promptUser: function() {
    var done = this.async();

    var welcome =
'\n     _-----_' +
'\n    |       |' +
'\n    |' + chalk.red('--(o)--') + '|   .--------------------------.' +
'\n   `---------´  |    ' + chalk.yellow.bold('Welcome to lamdba-scaffold generator,') + '    |' +
'\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('ladies and gentlemen!') + '  |' +
'\n    /___A___\\   \'__________________________\'' +
'\n     ' + chalk.yellow('|  ~  |') +
'\n   __' + chalk.yellow('\'.___.\'') + '__' +
'\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

    console.log(welcome);
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

    this.prompt(prompts).then(function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appURL = props.appURL;

      done();
    }.bind(this));
  },

  //Making folder ready
  writing: function() {
    mkdirp("app");
    mkdirp("build");
    mkdirp("test");

    //Copy main file
    console.log('copyMainFiles process...');
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

  install: function() {
    console.log('runNpm process...');
    var done = this.async();
    this.npmInstall("", function(){
        console.log("\nEverything Setup !!!\n");
        done();
    });
  }
});

module.exports = OnepageGenerator;
