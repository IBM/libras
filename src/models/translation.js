/**
 * @swagger
 *  components:
 *    schemas:
 *      Translation:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          signed:
 *            type: string
 *            description: Signed language text.
 *          spoken:
 *            type: string
 *            description: Spoken language text.
 *        example:
 *           signed: Cap I need because sun strong very.
 *           spoken: I need a cap because the sun is very strong.
 */

class Translation {
  constructor (signed, spoken) {
    this.signed = signed
    this.spoken = spoken
  }
}

module.exports = Translation
