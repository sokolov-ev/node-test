'use strict';

const File = require(appRoot.concat('/models/files'));
const fs   = require('fs');
const guid = require('guid');

module.exports = {
    save: save,
    getAllFiles: getAllFiles,
    downloadFile: downloadFile,
};

function save(req, res) {
    let name = req.body.name;
    let expired = req.body.expired;
    let fileBase64 = req.body.file;
    let fileName = guid.raw();
    let path = appRoot + '/public/files/' + fileName;
    let temp = fileBase64.replace(/^data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64),/, "");
    let imageData;

    try {
        imageData = Buffer.from(temp, 'base64');
    } catch(err) {
        res.status(400).json({
            status: false,
            data: null,
            error: err.message
        });
    }

    new Promise(function (resolve, reject) {
        fs.writeFile(path, imageData, (err) => {
            err ? reject(err) : resolve();
        });
    })
    .then(function() {
        return File.create({
            name_original: name,
            name_file: fileName,
            expired: expired
        });
    })
    .then(function(file) {
        res.json({
            status: true,
            data: {id: file._id},
            error: null
        });
    })
    .catch(function (err) {
        res.status(400).json({
            status: false,
            data: null,
            error: err.message
        });
    });
};

function getAllFiles(req, res) {
    File.find()
        .sort({name_original: 1})
        .select(['_id', 'name_original', 'expired'])
        .then(function (files) {
            res.json({
                status: true,
                data: files,
                error: null
            });
        })
        .catch(function (err) {
            res.status(400).json({
                status: false,
                data: null,
                error: err.message
            });
        });
};

function downloadFile(req, res) {
    let fileId = req.params.id;

    File.findById(fileId)
        .then(function(file) {
            res.download(appRoot + '/public/files/' + file.name_file, file.name_original);
        })
        .catch(function (err) {
            res.status(400).json({
                status: false,
                data: null,
                error: err.message
            });
        });
};