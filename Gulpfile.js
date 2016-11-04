const gulp = require('gulp-help')(require('gulp'));
const argv = require('yargs').argv;
const clean = require('gulp-clean');
const gutil = require('gulp-util');
const stripDebug = require('gulp-strip-debug');
const concat = require('gulp-concat-util');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const builder = require('gulp-nw-builder');
const NwBuilder = require('nw-builder');
const debug = require('gulp-debug');
const exec = require('gulp-exec');
const eol = require('os').EOL;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const zip = require('gulp-zip');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const sdkConfig = require('./config/sdk-config.json');


gulp.task('clean-dist', 'Limpar pasta /dist', function() {

	gulp.src('./dist')
	.pipe(clean({force: true}));

});

gulp.task('unify-files', 'Unificar arquivos (destino:/dist/dist.js)',['clean-dist'], function() {

	var exec = require('gulp-exec');
	var options = {
	    continueOnError: false, // default = false, true means don't emit error event 
	    pipeStdout: false, // default = false, true means stdout is written to file.contents 
	    customTemplatingThing: "test" // content passed to gutil.template() 
	};
	var reportOptions = {
	  	err: true, // default = true, false means don't write err 
	  	stderr: true, // default = true, false means don't write stderr 
	  	stdout: true // default = true, false means don't write stdout 
	}


	return gulp.src([

			// UTIL MODULE
			'./app/util/util-module.js',
			'./app/util/util-nwjs-service.js',
			'./app/util/util-trace-service.js',
			'./app/util/util-service.js',
			'./app/util/util-file-service.js',
			'./app/util/util-spinner-directive.js',
			// APP
			'./app/mapa-sismologico.js',
                        './app/loading/loading-controller.js',
                        './app/loading/slider-service.js'
			//'./app/loading/modal-check-version-controller.js',
			
			//'./app/loading/check-version-service.js',
			//'./app/loading/call-app-service.js',	
			
					 

		]) 
		.pipe(concat('./dist', {newLine: eol, process: function(src, filePath) { 
	      // if you need the filename, example `myFileJs.js`, path.basename( filePath, '.js' ) 
	      return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); 
	    }})) 
	    .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
	    .pipe(concat.footer('\n})(window, document);\n'))
	    .pipe(stripDebug())	
		.pipe(rename('dist.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(exec(sdkConfig.sdkCompiler +' ./dist/dist.js ./dist.bin', options))
    	.pipe(exec.reporter(reportOptions)); 



});

gulp.task('watch', 'Monitorar arquivos modificados', ['unify-files'], function() {
  gulp.watch(['app/**/*'], ['unify-files']);
  gutil.log('Listening Files...');
});


// ### DEPLOY #####################################################

var deploy_tmp_folder = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15);
var out = 'deploy/'+deploy_tmp_folder;

function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

gulp.task('clean-deploy-init', 'Limpar pastas temporárias /deploy/*{tmp}', function () {
  return gulp.src(['./deploy'])
   .pipe(clean({force: true}))
  .pipe(clean());
});

gulp.task('copy-deploy', 'Copiar arquivos para pasta deploy/{tmp}', ['clean-deploy-init'], function () {
	
	// CREATE TEMPORARY FOLDER
	mkdirp(out, function (err) {
    	if (err) console.error(err)    	
    	copyFolderRecursiveSync('./assets/',out);
    	copyFolderRecursiveSync('./node_modules/',out);
    	copyFolderRecursiveSync('./views/',out);
    	copyFileSync('dist.bin',out);
    	copyFileSync('icon.png',out);
    	copyFileSync('package.json',out);
    	copyFileSync('index.html',out);
	});
           
});

gulp.task('generate-nw', 'Gerar arquivo nw(destino:/deploy/downloader.nw)', ['unify-files', 'copy-deploy'], function () {
	
	gutil.log('Hey man, lets drink a milk shake and hold on...');

	return gulp.src(out+'/**/*')
		.pipe(zip('downloader.nw'))
		.pipe(gulp.dest('./deploy/'));
});

gulp.task('deploy', 'Deploy app', ['generate-nw'], function() {
  gutil.log('Gerando downloader.nw');
});



gulp.task('default', 'Limpar e Monitorar arquivos modificados',['clean-dist', 'watch']);