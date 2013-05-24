module.exports = function(grunt) {
    //See: https://github.com/Krinkle/travis-ci-node-and-browser-qunit
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.initConfig({
        jshint : {
            files : ['*.js', '*/*.js'],
            options : {
                jshintignore: '.jshintignore',
                smarttabs : true
            },
            ignore_warning : {
                options : {
                    '-W033' : true,
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
