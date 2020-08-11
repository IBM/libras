/**
 * @swagger
 * path:
 *  /data/{id}:
 *    delete:
 *      summary: Delete data by id
 *      tags: [Data]
 *      responses:
 *        "200":
 *          description: A list of data objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Data'
 */

const data = require('src/services/data')

module.exports = (req, res, next) => {
  data.delete(req.params.id)
  next(null, req, res)
}
