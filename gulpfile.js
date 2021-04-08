const pckg = require('./package.json'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	gulpSync = $.sync(gulp),
	injStr = $.injectString,
	browserSync = require('browser-sync').create();

const packageName = 'Proa Tools Forms';

const paths = {
	src: 'src/',
	dist: 'dist/',
	demo: 'demo/',
	tmp: '.tmp/'
};

const nl = '\n';

gulp.task('del:dist', () => delFolder(paths.dist));

gulp.task('scripts:copy', () => processJs());
gulp.task('scripts:min', () => processJs((stream) => stream.pipe($.ngAnnotate()).pipe($.uglify({output: {comments: '/^!/'}})).pipe($.rename({suffix: '.min'}))));
gulp.task('scripts', ['scripts:copy', 'scripts:min']);

gulp.task('build', gulpSync.sync([
	'del:dist',
	'scripts'
]));

gulp.task('del:tmp', () => delFolder(paths.tmp));
gulp.task('index', ['build'], () => gulp.src(paths.demo+'index.html').pipe($.wiredep({devDependencies: true})).pipe($.useref()).pipe(injStr.replace('{{PACKAGE_NAME}}', packageName)).pipe(gulp.dest(paths.tmp)));
gulp.task('styles', () => gulp.src(paths.src+'less/index.less').pipe(injStr.prepend('// bower:less'+nl+'// endbower'+nl)).pipe($.wiredep()).pipe($.less()).pipe(gulp.dest(paths.tmp+'styles/')));

gulp.task('demo', gulpSync.sync([
	'del:tmp',
	['index', 'styles']
]), () => browserSync.init({server: {baseDir: paths.tmp}}));

gulp.task('default', ['build']);

function delFolder(path) {
	return gulp.src(path, {read: false})
		.pipe($.clean());
}

function processJs(extraProcess) {
	const firstJsFile = 'module.js',
		stream = gulp.src(paths.src+'js/*').pipe($.order([firstJsFile,'!'+firstJsFile])).pipe($.concat(pckg.name+'.js')).pipe(injStr.prepend('/*!'+nl+' * '+packageName+' v'+pckg.version+' ('+pckg.homepage+')'+nl+' */'+nl+nl));
	return (extraProcess?extraProcess(stream):stream).pipe(gulp.dest(paths.dist));
}