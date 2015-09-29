'use strict';

//
// DICTIONNARY OF TAGS BY PURPOSE
// http://www.w3.org/TR/SVG/propidx.html
//

var expandedAttributes = {
  'clip*': [
    'clip',
    'clip-path',
    'clip-rule'
  ],
  'color*': [
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering'
  ],
  'fill*': [
    'fill',
    'fill-opacity',
    'fill-rule'
  ],
  'font*': [
    'font',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight'
  ],
  'stroke*': [
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width'
  ]
};

//
// CLEANING FUNCTIONS
//

function removeTags($, tags) {
  tags.forEach(function (tag) {
    $(tag).remove();
  });
  return $;
};

function removeAttributes($, attributes) {
  attributes.forEach(function (attribute) {
    $('[' + attribute + ']').removeAttr(attribute);
  });
  return $;
};

function removeEmptyGroup($) {
  // only optim is to remove empty group
  $s.find('g').each(function () {
    if (!$(this).children().length) $(this).remove();
  });
}

//
// OPTIONS HANDLING
//

var defaultOptions = {
  tags: [
    'title',
    'desc',
  ],
  attributes: [
    'id',
    'style',
    'fill*',
    'clip*',
    'stroke*'
  ],
};

// function expandAttributes(attributes) {
//   if (!_.isArray(attributes) || !attributes.length) {
//     return attributes;
//   }
//   var expanded = [];

//   attributes.forEach(function (attribute) {
//     if (_.has(presets.expandedAttributes, attribute)) {
//       expanded = _.union(expanded, presets.expandedAttributes[attribute]);
//     } else {
//       expanded = _.union(expanded, [attribute]);
//     }
//   });
//   return expanded;
}

module.exports = function clean(options) {
  // if (_.isUndefined(options)) options = {};
  // options = _.merge({}, defaultOptions, options);

  return {
    run: function ($, file, done) {

    },
    parserOptions: {
      xmlMode: true
    }
  };
}