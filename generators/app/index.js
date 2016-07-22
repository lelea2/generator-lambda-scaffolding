'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var validatePackageName = require('validate-npm-package-name');

var LambdaGenerator = yeoman.Base.extend({
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
      message: 'What is your app\'s name ?',
      validate: function(name) {
        var validation = validatePackageName(name);
        var warnings = validation.warnings || [];
        var errors = validation.errors || [];

        if (validation.validForNewPackages) {
          return true;
        }

        return warnings.concat(errors).join('\n');
      }
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
    var base = this.appName;
    mkdirp(base);
    mkdirp(base + "/app");
    mkdirp(base + "/build");
    mkdirp(base + "/test");

    //Copy main file
    console.log('copyMainFiles process...');
    this.copy("_index.js", base + "/app/index.js");
    this.copy("_index_test.js", base + "/test/index.js");
    this.copy("_env.hbs", base + "/build/env.hbs");
    this.copy("_gruntfile.js", base + "/Gruntfile.js");
    this.copy("_handler.js", base + "/handler.js");
    this.copy("README.md", base + "/README.md");
    this.copy("gitignore", base + "/.gitignore");
    this.copy("jshintrc", base + "/.jshintrc");
    this.copy("jscsrc", base + "/.jscsrc");

    var context = {
        appName: this.appName,
        appDescription: this.appDescription,
        appURL: this.appURL
    };

    this.template("_package.json", base + "/package.json", context);
  },

  install: function() {
    console.log('runNpm process...');
    this.npmInstall();
  }
});

module.exports = LambdaGenerator;
