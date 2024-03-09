const gulp = require('gulp');
const babel = require('gulp-babel');

function build() {
    return gulp.src('index.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('dist'));
}

exports.default = build;
