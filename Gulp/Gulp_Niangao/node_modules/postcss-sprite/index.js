const { resolve, join, basename } = require('path')
const { promisify } = require('util')
const fse = require('fs-extra')
const crypto = require('crypto')
const spritesmith = promisify(require('spritesmith').run)

const postcss = require('postcss')

function isdelProp(prop) {
  return !!~[
    'width',
    'height',
    'background-size',
    'background-position'
  ].indexOf(prop)
}

function getUrl(url) {
  try {
    url = url.match(/url\((?:['"])?([^\)'"]+)(?:['"])?\)/)[1]
  } catch (e) {}

  return url
}

function getDpr(url) {
  let dpr
  try {
    dpr = url.match(/@(\d)x/)[1]
  } catch (e) {}
  return dpr
}

module.exports = postcss.plugin('postcss-sprite', (options = {}) => {
  let {
    baseSize = 16,
    filename = 'sprite.png',
    source = './',
    output = './',
    filter = () => true,
    replaceUrl,
    spritesmithOptions = {},
    revision = true
  } = options

  output = join(output, filename)
  replaceUrl || (replaceUrl = url => url.replace(basename(url), filename))

  return root => {
    let rules = []
    let src = []
    root.walkRules(rule => {
      rule.walkDecls(/background-image/, decl => {
        // 提取图片 url
        let url = getUrl(decl.value)
        if (!filter(url)) {
          return
        }

        if (src.indexOf(url) == -1) {
          // 去重复
          src.push(url)
        }
        rules.push(rule)
      })
    })

    if (src.length == 0) {
      return
    }

    return spritesmith(
      Object.assign(
        {
          src: src.map(url => resolve(source, url))
        },
        spritesmithOptions
      )
    )
      .then(async result => {
        let rev = crypto.createHash('md5')
        rev.update(result.image)
        await fse.outputFile(output, result.image)
        return {
          rev: rev.digest('hex').slice(0, 10),
          coordinates: result.coordinates,
          properties: result.properties
        }
      })
      .then(async result => {
        let { coordinates, properties, rev } = result

        // 先删除
        rules.forEach(rule => {
          rule.walkDecls(decl => {
            let prop = decl.prop
            if (isdelProp(prop)) {
              decl.remove()
            }
          })
        })

        // 在添加
        rules.forEach(rule => {
          rule.walkDecls(decl => {
            let prop = decl.prop
            if (prop != 'background-image') {
              return
            }

            let url = decl.value
            let dpr = getDpr(url)
            let { width, height } = properties
            let { width: w, height: h, x, y } = coordinates[
              resolve(source, getUrl(url))
            ]

            let unit = 'px'

            if (dpr) {
              let size = dpr * baseSize
              unit = 'rem'
              w /= size
              h /= size
              x /= size
              y /= size
              width /= size
              height /= size
            }

            let _url = replaceUrl(getUrl(url))

            if (revision) {
              _url += `?v=${rev}`
            }

            decl.value = `url("${_url}")`

            rule
              .insertAfter(0, {
                prop: 'width',
                value: `${w}${unit}`
              })
              .insertAfter(1, {
                prop: 'height',
                value: `${h}${unit}`
              })
              .insertAfter(2, {
                prop: 'background-position',
                value: `${-x}${unit} ${-y}${unit}`
              })
              .insertAfter(3, {
                prop: 'background-size',
                value: `${width}${unit} auto`
              })
          })
        })
      })
  }
})
