var { src, dest, watch, parallel  } = require('gulp');

// html related plugins
var pug = require('gulp-pug');

// CSS related plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// JS related plugins
var uglify = require('gulp-uglify');

// Utility plugins
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

// Local server related plugins
var connect = require('gulp-connect');

function html() {
    return src('src/index.pug')
        .pipe(pug({pretty: true}))
        .pipe(dest('build'))
        .pipe(connect.reload())
}

function css() {
    return src('src/css/sass/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(dest('build/css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest('build/css'))
        .pipe(connect.reload())
}

function js() {
    return src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(dest('build/js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest('build/js'))
        .pipe(connect.reload())
}

function img() {
    return src('src/img/*.*')
        .pipe(imagemin({verbose: true}))
        .pipe(dest('build/img'))
        .pipe(connect.reload())
}

function vendor() {
    return src('src/vendor/*.*')
        .pipe(dest('build/vendor'))
        .pipe(connect.reload())
}

function font() {
    return src('src/webfonts/*.*')
        .pipe(dest('build/webfonts'))
        .pipe(connect.reload())
}

function watcher() {
    watch('src/**/*.pug', html);
    watch(['src/**/*.sass', 'src/**/*.css'], css);
    watch('src/**/*.js', js);
    watch('src/img/**', img);
    watch('src/webfonts/**', font);
    watch('src/vendor/**', vendor);
}

function LiveReload() {
    connect.server({
        root: './build/',
        port: 5000,
        livereload: true
    });
}

exports.default = parallel(LiveReload, watcher);
