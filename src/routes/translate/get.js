/**
 * @swagger
 * path:
 *  /translate/{language}:
 *    get:
 *      summary: Translate signed to spoken language
 *      tags: [Translate]
 *      parameters:
 *        - in: path
 *          name: language
 *          schema:
 *            type: string
 *          required: true
 *          description: Signed language
 *        - in: query
 *          name: text
 *          description: Text written in signed language
 *          required: true
 *          type: string
 *      responses:
 *        "200":
 *          description: Text written in spoken language
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Translation'
 */

const joi = require('joi')
const translations = require('src/controllers/translations')
const BadRequestError = require('src/errors/bad-request')

const schema = joi.object({
  params: {
    language: joi.string().required()
  },
  query: {
    text: joi.string().required()
  }
}).unknown(true)

module.exports = (req, res, next) => {
  const { error, value } = schema.validate(req)

  if (error) throw new BadRequestError(error.message)

  translations.retrieve(value.params.language, sanitize(value.query.text))
    .then(response => {
      res.locals = response
      next(null, req, res)
    })
    .catch(error => next(error))
}

function sanitize (text) {
  return text.replace(/['"]+/g, '')
}
