const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp
    .src('src/styles/smooth.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('watch', ['js', 'sass'], () => {
  gulp.watch('src/**/*.js', ['js'], browserSync.reload);
  gulp.watch('src/**/*.html', ['html'], browserSync.reload);
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('serve', ['watch'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});
