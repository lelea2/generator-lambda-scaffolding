module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-aws-lambda');
  grunt.loadNpmTasks('grunt-writefile');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.initConfig({
    jscs: {
      src: './*.js',
      options: {
        config: '.jscsrc',
        esnext: false,
        verbose: true,
        requireCurlyBraces: [],
      }
    },
    writefile: {
      options: {
        data: {
        }
      },
      index: {
        src: 'build/env.hbs',
        dest: '.env',
      }
    },
    lambda_invoke: {
      default: {
        options: {
          file_name: 'handler.js',
        }
      },
    },
    lambda_package: {
      default: {
        options: {
          include_files: ['.env', './app/**'],
        }
      }/*,
      prod: {
        options: {
          include_files: ['.env', './app/**'],
        }
      }*/
    },
    lambda_deploy: {
      default: {
        arn: process.env.DEPLOY_ARN,
        options: {
          aliases: 'beta',
          enableVersioning: true
        },
      }/*,
      prod: {
        arn: process.env.DEPLOY_ARN,
        options: {
          aliases: 'prod',
          enableVersioning: true
        },
      }*/
    },
  });

  grunt.registerTask('check', ['jscs']);

  grunt.registerTask('run', ['check', 'lambda_invoke']);
  grunt.registerTask('run-nochecks', ['lambda_invoke']);

  grunt.registerTask('config', ['writefile']);

  //grunt.registerTask('build-nochecks-test', ['config', 'lambda_package:default']);
  //grunt.registerTask('build-nochecks-prod', ['config', 'lambda_package:prod']);
  grunt.registerTask('build-nochecks', ['config', 'lambda_package']);
  //grunt.registerTask('build-test', ['check', 'build-nochecks-test']);
  //grunt.registerTask('build-prod', ['check', 'build-nochecks-prod']);
  grunt.registerTask('build', ['check', 'build-nochecks']);

  //grunt.registerTask('deploy-nochecks-test', ['build-nochecks-test', 'lambda_deploy:default']);
  //grunt.registerTask('deploy-nochecks-prod', ['build-nochecks-prod', 'lambda_deploy:prod']);
  grunt.registerTask('deploy-nochecks', ['build-nochecks', 'lambda_deploy']);

  //grunt.registerTask('deploy-test', ['build-test', 'lambda_deploy:default']);
  //grunt.registerTask('deploy-prod', ['build-prod', 'lambda_deploy:prod']);
  grunt.registerTask('deploy', ['build', 'lambda_deploy']);
};
