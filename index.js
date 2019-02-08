'use strict'

const merge = require('deepmerge')

const uniq = array => [...new Set(array)]
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

//
// DICTIONNARY OF TAGS BY PURPOSE
// http://www.w3.org/TR/SVG/propidx.html
//

var expandedAttributes = {
  'clip*': ['clip', 'clip-path', 'clip-rule'],
  'color*': [
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
  ],
  'fill*': ['fill', 'fill-opacity', 'fill-rule'],
  'font*': [
    'font',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
  ],
  'stroke*': [
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
  ],
}

//
// CLEANING FUNCTIONS
//

function removeComments($) {
  $.root().each(rmComments)
  function rmComments() {
    this.children.forEach(function(child) {
      if (child.type === 'text') return
      if (child.type === 'comment') return $(child).remove()
      if (child.children) return $(child).each(rmComments)
    })
  }
}

function removeEmptyLines($) {
  $.root().each(rmEmptyLines)
  function rmEmptyLines() {
    this.children.forEach(function(child) {
      var next = child.next
      if (child.type === 'text' && next && next.type === 'text') {
        return (child.data = '')
      }
      if (child.children && child.type !== 'style') {
        return $(child).each(rmEmptyLines)
      }
    })
  }
}

// can't select tags with [sketch:type]
function removeSketchType($) {
  $('*')
    .filter(function() {
      return $(this).attr('sketch:type')
    })
    .removeAttr('sketch:type')
}

function removeEmptyGroup($) {
  $('g').each(function() {
    if (!$(this).children().length) $(this).remove()
  })
}

function removeEmptyDefs($) {
  $('defs').each(function() {
    if (!$(this).children().length) $(this).remove()
  })
}

function removeTags($, tags) {
  tags.forEach(function(tag) {
    $(tag).remove()
  })
  return $
}

function removeAttributes($, attributes) {
  attributes.forEach(function(attribute) {
    $(`[${attribute}]`).removeAttr(attribute)
  })
  return $
}

//
// OPTIONS HANDLING
//

var defaultOptions = {
  removeSketchType: true,
  removeEmptyGroup: true,
  removeEmptyDefs: true,
  removeEmptyLines: true,
  removeComments: true,
  tags: ['title', 'desc'],
  attributes: ['id', 'style', 'fill*', 'clip*', 'stroke*'],
}

function expandAttributes(attributes) {
  if (!Array.isArray(attributes)) {
    return defaultOptions.attributes
  }
  let expanded = []
  attributes.forEach(function(attribute) {
    if (expandedAttributes[attribute]) {
      expanded = expanded.concat(expandedAttributes[attribute])
    } else {
      expanded.push(attribute)
    }
  })
  return expanded
}

const mergeOptions = { arrayMerge: overwriteMerge }
module.exports = function clean(options = {}) {
  // https://www.npmjs.com/package/deepmerge#combine-array
  options = merge.all([{}, defaultOptions, options], mergeOptions)
  options.attributes = expandAttributes(options.attributes)
  if (!Array.isArray(options.tags)) options.tags = defaultOptions.tags
  options.attributes = uniq(options.attributes)
  options.tags = uniq(options.tags)

  return {
    run: function($, file, done) {
      if (options.removeComments) removeComments($)
      if (options.removeSketchType) removeSketchType($)
      if (options.removeEmptyGroup) removeEmptyGroup($)
      if (options.removeEmptyDefs) removeEmptyDefs($)
      if (options.tags.length) removeTags($, options.tags)
      if (options.attributes.length) removeAttributes($, options.attributes)
      if (options.removeEmptyLines) removeEmptyLines($)
      done()
    },
    parserOptions: {
      xmlMode: true,
    },
  }
}
