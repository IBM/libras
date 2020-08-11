/**
 * @swagger
 * path:
 *  /data:
 *    get:
 *      summary: Get data
 *      tags: [Data]
 *      responses:
 *        "200":
 *          description: A list of data objects
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Data'
 */

const data = require('src/services/data')

module.exports = (req, res, next) => {
  res.locals = data.query()
  next(null, req, res)
}
