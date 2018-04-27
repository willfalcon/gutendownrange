const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const del = require('del');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const streamqueue = require('streamqueue');


/*==============================*/
// CSS TASKS
/*==============================*/

  // SASS/CSS DEVELOPMENT
  //  - Just processes sass.
  //  - Includes sourcemaps and doesn't minify.
gulp.task('dev_styles', () => {
  return streamqueue(
    { objectMode: true },
    gulp.src('assets/scss/cdr.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)),
  )
  .pipe(concat('cdr.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'));
});

  // SASS/CSS PRODUCTION BUILD
gulp.task('styles', () => {
  return streamqueue(
    { objectMode: true },
    gulp.src('assets/scss/cdr.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)),
  )
  .pipe(concat('cdr.css'))
  .pipe(postcss([
    autoprefixer({browsers: ['last 2 versions']}),
  ]))
  // .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'))
  .pipe(postcss([
    cssnano(),
  ]))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'));
});

/*==============================*/
// JAVASCRIPT TASKS
/*==============================*/

gulp.task('dev_scripts',() => {
    // 1) Run entry script file through browserify
  return browserify({
    entries: ['./assets/js/cdr.js'],
    debug: true
  })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('cdr.min.js'))
    .pipe(buffer())
    // 2) Start sourcemaps... I think the 'debug: true' above actually starts it?
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', () => {
    // 1) Run entry script file through browserify
  return browserify({
    entries: ['./assets/js/cdr.js'],
    debug: true
  })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('cdr.js'))
    .pipe(buffer())
      // 2) Start sourcemaps... I think the 'debug: true' above actually starts it?
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
        // 3) Run through babel, uses babel-preset-env, which is set in .babelrc file.
      .pipe(babel())
        // 4) Save that one
      .pipe(gulp.dest('./build/'))
        // 5) Minimize
      .pipe(uglify())
        // 6) Add min suffix
        .pipe(rename({suffix: '.min'}))
      // 7) Write sourcemaps.
    .pipe(sourcemaps.write('./'))
    // Start piping stream to tasks!
      // 8) Save to build directory.
    .pipe(gulp.dest('./build/'));

});


gulp.task('default', () => {
    gulp.start('styles', 'scripts' );
});

gulp.task('watch', () => {

  // Watch .scss files
  gulp.watch('assets/scss/**/*.scss', ['dev_styles']);

  // Watch .js files
  gulp.watch('assets/js/**/*.js', ['dev_scripts']);

});
