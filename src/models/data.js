/**
 * @swagger
 *  components:
 *    schemas:
 *      Data:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          signed:
 *            type: string
 *            description: Text written in signed language.
 *          spoken:
 *            type: string
 *            description: Text written in spoken language.
 *        example:
 *           signed: Igreja aborto proibir.
 *           spoken: Igreja proíbe aborto.
 */

class Data {
  constructor (data) {
    this.signed = data.signed
    this.spoken = data.spoken
  }
}

module.exports = Data
