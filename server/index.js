'use strict';

const express        = require('express');
const router         = express.Router();
const FileController = require('./file.controller');

// router.post('/save', FileController.save);
router.get('/ping', function(req, res) {
  res.json({ping: 'ok'});
});

module.exports = router;
