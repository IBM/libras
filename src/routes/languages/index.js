/**
 * @swagger
 * tags:
 *   name: Languages
 *   description: Supported languages
 */

const express = require('express')
const router = express.Router()
const methods = require('requireindex')(__dirname)

router.route('/languages')
  .get(methods.get)

module.exports = router
