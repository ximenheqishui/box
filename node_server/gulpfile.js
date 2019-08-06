/**
 *  这个gulp就不和服务器一起启动了，这是做scss和js的编译工作
 * */
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const named = require('vinyl-named');
const uglify = require('gulp-uglify');
const del = require('del');

const paths = {
    styles: {
        src: ['src/styles/**/*.scss','!src/styles/__common__/**'],
        dest: 'public/css/'
    },
    scripts: {
        src: ['src/scripts/**/*.js','!src/scripts/__common__/**'],
        dest: 'public/js/'
    }
};

function clean() {
    return del([ paths.styles.dest, paths.scripts.dest]);
}

function styles(src) {
    return gulp.src(typeof src === "function" ? paths.styles.src : src)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts(src) {
    return gulp.src(typeof src === "function" ? paths.scripts.src : src , {
        sourcemaps: true
    })
        .pipe(babel())
        .pipe(uglify())
        .pipe(named())
        .pipe(webpack({
            mode: 'production'
        }))
        .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * 文件去重后再去掉编译方式
 * */
function watch() {
    let cssWatcher = gulp.watch(paths.styles.src[0]);
    cssWatcher.on('all',function(stats,path){
        if (stats === 'add' || stats === 'change'){
            if (path.indexOf('__common__')){
                styles(function(){})
            } else {
                styles(path)
            }
        }
    })
    let jsWatcher =  gulp.watch(paths.scripts.src[0]);
    jsWatcher.on('all',function(stats,path){
        if (stats === 'add' || stats === 'change'){
            if (path.indexOf('__common__')){
                scripts(function(){})
            }else{
                scripts(path)
            }
        }
    })
}


const build = gulp.series(clean, gulp.parallel(styles,scripts));

const dev = gulp.series(clean, gulp.parallel(styles,scripts),watch);

exports.default = dev;

exports.build = build;
