/**
 * @swagger
 * path:
 *  /data/{id}:
 *    get:
 *      summary: Get data by id
 *      tags: [Data]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Data id
 *      responses:
 *        "200":
 *          description: A data object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Data'
 */

const data = require('src/services/data')

module.exports = (req, res, next) => {
  res.locals = data.retrieve(req.params.id)
  next(null, req, res)
}
