var gulp = require('gulp');
var concat = require('gulp-concat');
var less           = require('gulp-less'),
    autoprefixer   = require('gulp-autoprefixer'),
    sourcemaps     = require('gulp-sourcemaps'),
    cleanCSS       = require('gulp-clean-css'),
    uglify         = require('gulp-uglify'),
    watch          = require('gulp-watch');

var DIST_DIR = 'dist';

gulp.task('build-back-end', function () {
    return gulp.src(['./src/back_end/**/**'])
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('compile-html', function () {
    return gulp.src(['./src/public/html/*'])
        .pipe(gulp.dest(DIST_DIR + '/public'));
});

gulp.task('compile-js', function () {
    return gulp.src(['./src/public/js/**/**'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_DIR + '/public/js'));
});

gulp.task('compile-less', function () {
    return gulp.src([
        './src/public/less/**/**'
    ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/public/css/'));
});

gulp.task('img', function(){
    return gulp.src('./src/public/img/**/*.*')
        .pipe(gulp.dest('./dist/public/img/'));
});

gulp.task('libs', function(){
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/materialize/dist/css/materialize.min.css',
        './bower_components/materialize/dist/js/materialize.min.js',
        './src/public/libs/**/*.*'
    ])
        .pipe(gulp.dest('./dist/public/libs'));
});



gulp.task('build-front-end', [
    'compile-html',
    'compile-less',
    'compile-js',
    'img',
    'libs'
]);

gulp.task('build', [
    'build-back-end',
    'build-front-end'
]);

gulp.task('default', [ 'build' ]);

gulp.task('watch', function () {
    return gulp.watch('./src/**/**', ['build']);
});