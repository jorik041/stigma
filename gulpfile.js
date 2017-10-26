const   gulp = require ('gulp'),
        browserSync = require ('browser-sync').create(),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        paths = './app/pug/*.pug',
        autoprefixer = require('gulp-autoprefixer'),
        plumber = require('gulp-plumber'),
        cssGlobbing = require('gulp-css-globbing'),
        svgSprite = require('gulp-svg-sprites'),
        svgmin = require('gulp-svgmin'),
        cheerio = require('gulp-cheerio'),
        replace = require('gulp-replace'),
        sassGlob = require('gulp-sass-glob'),     
        reload = browserSync.reload;

// Compile sass files to css
gulp.task('sass', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sassGlob())  
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(cssGlobbing())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('pug', () => {
  return gulp.src('./app/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: '\t'
    }))
    .pipe(gulp.dest('./app'))
});

gulp.task('browser-sync', ['sass', 'pug'], function() {
    browserSync.init({
        server: {
            baseDir: "app", 
            files: "app/**/*.*"
        }
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'pug'], function() {
  gulp.watch('./app/scss/**/*.scss', ['sass']);
  gulp.watch('./app/pug/**/*.pug', ['pug']);
  gulp.watch(['app/*.html',
              'app/js/*.js',
              'app/css/**/*.css']).on('change', browserSync.reload);
});

gulp.task('svgSpriteBuild', function () {
    return gulp.src('./app/images/icons/*.svg')//указываем откуда брать svg
        // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill and style declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        // cheerio plugin create unnecessary string '>', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
                mode: "symbols",
                preview: false,
                selector: "icon-%f",
                svg: {
                    symbols: 'symbol_sprite.html'
                }
            }
        ))
        .pipe(gulp.dest('./app/images'));
});

// create sass file for our sprite
gulp.task('svgSpriteSass', function () {
	return gulp.src('./app/images/icons/*.svg')
		.pipe(svgSprite({
				preview: false,
				selector: "icon-%f",
				svg: {
					sprite: 'svg_sprite.html'
				},
				cssFile: './_svg_sprite.scss',
				templates: {
					css: require("fs").readFileSync('app/scss/partials/_sprite-template.scss', "utf-8")
				}
			}
		))
		.pipe(gulp.dest( './app/images'));
});

gulp.task('svgSprite', ['svgSpriteBuild', 'svgSpriteSass']);
gulp.task('default', ['browser-sync', 'watch']);
