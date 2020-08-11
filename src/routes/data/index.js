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
  .get(methods.list)
  .post(methods.post)

router.route('/data/:id')
  .get(methods.get)
  .put(methods.put)
  .delete(methods.delete)

module.exports = router
