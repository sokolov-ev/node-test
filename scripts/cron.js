'use strict';

const File   = require(appRoot.concat('/models/files'));
const fs     = require('fs');
const moment = require('moment');


module.exports = {
    removExpiredFiles: removExpiredFiles,
};


function removExpiredFiles() {
    let timeNow = moment().unix();
    let filesId = [];

    File.find({
            expired: { $lt: timeNow },
        })
        .map(function (item) {
            return new Promise(function (resolve, reject) {
                fs.unlink(appRoot.concat('/../public/files/' + item.name_file), (err) => {
                    if (!err) {
                        filesId.push(item._id);
                    }

                    resolve(item);
                });
            });
        })
        .then(function() {
            if (filesId.length) {
                return File.remove({ _id: filesId });
            }
        })
        .then(function() {
            console.log('Cron job - removed expired files: ' + filesId.lenght);
        })
        .catch(console.error);
}