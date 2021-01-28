const { src, dest, series, parallel } = require('gulp');
let browserSync = require('browser-sync').create();
let concat = require('gulp-concat');

function build(){
  return browserSync.init({
    server: {
        baseDir:".",
    },
    startPath: "/dist/index.html"
  });
}

function copyHtml() {
  return src([
    'index.html',
  ]).
    pipe(dest('dist/'));
}

function copyJS() {
  return src([
    'src/*.js',
    'src/**/*.js',
  ]).
    pipe(dest('dist/'));
}

function copyImages() {
  return src([
    'src/images/**',
  ]).
    pipe(dest('dist/images'));
}


function copyCSS() {
  return src([
    'src/**/*.css'
  ])
  .pipe(concat('css-styles.css'))
  .pipe(dest('dist/'));
}


exports.serve = series(parallel(copyImages,copyCSS,copyHtml,copyJS),build);