# gulp-vuize

## What is vuize?

Vuize is Vue + ize.

Vuize create .vue file from .js, .css and .html files.

## Example

gulpfile.js:

```
var gulp = require('gulp')
var vuize = require('gulp-vuize')

gulp.task('vuize', function() {
  gulp.src('./components/*.+(js|css|html)')
    .pipe(vuize())
    .dest('./components/')
})
```

tree:

```
.
├─  gulpfile.js
└── components
    ├ egg.js
    ├ egg.css
    ├ egg.html
    └ egg.vue  // output file
```


```
# egg.js
module.exports = {
  data: function() {
    return { title: 'hello egg' }
  }
}

# egg.css
h1 { color: red; }

# egg.html
<h1>{{ title }}</h1>

# egg.vue
<script>
module.exports = {
  data: function() {
    return { title: 'hello egg' }
  }
}
</script>
<style>
h1 { color: red; }
</style>
<template>
<h1>{{ title }}</h1>
</template>
```

## Advanced Example

You can use babel, coffee, less, stylus, sass, b-html, and others with gulp-if

```
var gulp = require('gulp')
var vuize = require('gulp-vuize')
var gulpif = require('gulp-if')
var bHtml = require('gulp-b-html')
var path = require('path')

var isBHtml = function(file) {
  return path.extname(file.path) == 'bhtml'
}

gulp.task('vuize', function() {
  gulp.src('./components/*.+(js|css|bhtml)')
    .pipe(gulpif(isBHtml, bHtml()))
    .pipe(vuize())
    .dest('./components/')
})
```
