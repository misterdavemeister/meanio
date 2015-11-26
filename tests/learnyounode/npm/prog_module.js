var fs = require('fs');
module.exports = function(dir, ext, callback) {
    var data = [];
    fs.readdir(dir, function(error, list) {
        if (error) return callback(error);
        list.forEach(function(li) {
            if (li.match(/\./) && li.split('.')[1] == ext) {
                data.push(li);
            }
        });
        return callback(error, data);
    });
};