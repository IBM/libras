/**
 * @swagger
 * path:
 *  /data:
 *    post:
 *      summary: Create data
 *      tags: [Data]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Data'
 *      responses:
 *        "200":
 *          description: Created data object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Data'
 */

const data = require('src/controllers/data')

module.exports = (req, res, next) => {
  res.locals = data.create(req.body)
  next(null, req, res)
}
