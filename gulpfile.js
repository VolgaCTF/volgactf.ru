var gulp = require("gulp"),
    less = require("gulp-less"),
    gulpUtils = require("gulp-util"),
    i18n = require('gulp-i18n-localize');


var makeOnError = function (module) {
    return function (err) {
        gulpUtils.log(gulpUtils.colors.red("ERROR", module), err);
        this.emit("end", new gulpUtils.PluginError(module, err, {showStack: true}));
    }
};

gulp.task('default', ["build-css", "copy-bower", "copy-image", "localize"]);

gulp.task('copy-bower', function () {
    return gulp.src("bower_components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-image', function () {
    return gulp.src('img/*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('build-css', function () {
    return gulp.src('less/*.less')
        .pipe(less().on('error', makeOnError("build-css")))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('localize', function () {
    return gulp.src('./index.html')
        .pipe(i18n({
            localeDir: './locales'
        }))
        .pipe(gulp.dest('local'));
});

gulp.task('watch', function () {
    gulp.watch('less/*.less', ["build-css"]);
});

