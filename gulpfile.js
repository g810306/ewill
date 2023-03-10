const { src, dest, series, parallel, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");

exports.prefixer = () =>
  src("./output/css/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(dest("./output/css/prefixer/"));

// function defaultTask(cb) {
//     console.log("gulp 4 成功");
//     cb();
//   }

//exports.do = defaultTask;  //do可自己命名

function TaskA(cb) {
  console.log("A");
  cb();
}

function TaskB(cb) {
  console.log("B");
  cb();
}
function TaskC(cb) {
  console.log("C");
  cb();
}
function TaskD(cb) {
  console.log("D");
  cb();
}
function TaskE(cb) {
  console.log("E");
  cb();
}

// a -> b
exports.async = series(TaskA, TaskB);
// c, d -> finish
exports.sync = parallel(TaskC, TaskD);
// a -> b -> c, d -> e
exports.all = series(TaskA, TaskB, parallel(TaskC, TaskD), TaskE);

// src dest
function move() {
  return src("src/index.html").pipe(dest("dist"));
}

exports.m = move;

// 清除舊檔案
const clean = require("gulp-clean");

function clear() {
  return src("dist", { read: false, allowEmpty: true }) //不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
    .pipe(clean({ force: true })); //強制刪除檔案
}

exports.c = clear

/*
npm install gulp-rename --save-dev
npm install gulp-uglify --save-dev
npm install gulp-clean-css --save-dev
*/
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
// css minify
function cssminify() {
  return src("src/css/style.css").pipe(cleanCSS()).pipe(dest("dist/css"));
}
exports.cssm = cssminify;

// js minify
function jsmini() {
  return src("src/js/*.js").pipe(uglify()).pipe(dest("dist/js"));
}
exports.js = jsmini;

// sass complier
// 指令npm install sass gulp-sass --save-dev
const sass = require("gulp-sass")(require("sass"));

// 沒壓縮css

function sassStyle() {
  return src("src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError)) // sass -> css
    .pipe(sourcemaps.write())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(dest("./output/css/prefixer/"))
    .pipe(dest("dist/css"));
}

// 有壓縮
function sassStyleMini() {
  return src("src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError)) // sass -> css
    .pipe(sourcemaps.write())
    .pipe(cleanCSS()) // minify css
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(dest("./output/css/prefixer/"))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest("dist/css"));
}
exports.styleMini = sassStyleMini;
exports.style = sassStyle;

// html template
const fileinclude = require("gulp-file-include");

function html() {
  return src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest("dist/"));
}

exports.template = html;

// 打包圖片
function img() {
  return src("src/images/*.*").pipe(dest("dist/images"));
}

exports.images = img;

function imgmini() {
  return src("src/images/*.*")
    .pipe(imagemin([imagemin.mozjpeg({ quality: 75, progressive: true })])) //壓縮品質(quality越低 -> 壓縮越大 -> 品質越差)
    .pipe(dest("dist/images/mini"));
}

exports.minifyimg = imgmini;

// 監看所有變動
function watchfile() {
  watch(["src/*.html", "src/layout/*.html"], html);
  watch(["src/sass/*.style", "src/sass/**/*.scss"], sassStyle);
  watch("src/js/*.js", jsmini);
  watch(["src/images/*.*", "src/images/**/*.*"], img);
}
exports.w = watchfile;

// 打包上線用
// exports.package = parallel(html, sassStyleMini, jsmini, img);

// 開發用
exports.default = series(parallel(html, sassStyle , jsmini , img), browser);
// 打包上線前先清除檔案
exports.package = series( clear,parallel(html, sassStyleMini, babel5, imgmini));

// 瀏覽器
const browserSync = require("browser-sync");
const reload = browserSync.reload;

function browser(done) {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "index.html",
    },
    port: 3000,
  });

  watch(["src/*.html", "src/layout/*.html"], html).on("change", reload);
  watch(["src/sass/*.style", "src/sass/**/*.scss"], sassStyle).on(
    "change",
    reload
  );
  watch("src/js/*.js", jsmini).on("change", reload);
  watch(["src/images/*.*", "src/images/**/*.*"], img).on("change", reload);

  done();
}

//開發用
exports.browser = browser;

// js es6 -> es5
const babel = require("gulp-babel");
function babel5() {
  return src("src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      }))
    .pipe(uglify())
    .pipe(dest("dist/js"));
}

exports.es5 = babel5;
