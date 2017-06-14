const sourceDir = './src';
const buildDir = './build';

const Del = require('del');
const Gulp = require('gulp');
const GExport = require('gulp-export');
const Babel = require('gulp-babel');

Gulp.task('clean', cb => Del([buildDir], cb));

Gulp.task('js-compile', ['clean'], () => Gulp.src([`${sourceDir}/**/*.js*`])
        .pipe(GExport({
          context: './src',
          filename: 'index.js',
        }))
        .pipe(Babel())
        .pipe(Gulp.dest(buildDir)));

Gulp.task('files-copy', ['clean'], () => Gulp.src(['./package.json', './README.md'])
        .pipe(Gulp.dest(buildDir)));

Gulp.task('default', ['clean', 'js-compile', 'files-copy']);
