module.exports = function(grunt) {
  grunt.initConfig({
    jsResources: ['echo.min.js', 'master.js', 'google-analytics.js'],
    stylus: {
      compile: {
        options: {
          compress: true
        },
        files: {
          'master.css': ['master.styl']
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'build/combined.js': ['<%= jsResources %>']
        }
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              //Grab the <!--build-resume-start--> and <!--build-resume-end--> comments and everything in-between
              match: /\<\!\-\-build\-resume\-start[\s\S]*build\-resume\-end\-\-\>/,
              replacement: '<%= grunt.file.read("resume/index.html") %>'
            },
            {
              //Grab the <!--build-js-start--> and <!--build-js-end--> comments and everything in-between
              match: /\<\!\-\-build\-js\-start[\s\S]*build\-js\-end\-\-\>/,
              replacement: '<script><%= grunt.file.read("build/combined.js") %></script>'
            },
            {
              //Grab the <!--build-css-start--> and <!--build-css-end--> comments and everything in-between
              match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
              replacement: '<style><%= grunt.file.read("master.css") %></style>'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['index-dev.html'],
            dest: 'build'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'build/index-dev.html',
        }
      },
    },
    connect: {
      server: {
        options: {
          port: 8081,
          keepalive: true
        }
      }
    },
    watch: {
      stylus: {
        files: ['master.styl'],
        tasks: ['stylus', 'replace', 'htmlmin']
      },
      js: {
        files: ['<%= jsResources %>'],
        tasks: ['uglify', 'replace', 'htmlmin']
      },
      html: {
        files: ['index-dev.html'],
        tasks: ['replace', 'htmlmin']
      },
      img: {
        files: ['img/**/*'],
        tasks: ['stylus', 'replace', 'htmlmin']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      target: ['connect', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['stylus', 'uglify', 'replace', 'htmlmin', 'concurrent:target']);
};