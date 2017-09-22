//引入gulp
var gulp = require('gulp');
/*
 * gulp.src:来源
 * gulp.dest:目标
 * gulp.pipe：管道
 * gulp.watch：检测文件系统
 * gulp.task：任务
 */
//引入组件
var plugins = require('gulp-load-plugins');
var jshint = require('gulp-jshint');//代码检查
//var sass = require('gulp-sass');//sass编译
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩
var plugins = require('gulp-load-plugins');
var rename = require('gulp-rename');//重命名
var replace = require('gulp-replace');//替换
var minifycss = require('gulp-minify-css');//css压缩
var bom = require('gulp-bom');
var utf8 = require('gulp-utf8-convert');
var fs = require('fs');

//案例
gulp.task('scripts',function(){
	gulp.src('src/js/*.js')
		.pipe(utf8())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('all.mini.js'))
		.pipe(uglify())
		.pipe(bom())
		.pipe(gulp.dest('./dist'));
});
gulp.task('default',function(){
	gulp.run('scripts');//多个任务，分开
	gulp.watch('src/js/*.js',function(){
		gulp.run('scripts');
	});
});

gulp.task('leafletjs',function(){
	gulp.src([
			'core/leaflet/leaflet.js',
			'core/leaflet/plugins/**/*.js'
		])
		.pipe(utf8())
		.pipe(concat('leaflet.all.js'))
		.pipe(gulp.dest('core/leaflet'))
		.pipe(rename('leaflet.all.mini.js'))
		.pipe(uglify())
		.pipe(bom())
		.pipe(gulp.dest('core/leaflet'));
});

gulp.task('test',function(){
	gulp.src([
			'test/src/*.js'
		])
		.pipe(utf8())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('test/build'))
		.pipe(rename('min.js'))
		.pipe(uglify())
		.pipe(bom())
		.pipe(gulp.dest('test/build'));
});

gulp.task('leafletcss',function(){
	gulp.src([
	    	'core/leaflet/leaflet.css',
	        'core/leaflet/plugins/**/*.css'
	    ])
		.pipe(utf8())
		.pipe(concat('leaflet.all.css'))
		.pipe(gulp.dest('core/leaflet'))
		.pipe(rename('leaflet.all.mini.css'))
		.pipe(minifycss())
		.pipe(bom())
		.pipe(gulp.dest('core/leaflet'));
});

gulp.task('leaflet',function(){
	gulp.run('leafletjs');
	gulp.run('leafletcss');
});

gulp.task('modules-arithmetic-engine',function(){
	gulp.src([
			'modules/arithmetic-engine/Constants.js',
			'modules/arithmetic-engine/Line.js',
			'modules/arithmetic-engine/MercatorPoint.js',
			'modules/arithmetic-engine/PointUtils.js',
			'modules/arithmetic-engine/ArithmeticEngine.js',
			'modules/arithmetic-engine/main.js',
		])
		.pipe(utf8())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('modules/arithmetic-engine/build'))
		.pipe(rename('all.mini.js'))
		.pipe(uglify())
		.pipe(bom())
		.pipe(gulp.dest('modules/arithmetic-engine/build'));
});

gulp.task('modules-search-engine',function(){
	gulp.src([
			'modules/search-engine/UIController.js',
			'modules/search-engine/SearchEngineCore.js',
			'modules/search-engine/PagePanelController.js',
			'modules/search-engine/SearchEngineController.js',
			'modules/search-engine/main.js',
		])
		.pipe(utf8())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('modules/search-engine/build'))
		.pipe(rename('all.mini.js'))
		.pipe(uglify())
		.pipe(bom())
		.pipe(gulp.dest('modules/search-engine/build'));
});

gulp.task('modules',function(){
	fs.readdir('modules',function(err,files){
		if (err) {
			console.log(err);
			return;
		}
		files.forEach(function(file){
			fs.exists('modules/' + file + '/core', function(exists){
				
				if (!exists) {
					return;
				}
				console.log('build ' + file);
				
				gulp.src([
							'modules/' + file + '/deps/*',
							'modules/' + file + '/core/*',
							'modules/' + file + '/main.js',
						])
						.pipe(utf8())
						.pipe(concat('all.js'))
						.pipe(gulp.dest('modules/' + file + '/build'))
						.pipe(rename('all.mini.js'))
						.pipe(uglify())
						.pipe(bom())
						.pipe(gulp.dest('modules/' + file + '/build'));
			});
		});
	});
});