//wrapper function
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*uglify: {
            options: {
                banner: '/!*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> *!/\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }*/

        /*env: {
            dev: {
                NODE_ENV: 'dev',
                DEST: '<%= config.dev %>'
            },
            dist: {
                NODE_ENV: 'dist',
                DEST: '<%= config.dist %>'
            }
        },*/

        jshint: {
            server:{
                src: "server/**/*.js"
            },
            client:{
                src: "client/**/*.js"
            }
        },
        typescript: {
            base: {
                src: ['client/plugins/**/*.ts'],
                dest: 'client/js/a.js',
                options: {
                    module: 'system', //or commonjs
                    target: 'es5', //or es3
                    sourceMap: true,
                    declaration: true
                }
            }
        },

        /*injector: {
            options: {},
            js: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('public/', '');
                        filePath = filePath.replace('/tmp/', '');

                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->',
                },
                files: {
                    'tmp/public/index.html': [
                        [

                            //'tmp/public/source/!**!/!*.js',
                            'public/plugins/!**!/!*js'
                            // 'public/source/plugins/wyliodrin.menubar/!*.js'
                        ]
                    ]
                }
            },*/

        wiredep: {
            client: {
                cwd: 'client',
                src: 'client/index.html',
                ignorePath: '',
                exclude: []
            }
        },

        injector: {
            options: {},
            js:{
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('client/', 'public/');
                        //filePath = filePath.replace('/tmp/', '');

                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'client/index.html': [
                        [

                            //'tmp/public/source/**/*.js',
                            'client/plugins/**/*.js'
                            // 'public/source/plugins/wyliodrin.menubar/!*.js'
                        ]
                    ]
                }
            }
        },

        watch: {
            files: 'client/**/*.ts',
            tasks: ['typescript']
        },
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-injector');
    //this is used to wire bower dependencies
    grunt.loadNpmTasks('grunt-wiredep');


    // Default task(s).
    //grunt.registerTask('default', ['uglify']);
    grunt.registerTask('server', ['jshint:server', /*'typescript'*/]);
    grunt.registerTask('client', ['jshint:client']);
    grunt.registerTask('global', [/*'typescript',*/ 'wiredep'/*, 'injector*/'/*, 'watch'*/]);

};