module.exports = function(grunt) {
    //See: https://github.com/gruntjs/grunt-contrib-jshint
    //See: https://github.com/Krinkle/travis-ci-node-and-browser-qunit
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.initConfig({
        jshint : {
            files : ['*.js', '*/*.js'],
            options : {
                //Not an option: jshintignore: '.jshintignore',
                smarttabs : true
            },
            ignores : ["core/ECMAScript.v5.js", "core/ES.v5.js"],
            ignore_warning : {
                options : {
                    '-W099' : true
                }
            }
        },
        qunit : {
            files : ['tests/index.html']
        }
    });

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['test']);
};
