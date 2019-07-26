var gulp = require("gulp");
var rimraf = require("rimraf");
var merge = require("merge-stream")

var deps = {
    "font-awesome": {
        "**/*":""
    }
}


gulp.task('clean', function (cb) {
  rimraf("wwwroot/lib/", cb);
});

gulp.task('scripts', function () {
    var streams = [];
    for (var prop in deps) {
        console.log("Prepping scripts for " + prop);
        for (var itemProp in deps[prop]) {
            streams.push(gulp.src("ClientApp/node_modules/" + prop + "/" + itemProp)
                .pipe(gulp.dest("wwwroot/lib/" + prop + "/" + deps[prop][itemProp])));
        }
    }
    return merge(streams);
});
