const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('babelify');
const browserify = require('browserify')
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const minify = require('gulp-minifier');

gulp.task('scss', () => {
  return gulp.src('./scss/**')
  .pipe(sass().on('error', sass.logError))
  .on('error', swallowError)
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream())

});

gulp.task('es6', () => {
  browserify('js/main.js')
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .pipe(source('main.js'))
    .on('error', swallowError)
    .pipe(buffer())
    .pipe(gulp.dest('build'));
});

gulp.task('serve', () => {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./scss/**", ['scss']);
    gulp.watch("./js/**", ['es6']);
    gulp.watch("/*.html").on('change', browserSync.reload);

});

gulp.task('build', function() {
  return gulp.src('src/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('dist'));
});

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task('default', ['serve'], () => {

});
