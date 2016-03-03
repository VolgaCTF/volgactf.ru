var gulp = require("gulp"),
    less = require("gulp-less"),
    gulpUtils = require("gulp-util"),
    concat = require("gulp-concat"),
    htmlmin = require("gulp-htmlmin"),
    csso = require("gulp-csso");


var makeOnError = function (module) {
    return function (err) {
        gulpUtils.log(gulpUtils.colors.red("ERROR", module), err);
        this.emit("end", new gulpUtils.PluginError(module, err, {showStack: true}));
    }
};

gulp.task('default', ["build-css", "copy-bower", 'concat', "copy-image", "copy-fonts", "copy-html"]);

gulp.task('copy-bower', function () {
    return gulp.src("bower_components/bootstrap/dist/css/bootstrap.css")
        .pipe(gulp.dest('css'));
});

gulp.task('build-css', function () {
    return gulp.src('less/main.less')
        .pipe(less().on('error', makeOnError("build-css")))
        .pipe(gulp.dest('css'))
});

gulp.task('concat', function () {
    return gulp.src('css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(csso(false))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copy-image', function () {
    return gulp.src('img/**')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('fonts/**')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('copy-html', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch('less/*.less', ["build-css"]);
});

