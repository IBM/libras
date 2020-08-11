/**
 * @swagger
 * path:
 *  /data/{id}:
 *    put:
 *      summary: Update data
 *      tags: [Data]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Data id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Data'
 *      responses:
 *        "200":
 *          description: Updated data object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Data'
 */

const data = require('src/services/data')

module.exports = (req, res, next) => {
  res.locals = data.update(req.body)
  next(null, req, res)
}
