module.exports = function(grunt) {
    //See: https://github.com/gruntjs/grunt-contrib-jshint
    //See: https://github.com/Krinkle/travis-ci-node-and-browser-qunit
    //See: http://gruntjs.com/configuring-tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.initConfig({
        jshint : {
            options : {
                //Not an option: jshintignore: '.jshintignore',
                smarttabs : true,
                '-W099' : true,
                ignores : ["core/ECMAScript.v5.js", "core/ES.v5.js"]
            },
            all_files : {
                src : ['*.js', '*/*.js']
            }
        },
        qunit : {
            files : ['tests/index.html']
        }
    });

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['test']);
};
