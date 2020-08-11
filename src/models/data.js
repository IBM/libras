/**
 * @swagger
 *  components:
 *    schemas:
 *      Data:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: string
 *            description: Data unique id.
 *          description:
 *            type: string
 *            description: Data description.
 *        example:
 *           id: 123
 *           description: Lorem ipsum dolor sit amet.
 */

class Data {
  constructor (data) {
    this.id = data.id
    this.description = data.description
  }
}

module.exports = Data
