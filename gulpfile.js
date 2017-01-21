const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('gulp-sequence');
const concat = require('gulp-concat');
const filter = require('gulp-filter');
const del = require('del');

const bower = require('main-bower-files')();
const babel = require('gulp-babel');

const nodemon = require('gulp-nodemon');

// Remove all file

gulp.task('clean', () => {
  del(['public/**/*']);
});

// bower
gulp.task('bower:js', () => {
  return gulp.src(bower)
    .pipe(filter(['**/*.js']))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js'));
});

// html
gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('public'));
});

// scripts
gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      compact: true
    }))
    .pipe(concat('fundraiser.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('public/styles/'));
});

//Watch task
gulp.task('watch',function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.html', ['html']);
});

// images
gulp.task('images', () => {
  return gulp.src(['src/images/*.jpg', 'src/images/*.png', 'src/images/*.gif', 'src/images/*.svg'])
    .pipe(gulp.dest('public/images'));
});

// nodemon
gulp.task('nodemon', () => {
  return nodemon()
    .on('readable', () => {
      this.stdout.on('data', chunk => {
        process.stdout.write(chunk);
      });
    });
});

gulp.task('default', sequence('clean', ['bower:js'], ['scripts', 'styles', 'html', 'images'], 'watch', 'nodemon'));
