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
require('dotenv').config()

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
      const allowedOriginsString = process.env.ALLOWED_ORIGINS
      if (allowedOriginsString) {
        if (allowedOriginsString === '*') {
          res.set('Access-Control-Allow-Origin', '*')
        } else {
          const allowedOriginsArray = allowedOriginsString.split(',')
          const requestOrigin = req.headers.origin
          if (allowedOriginsArray.includes(requestOrigin)) {
            res.set('Access-Control-Allow-Origin', requestOrigin)
          }
        }
      }
      next(null, req, res)
    })
    .catch(error => next(error))
}

function sanitize (text) {
  return text.replace(/['"]+/g, '')
}
