/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management
 */

const express = require('express')
const router = express.Router()
const methods = require('requireindex')(__dirname)

router.route('/data')
  .post(methods.post)

module.exports = router
