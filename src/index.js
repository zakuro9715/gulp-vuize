import gutil from 'gulp-util'
import through from 'through2'
import path from 'path'

require('babel/polyfill')

const pluginName = 'gulp-vuize'

export default function() {
  const components = new Map()
    
  function detectKind(ext) {
    switch (ext)
    {
      case '.js':
        return 'script'
      case '.css':
        return 'style'
      case '.html':
        return 'template'
      default:
        return null
    }
  } 
    
  function transform(file, encoding, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError(pluginName, 'Streaming not supported'))
    }
    
    const kind = detectKind(path.extname(file.path))
    if (kind === null) {
      return cb(null, file)
    }
    const componentName = gutil.replaceExtension(file.path, '.vue')
    if (!components.has(componentName)) {
      components.set(componentName, new Map())
    }
    components.get(componentName).set(kind, file.contents.toString(encoding))

    return cb(null, file)
  }

  function flush(cb) {
    for (const [path, component] of components) {
      const elements = Array.from(component.entries()).map(v => {
        const kind = v[0], text = v[1]
        console.log(kind, text)
        return `<${kind}>${text}</${kind}>`
      }) 
      this.push(new gutil.File({
        path: path,
        contents: new Buffer(elements.join(''))
      }))
    }
  }
  
  return through.obj(transform, flush)
};
