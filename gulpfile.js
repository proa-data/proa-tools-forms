const pckg = require('./bower.json'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	gulpSync = $.sync(gulp),
	browserSync = require('browser-sync').create();

const packageName = 'Proa Tools Forms';

const paths = {
	src: 'src/',
	dist: 'dist/',
	demo: 'demo/',
	tmp: '.tmp/'
};

gulp.task('del:dist', () => delFolder(paths.dist));

gulp.task('scripts:copy', () => processJs());
gulp.task('scripts:min', () => processJs((stream) => stream.pipe($.ngAnnotate()).pipe($.uglify()).pipe($.rename({suffix: '.min'}))));
gulp.task('scripts', ['scripts:copy', 'scripts:min']);

gulp.task('build', gulpSync.sync([
	'del:dist',
	'scripts'
]));

gulp.task('del:tmp', () => delFolder(paths.tmp));
gulp.task('index', ['build'], () => gulp.src(paths.demo+'index.html').pipe($.wiredep({devDependencies: true})).pipe($.useref()).pipe($.injectString.replace('{{PACKAGE_NAME}}', packageName)).pipe(gulp.dest(paths.tmp)));

gulp.task('demo', gulpSync.sync([
	'del:tmp',
	'index'
]), () => browserSync.init({server: {baseDir: paths.tmp}}));

gulp.task('default', ['build']);

function delFolder(path) {
	return gulp.src(path, {read: false})
		.pipe($.clean());
}

function processJs(extraProcess) {
	const firstJsFile = 'module.js',
		nl = '\n',
		stream = gulp.src(paths.src+'*.js').pipe($.order([firstJsFile,'!'+firstJsFile])).pipe($.concat(pckg.name+'.js')).pipe($.injectString.prepend('/*!'+nl+' * '+packageName+' v'+pckg.version+' ('+pckg.homepage+')'+nl+' */'+nl+nl));
	return (extraProcess?extraProcess(stream):stream).pipe(gulp.dest(paths.dist));
}