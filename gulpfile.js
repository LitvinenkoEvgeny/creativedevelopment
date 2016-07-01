var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  path = require('path'),
  browserSync = require('browser-sync'),
  through2 = require('through2'),
  reload = browserSync.reload,
  browserify = require('browserify'),
  del = require('del'),
  argv = require('yargs').argv,
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  htmlmin = require('gulp-htmlmin');

gulp.task('browser-sync', function () {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('compass', function () {
  return gulp.src('./src/stylesheets/**/*.{scss,sass}')
    .pipe($.plumber())
    .pipe($.compass({
      css: 'dist/stylesheets',
      sass: 'src/stylesheets',
      plugins: ['normalize', 'susy']
    }))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end')
    })
    .pipe(gulp.dest('dist/stylesheets'));
});


// gulp webpack task for js
// maybe use webpack for css ?
gulp.task('js', function (callback) {
  // run webpack
  webpack({
    // configuration
    entry: './src/scripts/main.js',

    output: {
      path: './dist/scripts/',
      filename: 'app.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      // убрать если что то сломается
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  }, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
});

// gulp.task('js', function() {
//   return gulp.src('src/scripts/*.js')
//     .pipe($.plumber())
//     .pipe(through2.obj(function (file, enc, next) {
//       browserify(file.path, { debug: true })
//         .transform(require('babelify'))
//         .transform(require('debowerify'))
//         .bundle(function (err, res) {
//           if (err) { return next(err); }
//           file.contents = res;
//             next(null, file);
//         });
//       }))
//       .on('error', function (error) {
//         console.log(error.stack);
//         this.emit('end')
//     })
//   .pipe( $.rename('app.js'))
//   .pipe( gulp.dest('dist/scripts/'));
// });


gulp.task('clean', function (cb) {
  del('./dist', cb);
});

gulp.task('images', function () {
  return gulp.src('./src/images/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', function () {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe($.plumber())
    .pipe(gulp.dest('dist/'))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end')
    })

});


gulp.task('build', ['compass', 'js', 'templates', 'images']);

gulp.task('serve', ['build', 'browser-sync'], function () {
  gulp.watch('src/stylesheets/**/*.{scss,sass}', ['compass', reload]);
  gulp.watch('src/scripts/**/*.js', ['js', reload]);
  gulp.watch('src/images/**/*', ['images', reload]);
  gulp.watch('src/*.html', ['templates', reload]);
});

gulp.task('default', ['serve']);
