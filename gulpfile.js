var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('mocha', function(){
  var options = { 
    reporter: 'nyan',
    captureFile: false,
    quiet: false,
    clearRequireCache: false
  };
  return gulp.src('test/**/*.js', {read: false})
    .pipe(mocha(options));
});

gulp.task('lint', function(){
  var options = {
  "node": true,
  "globals": {
    "describe": true,
    "it": true,
    "before": true,
    "after": true,
    "beforeEach": true,
    "afterEach": true
    }
  };
  gulp.src(['./*.js', 'lib/*.js', 'test/*.js']).pipe(jshint(options)).pipe(jshint.reporter(stylish)); 
});

gulp.task('test', ['lint', 'mocha']);
gulp.task('default', ['test']);
