const _ = require('lodash')

function compile (templateHash) {
  return Object.keys(templateHash)
    .map((name) => {
      const value = templateHash[name]
      const isLeaf = _.isString(value)
      const compiled = (isLeaf) ? _.template(value) : compile(value)
      return { name, value: compiled }
    })
    .reduce((compiled, template) => {
      compiled[template.name] = template.value
      return compiled
    }, {})
}

module.exports = compile
