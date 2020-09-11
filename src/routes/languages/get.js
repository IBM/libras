/**
 * @swagger
 * path:
 *  /languages:
 *    get:
 *      summary: Retrieves the list of supported sign languages
 *      tags: [Languages]
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: string
 *                  example: asl, libras
 */

const languages = require('src/controllers/languages')

module.exports = async (req, res, next) => {
  res.locals = await languages.list()

  next(null, req, res)
}
