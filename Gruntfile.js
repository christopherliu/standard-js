module.exports = function(grunt) {
    //See: https://github.com/gruntjs/grunt-contrib-jshint
    //See: https://github.com/Krinkle/travis-ci-node-and-browser-qunit
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.initConfig({
        jshint : {
            ignore_warning : {
                src : ['*.js', '*/*.js'],
                options : {
                    //Not an option: jshintignore: '.jshintignore',
                    smarttabs : true,
                    '-W099' : true
                },
                ignores : ["core/ECMAScript.v5.js", "core/ES.v5.js"]
            }
        },
        qunit : {
            files : ['tests/index.html']
        }
    });

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['test']);
};
