"use strict";

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/*.js']	
			}
		}
	});

	grunt.registerTask('test', ['mochaTest']);
};
