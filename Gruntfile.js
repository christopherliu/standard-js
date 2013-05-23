module.exports = function (grunt) {
	//See: https://github.com/Krinkle/travis-ci-node-and-browser-qunit
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.initConfig({
		jshint: {
			all: ['*.js', '*.js'],
			options: {
				smarttabs: true
			}
		},
		qunit: {
			all: ['test/index.html']
		}
	});

	grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('default', ['test']);
};