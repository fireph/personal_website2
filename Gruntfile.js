module.exports = function (grunt) {
  const jimp = require("jimp");
  const glob = require("glob");
  const path = require("path");

  grunt.initConfig({
    jsResources: [
      "echo.min.js",
      "modernizr-custom.js",
      "master.js",
      "google-analytics.js",
    ],
    clean: {
      webp: ["webp/img/projects/*"],
      tiny: ["tiny/img/projects/*"],
    },
    cwebp: {
      dynamic: {
        options: {
          q: 50,
        },
        files: [
          {
            expand: true,
            src: ["img/projects/*"],
            dest: "webp/",
          },
        ],
      },
    },
    stylus: {
      compile: {
        options: {
          compress: true,
        },
        files: {
          "master.css": ["master.styl"],
        },
      },
    },
    uglify: {
      options: {
        compress: true,
        mangle: true,
      },
      dist: {
        files: {
          "build/combined.js": ["<%= jsResources %>"],
        },
      },
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              //Grab the <!--build-resume-start--> and <!--build-resume-end--> comments and everything in-between
              match: /\<\!\-\-build\-resume\-start[\s\S]*build\-resume\-end\-\-\>/,
              replacement: '<%= grunt.file.read("resume/index.html") %>',
            },
            {
              //Grab the <!--build-js-start--> and <!--build-js-end--> comments and everything in-between
              match: /\<\!\-\-build\-js\-start[\s\S]*build\-js\-end\-\-\>/,
              replacement:
                '<script><%= grunt.file.read("build/combined.js") %></script>',
            },
            {
              //Grab the <!--build-css-start--> and <!--build-css-end--> comments and everything in-between
              match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
              replacement:
                '<style><%= grunt.file.read("master.css") %></style>',
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["index-dev.html"],
            dest: "build",
          },
        ],
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "index.html": "build/index-dev.html",
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 8081,
          keepalive: true,
        },
      },
    },
    watch: {
      stylus: {
        files: ["master.styl"],
        tasks: ["stylus", "replace", "htmlmin"],
      },
      js: {
        files: ["<%= jsResources %>"],
        tasks: ["uglify", "replace", "htmlmin"],
      },
      html: {
        files: ["index-dev.html", "resume/index.html"],
        tasks: ["replace", "htmlmin"],
      },
      img: {
        files: ["img/projects/*"],
        tasks: ["clean", "jimp", "cwebp"],
      },
    },
    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      target: ["connect", "watch"],
    },
  });

  function resizeDirectoryImages(
    srcPath,
    dstPath,
    { width = jimp.AUTO, height = jimp.AUTO }
  ) {
    return new Promise((resolve, reject) => {
      glob(
        srcPath + "*.@(png|jpg|jpeg|bmp)",
        { nocase: true, nodir: true, realpath: true },
        (err, files) => {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        }
      );
    }).then((files) => {
      return Promise.all(
        files.map((filepath) => {
          return new Promise((resolve, reject) => {
            return jimp.read(filepath).then((image) => {
              let newFilePath = path.join(dstPath, path.basename(filepath));
              image.resize(width, height).write(newFilePath, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(newFilePath);
                }
              });
            });
          }).then(console.log);
        })
      );
    });
  }

  grunt.registerTask(
    "jimp",
    "Jimp resize for low-res previews of project images.",
    function () {
      resizeDirectoryImages("img/projects/", "tiny/img/projects/", {
        width: 16,
      }).then(() => {
        console.log("Done!");
      });
    }
  );

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-cwebp");
  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");

  grunt.registerTask("default", [
    "clean",
    "jimp",
    "cwebp",
    "stylus",
    "uglify",
    "replace",
    "htmlmin",
    "concurrent:target",
  ]);
};
