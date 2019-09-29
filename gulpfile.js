var { src, dest, watch, parallel, series } = require('gulp');

// html related plugins
var pug = require('gulp-pug');

// CSS related plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var uncss = require('postcss-uncss');
var cssnano = require('gulp-cssnano');
var plugins = [
    uncss({
        html: ['build/index.html'],
        ignore : [/\.active/],
        timeout: 1000
    })
];

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
        .pipe(dest('build/'))
        .pipe(connect.reload())
}

function css() {
    return src('src/css/sass/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('./map'))
        .pipe(dest('build/css/'))
        .pipe(connect.reload())
}

function allcss() {
    return src(['build/css/main.css', 'build/vendor/css/*.css'])
        .pipe(concat('all.min.css'))
        .pipe(postcss(plugins))
        .pipe(cssnano())
        .pipe(dest('build/css/'))
        .pipe(connect.reload())
}

function js() {
    return src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(dest('build/js/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./map'))
        .pipe(dest('build/js/'))
        .pipe(connect.reload())
}

function img() {
    return src('src/img/*.*')
        .pipe(imagemin({verbose: true}))
        .pipe(dest('build/img/'))
        .pipe(connect.reload())
}

function favicon() {
    return src('build/img/favicon.ico')
        .pipe(dest('build/'))
        .pipe(connect.reload())
}

function vendor() {
    return src('src/vendor/**')
        .pipe(dest('build/vendor/'))
        .pipe(connect.reload())
}

function font() {
    return src('src/webfonts/*.*')
        .pipe(dest('build/webfonts/'))
        .pipe(connect.reload())
}

function watcher(done) {
    watch('src/**/*.pug', html);
    watch('src/**/*.sass', css);
    watch('src/**/*.js', js);
    watch('src/img/**', img);
    watch('build/img/favicon.ico', favicon);
    watch('src/webfonts/**', font);
    watch('src/vendor/**', vendor);
    done();
}

function LiveReload(done) {
    connect.server({
        root: './build/',
        port: 5000,
        livereload: true
    });
    done();
}

exports.default = parallel(LiveReload, watcher);
exports.html = html;
exports.css = series(css, allcss);
exports.js = js;
exports.img = img;
exports.favicon = favicon;
exports.font = font;
exports.vendor = vendor;
exports.all = series(html, js, css, img, favicon, font, vendor);