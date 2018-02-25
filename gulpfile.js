let
	gulp             = require('gulp'),
	gulpMultiProcess = require('gulp-multi-process'),
	sass             = require('gulp-sass'),
	browserSync      = require('browser-sync').create(),
	pug              = require('gulp-pug'),
	rename           = require('gulp-rename'),
	watch            = require('gulp-watch'),
	reload           = browserSync.reload,
	concat           = require('gulp-concat'),
	templateCache    = require('gulp-angular-templatecache'),
	gulpif           = require('gulp-if'),
	uglify           = require('gulp-uglify'),
	cleanCSS         = require('gulp-clean-css'),
	clean            = require('gulp-clean');
// app
gulp.task('app-sass-css', function () {
	return new Promise(function (resolve) {
		gulp.src(['./work_place/models/main/main.scss'])
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./work_place/temp/wallet/css/'))
			.on('end', resolve);
	}).then(function () {
		gulp.src([
			'./node_modules/font-awesome/css/font-awesome.css',
			'./node_modules/angular-material/angular-material.css',
			'./work_place/temp/wallet/css/**/**.css'
		])
			.pipe(concat('index.css'))
			.pipe(gulp.dest('./www'))
			.pipe(browserSync.stream());
	})
});
gulp.task('app-pug-html-js', function () {
	return new Promise(function (resolve) {
		gulp.src('./work_place/models/main/main.pug')
			.pipe(pug())
			.pipe(rename('index.html'))
			.pipe(gulp.dest('./www'))
			.on('end', resolve);
	}).then(function () {
		return new Promise(function (resolve) {
			gulp.src(['./work_place/models/**/**.pug'])
				.pipe(pug())
				.pipe(gulp.dest('./work_place/temp/wallet/html/'))
				.on('end', resolve);
		})
	}).then(function () {
		return new Promise(function (resolve) {
			gulp.src(['./work_place/temp/wallet/html/**/**.html'])
				.pipe(templateCache())
				.pipe(gulp.dest('./work_place/temp/wallet/templates/'))
				.on('end', resolve);
		});
	})
});
gulp.task('app-js', ['app-pug-html-js'], function () {
	return gulp.src([
		'./node_modules/angular/angular.js',
		'./node_modules/angular-animate/angular-animate.js',
		'./node_modules/angular-aria/angular-aria.js',
		'./node_modules/angular-messages/angular-messages.js',
		'./node_modules/angular-material/angular-material.js',
		'./node_modules/@uirouter/angularjs/release/angular-ui-router.js',
		'./node_modules/sjcl/sjcl.js',
		'./node_modules/qrcode/build/qrcode.js',
		'./node_modules/iota.lib.js/dist/iota.js',
		'./node_modules/jquery/dist/jquery.js',
		'./work_place/tools/main.js',
		'./work_place/tools/directives/**/**.js',
		'./work_place/tools/services/**/**.js',
		'./work_place/models/main/main.js',
		'./work_place/models/**/**.js',
		'./work_place/temp/wallet/templates/templates.js',
		'./work_place/temp/wallet/sections/**/**.js'
	])
		.pipe(concat('index.js'))
		.pipe(gulp.dest('./www'));
});
gulp.task('build-app', ['app-sass-css', 'app-js']);
// other
gulp.task('delete-old-files', function () {
	return gulp.src('./www', {read: false})
		.pipe(clean());
});
gulp.task('copy-and-compress-resources', ['delete-old-files'], function () {
	gulp.src('./work_place/images/**/**')
		.pipe(gulp.dest('./www/images/'));
	gulp.src('./node_modules/font-awesome/fonts/**/**')
		.pipe(gulp.dest('./www/fonts/'));
	gulp.src('./work_place/workers/**/**')
		.pipe(gulp.dest('./www/workers/'));
	gulp.src('./work_place/texts/**/**')
		.pipe(gulp.dest('./www/texts/'));
});
gulp.task('build', ['copy-and-compress-resources'], function (cb) {
	return gulpMultiProcess(['build-app'], cb, true);
});
gulp.task('watch', ['build'], function () {
	watch('./work_place/models/**/**.scss', function () {
		gulp.start('app-sass-css');
	});
	watch([
		'./work_place/models/**/**.js',
		'./work_place/models/**/**.pug'
	], async function () {
		await gulp.start('app-js');
	});
	watch([
		'./www/**/**'
	], async function () {
		browserSync.reload();
	});
});
gulp.task('browser-sync', ['watch'], function () {
	browserSync.init({
		server: {
			baseDir: "./www/"
		}
	});
});
gulp.task('default', ['browser-sync']);