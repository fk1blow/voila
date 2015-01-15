'use strict';

var gulp = require('gulp');
var del = require('del');
var notifier = require('node-notifier');
var path = require('path');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-load-utils')(['colors', 'env', 'log']);
var concat = require('gulp-concat');
var watchify = require('watchify');
var browserify = require('browserify');
var coffee = require('coffee-script');

// Error handler
var errorHandler = function(err) {
  notifier.notify({ message: 'Error: ' + err.message });
  gutil.log(gutil.colors.red('Error'), err.message);
}

// watchify bundler
var bundler = watchify(browserify({
  debug: true,
  entries: ['./app/scripts/voila.coffee'],
  extensions: ['.coffee'],
  cache: {}, fullPaths: true,
  standalone: "Voila"
}));
bundler.transform('reactify');
bundler.transform('coffeeify');
bundler.on('update', bundleScripts);

function bundleScripts() {
  console.log("bundleScripts")
  return bundler.bundle()
    .on('error', function(err) {
      errorHandler(err);
      this.emit('end');
    })
    .pipe(source('voila.js'))
    .pipe(gulp.dest('./dist/scripts'))
}

// bundles the scripts bundle out using "browserify"
gulp.task('bundle-scripts', bundleScripts);

// 3rd party libs
gulp.task('vendor-libs', function() {
  return gulp.src('vendor/**/*.js')
    .pipe(concat('libs-bundle.js'))
    .pipe(gulp.dest('dist/scripts'));
});

// Scripts
gulp.task('scripts', ['bundle-scripts']);

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());
});

// CoffeeScript
gulp.task('coffee', function () {
    return gulp.src(
            ['app/scripts/**/*.coffee', '!app/scripts/**/*.js'],
            {base: 'app/scripts'}
        )
        .pipe(
            $.coffee({ bare: true }).on('error', $.util.log)
        )
        .pipe(gulp.dest('app/scripts'));
});

// Scripts
gulp.task('config', function () {
    return gulp.src('app/config/**/*.js')
        .pipe(gulp.dest('dist/config'))
        .pipe($.size());
});

// Jade templates
gulp.task('jade', function () {
    return gulp.src('app/template/*.jade')
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest('dist'));
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
       /* $.imagemin seems to be causing the images to not be copied so i have disabled it --Vlad */
       /* .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))*/
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('jest', function () {
    var nodeModules = path.resolve('./node_modules');
    return gulp.src('app/scripts/**/__tests__')
        .pipe($.jest({
            scriptPreprocessor: nodeModules + '/gulp-jest/preprocessor.js',
            unmockedModulePathPatterns: [nodeModules + '/react']
        }));
});

// Clean
gulp.task('clean', function (cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images', 'config']);

// Default task
gulp.task('default', ['clean', 'build', 'jest' ]);

// Webserver
gulp.task('serve', function () {
    gulp.src('dist')
        .pipe($.webserver({
            host : '0.0.0.0',
            livereload: true,
            port: 9000
        }));
});

// Bower helper
gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('dist/scripts/'));
});

// Watch
gulp.task('watch', function () {
  // Watch .json files
  gulp.watch('app/scripts/**/*.json', ['json']);

  // Watch .html files
  gulp.watch('app/*.html', ['html']);

  // Watch .html files
  gulp.watch('app/config/**/*.js', ['config']);

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .jade files
  gulp.watch('app/template/**/*.jade', ['jade', 'html']);

  // Watch .coffeescript files
  // gulp.watch('app/scripts/**/*.coffee', ['coffee', 'scripts', 'jest' ]);

  // Watch .js files
  // gulp.watch('app/scripts/**/*.js', ['scripts' ]);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);
});

// Main development task
gulp.task('development', ['build', 'watch', 'serve']);
