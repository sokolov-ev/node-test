'use strict';

const express        = require('express');
const router         = express.Router();
const FileController = require('./file.controller');

router.post('/save', FileController.save);
router.get('/list', FileController.getAllFiles);
router.get('/file/:id', FileController.downloadFile);

module.exports = router;
