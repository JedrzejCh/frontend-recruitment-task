const {
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const webpack = require("webpack-stream");
const gulp = require('gulp');
const loader = require('babel-loader')
// File paths
const files = {
  scssPath: 'src/scss/**/*.scss',
  jsPath: 'src/js/**/*.js'
};

function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('dist')); // put final CSS in dist folder
}


function jsTask() {
  return gulp
  .src('./src/js/main.js')
    .pipe(
      webpack({
        output: {
          path: __dirname + '/dist',
          filename: 'all.js'
        },
        module: {
          rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
          }]
        }
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
}


var cbString = new Date().getTime();

function cacheBustTask() {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

function watchTask() {
  watch([files.scssPath, files.jsPath],
    parallel(scssTask, jsTask));
}

exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  watchTask,
);