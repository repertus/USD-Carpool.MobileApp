var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

gulp.task('inject', function() {
    var sources = gulp.src('./www/index.html');
    return gulp.src('./www/index.html')
          .pipe(wiredep({
               directory: './www/lib',
               // devDependencies: true,
              exclude: ['/angular/', 'angular-animate', 'angular-mocks', 'angular-resource','angular-sanitize', 'angular-ui-router', 'firebase']
            }))
          .pipe(inject(gulp.src(paths.javascript, {read: false}), {relative: true}))
          .pipe(gulp.dest('./www'))
          .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
          .pipe(gulp.dest('./www'));
});

var paths = {
  sass: ['./scss/**/*.scss'],
  javascript: ['./www/app/**/*.module.js', './www/app/**/*.js'],
  css: ['./www/css/**/*.css']
};

gulp.task('default', ['sass', 'inject']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch([paths.javascript, paths.css], ['inject']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
