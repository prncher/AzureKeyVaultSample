var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = tsc.createProject('tsconfig.json'),
	del = require('del');

var Config = (function () {
    function gulpConfig() {
        this.source = './src/';

        this.tsOutputPath = this.source + '/js';
        this.dist = this.source + '/dist';
        this.allTypeScript = this.source + '/**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
    }
    return gulpConfig;
})();

var config = new Config();

gulp.task('dest-clean', function () {
  return del([
    config.dist,
    config.tsOutputPath
  ]);
});

gulp.task('compile-ts-dest', ['compile-ts'], function () {
    return gulp.src(config.source + '/js/**/*.*')
          .pipe(gulp.dest(config.dist));
});

gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsProject());

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});


gulp.task('default', ['dest-clean', 'compile-ts-dest']);
