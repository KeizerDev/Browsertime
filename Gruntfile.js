var fs = require("fs");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        watch: {
            scripts: {
                files: ["src/Sass/**/*.scss", "src/React/**/*.jsx", "src/React/**/*.js"],
                tasks: ["sass", "browserify:dev"]
            }
        },

        browserify: {
            dev: {
                options: {
                    debug: true,
                    transform: [['babelify', {presets: ['es2015', 'react']}]]
                },
                files: {
                    "web/js/app.js": ["src/React/**/*.js"]
                }
            },
            build: {
                options: {
                    debug: false,
                    transform: [["babelify", {presets: ['es2015', 'react']}]]
                },
                files: {
                    "web/js/app.js": "src/React/**/*.js"
                }
            }
        },

        sass: {
            dist: {
                files: {
                    "web/styles/app.css": "src/Sass/app.scss"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browserify");



    grunt.registerTask("default", ["sass", "browserify:dev", "watch"]);
    grunt.registerTask("dev", ["browserify:dev", "sass"]);
    grunt.registerTask("deploy", ["browserify:build", "sass"]);
};
