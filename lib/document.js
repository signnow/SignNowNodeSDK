(function() {
    "use strict";
    /**
     * Document Methods
     */

    var https = require('https'),
        fs = require('fs'),
        common = require('./common').settings;

    //build file multipart/form-data request
    function buildFileRequest(boundaryKey, mimeType, filename) {
        var req = '------FormBoundary' + boundaryKey + '\r\n';
        req += 'Content-Disposition: form-data; name="file"; filename="' + filename + '"\r\n';
        req += 'Content-Type: ' + mimeType + '\r\n\r\n';
        //req += 'Content-Transfer-Encoding: binary\r\n\r\n';
        return req;
    }

    //get file mime type
    function getMimeType(path) {
        var extTypes = {
            "doc": "application/msword",
            "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "pdf": "application/pdf",
            "png": "image/png"
        };
        var pathExtension = path.substr(path.lastIndexOf('.')).replace('.', '');
        return extTypes[pathExtension.toLowerCase()] || null;
    }

    //get filename from path
    function getFileName(path) {
        if (path.lastIndexOf('/') != -1) {
            return path.substr(path.lastIndexOf('/')).replace('/', '');
        } else {
            return path;
        }
    }

    //generate randon string
    function randString(x) {
        var s = "";
        while (s.length < x && x > 0) {
            var r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return s;
    }

    //uploads a file and creates a document. This endpoint accepts .doc, .docx, .pdf, and .png file types
    exports.create = function(obj, callback) {
        var boundaryKey = randString(30);
        var filename = getFileName(obj.filepath);

        //check mimetype
        var mimeType = '';
        if (getMimeType(obj.filepath)) {
            mimeType = getMimeType(obj.filepath);
        } else {
            return callback("File type isn't supported.");
        }

        var file = buildFileRequest(boundaryKey, mimeType, filename);
        var stat = fs.statSync(obj.filepath);
        var reader = fs.createReadStream(obj.filepath, { bufferSize: 64 * 1024 });
        var closingLine = '\r\n------FormBoundary' + boundaryKey + '--';

        common.options.method = "POST";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.headers['Content-Type'] = "multipart/form-data; boundary=----FormBoundary" + boundaryKey;
        common.options.headers['Content-Length'] = stat.size + file.toString().length + closingLine.length;
        common.options.path = common.basePath + "/document";

        var req = https.request(common.options, function(res) {
            res.setEncoding('utf8');
            var errors, chunks;
            res.on('data', function(chunk) {
                chunks = JSON.parse(chunk);
                errors = chunk.errors;
            });
            res.on('end', function() {
                if (callback) { return callback(errors, chunks); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.write(file);

        //pipe the file and append a closing line
        reader.pipe(req, { end: false });
        reader.on('end', function() {
            reader.unpipe(req);
            req.end(closingLine);
        });
    };

    //uploads a file that contains signnow Document Field Tags. This endpoint
    //only accepts .pdf (You may convert the document from .doc or .docx to .pdf)
    exports.fieldextract = function(obj, callback) {
        var boundaryKey = randString(30);
        var filename = getFileName(obj.filepath);

        //check mimetype
        var mimeType = '';
        if (getMimeType(obj.filepath)) {
            mimeType = getMimeType(obj.filepath);
        } else {
            return callback("File type isn't supported.");
        }

        var file = buildFileRequest(boundaryKey, mimeType, filename);
        var stat = fs.statSync(obj.filepath);
        var reader = fs.createReadStream(obj.filepath, { bufferSize: 64 * 1024 });
        var closingLine = '\r\n------FormBoundary' + boundaryKey + '--';

        common.options.method = "POST";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.headers['Content-Type'] = "multipart/form-data; boundary=----FormBoundary" + boundaryKey;
        common.options.headers['Content-Length'] = stat.size + file.toString().length + closingLine.length;
        common.options.path = common.basePath + "/document/fieldextract";

        var req = https.request(common.options, function(res) {
            res.setEncoding('utf8');
            var errors, chunks;
            res.on('data', function(chunk) {
                chunks = JSON.parse(chunk);
                errors = chunk.errors;
            });
            res.on('end', function() {
                if (callback) { return callback(errors, chunks); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.write(file);

        //pipe the file and append a closing line
        reader.pipe(req, { end: false });
        reader.on('end', function() {
            reader.unpipe(req);
            req.end(closingLine);
        });
    };

    //list all documents for user
    exports.list = function(obj, callback) {
        common.options.method = "GET";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/user/documentsv2";

        var req = https.request(common.options, function(res) {
            var data = "";

            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                data = JSON.parse(data);
                var errors = JSON.parse(JSON.stringify(data)).message;
                if (callback) { return callback(errors, data); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.end();
    };

    //retrieve a document resource
    exports.view = function(obj, callback) {
        common.options.method = "GET";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/document/" + obj.id;

        var req = https.request(common.options, function(res) {
            var data = "";

            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                data = JSON.parse(data);
                var errors = JSON.parse(JSON.stringify(data)).message;
                if (callback) { return callback(errors, data); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.end();
    };

    //update an existing document. Add fields [signature | text | initials | checkbox ], elements [signature | text | check]
    exports.update = function(obj, callback) {
        common.options.method = "PUT";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/document/" + obj.id;

        var req = https.request(common.options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                chunk = JSON.parse(chunk);
                var errors = chunk.errors;
                if (callback) { return callback(errors, chunk); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.write(JSON.stringify(obj.fields));
        req.end();
    };

    //download a collapsed document
    exports.download = function(obj, callback) {
        common.options.method = "GET";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/document/" + obj.id + "/download?type=collapsed";

        var req = https.request(common.options, function(res) {
            var data = "";

            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                var errors = JSON.parse(JSON.stringify(data)).message;
                if (callback) { return callback(errors, data); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.end();
    };

    //creates a one-time use URL for anyone to download the document as a PDF.
    exports.share = function(obj, callback) {
        common.options.method = "POST";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/document/" + obj.id + "/download/link";

        var req = https.request(common.options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                chunk = JSON.parse(chunk);
                var errors = chunk.errors;
                if (callback) { return callback(errors, chunk); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.end();
    };

    //TODO: Invite stuck open breaking other request
    //create an invite to sign a document. You can create a simple free form invite or a role-based invite.
    exports.invite = function(obj, callback) {
        common.options.method = "POST";
        common.options.headers.Authorization = "Bearer " + obj.token;

        var oData = { from: obj.from, to: obj.to };
        var JSONData = JSON.stringify(oData);

        common.options.headers['Content-Type'] = "application/json";
        common.options.headers['Content-Length'] = JSONData.length;

        if (obj && obj.options !== undefined && (obj.options.email !== undefined && obj.options.email === 'disable')) {
            common.options.path = common.basePath + "/document/" + obj.id + "/invite?email=disable";
        } else {
            common.options.path = common.basePath + "/document/" + obj.id + "/invite";
        }

        var req = https.request(common.options, function(res) {
            var data = "";

            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                data = JSON.parse(data);
                var errors = JSON.parse(JSON.stringify(data)).message;
                if (callback) { return callback(errors, data); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.write(JSONData);
        req.end();
    };

    //cancel an invite to a document.
    exports.cancelInvite = function(obj, callback) {
        common.options.method = "PUT";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/document/" + obj.id + "/fieldinvitecancel";

        var req = https.request(common.options, function(res) {
            var data = "";

            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                data = JSON.parse(data);

                var errors = JSON.parse(JSON.stringify(data)).message;
                if (callback) { return callback(errors, data); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.end();
    };

    //merges existing documents into one.
    exports.merge = function(obj, callback) {
        common.options.method = "POST";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/document/merge";

        var req = https.request(common.options, function(res) {
            var data = "";

            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                data = JSON.parse(data);

                var errors = JSON.parse(JSON.stringify(data)).message;
                if (callback) { return callback(errors, data); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.write(JSON.stringify(obj));
        req.end();
    };

    //get the history of a document
    exports.history = function(obj, callback) {
        common.options.method = "GET";
        common.options.headers.Authorization = "Bearer " + obj.token;
        common.options.path = common.basePath + "/document/" + obj.id + "/history";

        var req = https.request(common.options, function(res) {
            var data = "";

            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                data = JSON.parse(data);
                var errors = JSON.parse(JSON.stringify(data)).message;
                if (callback) { return callback(errors, data); }
            });
        });

        req.on('error', function(e) {
            if (callback) {
                return callback(e.message);
            }
        });

        req.end();
    };
})();