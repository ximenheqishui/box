const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename')
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
let i = 1

const paths = {
    styles: {
        src: ['./**/*.scss','!./_style_/*.scss','!./node_modules/**'],
        dest: './',
        watch: ['./**/*.scss','./_style_/*.scss','!./node_modules/**']
    }
};

function styles(arg) {
    let src = paths.styles.src
    if (typeof arg != 'function') {
        src = arg
    }
    return gulp.src(src)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename((path) => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(rename((path)=> {
            console.log(`${i++}   编译完成文件：${path.dirname}\\${path.basename}.scss`)
        }))
}

/**
 * 文件去重后再去掉编译方式
 * */
function watch() {
    let cssWatcher = gulp.watch(paths.styles.watch);
    cssWatcher.on('all', function (stats, path) {
        if (stats === 'add' || stats === 'change') {
            if (path.indexOf('_style_') >= 0) {
                styles(function(){})
            } else {
                styles(path)
            }
        }
    })
}

const build = gulp.series(styles);

const dev = gulp.series(styles,watch);

exports.default = dev;

exports.build = build;
