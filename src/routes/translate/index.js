/**
 * @swagger
 * tags:
 *   name: Translate
 *   description: Translate texts
 */

const express = require('express')
const router = express.Router()
const methods = require('requireindex')(__dirname)

router.route('/translate/:language')
  .post(methods.post)
  .get(methods.get)

module.exports = router
