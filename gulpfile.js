var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
// Build Dependencies
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var es = require('event-stream');
var uglify = require('gulp-uglify');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Default task
gulp.task('default', ['css', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//browserify
// Basic usage
gulp.task('browserify:comp', function() {
  return browserify('./js/tasks/task4b.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('./task4b.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./js/brow/'));
});

//ALL
gulp.task('browserify:all', function(done) {
    glob('./js/tasks/*.js', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                // .pipe(rename({
                //     extname: '.js'
                // }))
                .pipe(gulp.dest('./brow/'));
            });
        es.merge(tasks).on('end', done);
    })
});

// Dev task
gulp.task('dev', ['css', 'browserSync', 'browserify:all'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./*.html', browserSync.reload);

});
