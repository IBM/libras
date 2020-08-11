/**
 * @swagger
 * path:
 *  /translate:
 *    post:
 *      summary: Translate signed to spoken language
 *      tags: [Translate]
 *      parameters:
 *       - name: signed
 *         description: Text written in signed language
 *         in:  body
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Text written in spoken language
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Data'
 */

const data = require('src/services/data')

module.exports = (req, res, next) => {
  res.locals = data.translate(req.body)
  next(null, req, res)
}
