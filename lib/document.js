'use strict';
const https = require('https');
const fs = require('fs');
const common = require('./common').settings;

(function () {
  /**
   * Document Methods
   */

  //build file multipart/form-data request
  function buildFileRequest(boundaryKey, mimeType, filename) {
    let req = '------FormBoundary' + boundaryKey + '\r\n';
    req += 'Content-Disposition: form-data; name="file"; filename="' + filename + '"\r\n';
    req += 'Content-Type: ' + mimeType + '\r\n\r\n';
    //req += 'Content-Transfer-Encoding: binary\r\n\r\n';
    return req;
  }

  //get file mime type
  function getMimeType(path) {
    const extTypes = {
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'pdf': 'application/pdf',
      'png': 'image/png',
    };
    const pathExtension = path.substr(path.lastIndexOf('.')).replace('.', '');
    return extTypes[pathExtension.toLowerCase()] || null;
  }

  //get filename from path
  function getFileName(path) {
    if (path.lastIndexOf('/') !== -1) {
      return path.substr(path.lastIndexOf('/')).replace('/', '');
    } else {
      return path;
    }
  }

  //generate randon string
  function randString(x) {
    let s = '';
    while (s.length < x && x > 0) {
      const r = Math.random();
      s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
  }

  //uploads a file and creates a document. This endpoint accepts .doc, .docx, .pdf, and .png file types
  exports.create = function (obj, callback) {
    const boundaryKey = randString(30);
    const filename = getFileName(obj.filepath);

    //check mimetype
    let mimeType = '';
    if (getMimeType(obj.filepath)) {
      mimeType = getMimeType(obj.filepath);
    } else {
      return callback('File type isn\'t supported.');
    }

    const file = buildFileRequest(boundaryKey, mimeType, filename);
    const stat = fs.statSync(obj.filepath);
    const reader = fs.createReadStream(obj.filepath, {
      bufferSize: 64 * 1024,
    });
    const closingLine = '\r\n------FormBoundary' + boundaryKey + '--';

    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.headers['Content-Type'] = 'multipart/form-data; boundary=----FormBoundary' + boundaryKey;
    common.options.headers['Content-Length'] = stat.size + file.toString().length + closingLine.length;
    common.options.path = common.basePath + '/document';

    const req = https.request(common.options, res => {
      let resData = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        resData += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(resData);
          errors = parsedData.errors || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || resData);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.write(file);

    reader.on('end', () => {
      reader.unpipe(req);
      req.end(closingLine);
    });

    //pipe the file and append a closing line
    reader.pipe(req, {
      end: false,
    });

  };

  //uploads a file that contains signnow Document Field Tags. This endpoint
  //only accepts .pdf (You may convert the document from .doc or .docx to .pdf)
  exports.fieldextract = function (obj, callback) {
    const boundaryKey = randString(30);
    const filename = getFileName(obj.filepath);

    //check mimetype
    let mimeType = '';
    if (getMimeType(obj.filepath)) {
      mimeType = getMimeType(obj.filepath);
    } else {
      return callback('File type isn\'t supported.');
    }

    const file = buildFileRequest(boundaryKey, mimeType, filename);
    const stat = fs.statSync(obj.filepath);
    const reader = fs.createReadStream(obj.filepath, {
      bufferSize: 64 * 1024,
    });
    const closingLine = '\r\n------FormBoundary' + boundaryKey + '--';

    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.headers['Content-Type'] = 'multipart/form-data; boundary=----FormBoundary' + boundaryKey;
    common.options.headers['Content-Length'] = stat.size + file.toString().length + closingLine.length;
    common.options.path = common.basePath + '/document/fieldextract';

    const req = https.request(common.options, res => {
      let resData = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        resData += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(resData);
          errors = parsedData.errors || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || resData);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.write(file);

    //pipe the file and append a closing line
    reader.pipe(req, {
      end: false,
    });
    reader.on('end', () => {
      reader.unpipe(req);
      req.end(closingLine);
    });
  };

  //list all documents for user
  exports.list = function (obj, callback) {
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/user/documentsv2';

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(data);
          errors = parsedData.message || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || data);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.end();
  };

  //retrieve a document resource
  exports.view = function (obj, callback) {
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/document/' + obj.id;
    delete common.options.headers['Content-Length'];

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(data);
          errors = parsedData.message || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || data);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.end();
  };

  //update an existing document. Add fields [signature | text | initials | checkbox ], elements [signature | text | check]
  exports.update = function (obj, callback) {
    common.options.method = 'PUT';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/document/' + obj.id;
    common.options.headers['Content-Type'] = 'application/json';

    const JSONData = JSON.stringify(obj.fields);
    common.options.headers['Content-Length'] = JSONData.length;

    const req = https.request(common.options, res => {
      let resData = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        resData += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(resData);
          errors = parsedData.errors || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || resData);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.write(JSONData);
    req.end();
  };

  //download a collapsed document
  exports.download = function (obj, callback) {
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/document/' + obj.id + '/download?type=collapsed';
    delete common.options.headers['Content-Length'];

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const errors = data.message;

        if (callback) {
          return callback(errors, data);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.end();
  };

  //creates a one-time use URL for anyone to download the document as a PDF.
  exports.share = function (obj, callback) {
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/document/' + obj.id + '/download/link';

    const req = https.request(common.options, res => {
      let resData = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        resData += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(resData);
          errors = parsedData.errors || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || resData);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.end();
  };

  //TODO: Invite stuck open breaking other request
  //create an invite to sign a document. You can create a simple free form invite or a role-based invite.
  exports.invite = function (obj, callback) {
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;

    // var oData = { from: obj.data.from, to: obj.data.to };
    const JSONData = JSON.stringify(obj.data);

    common.options.headers['Content-Type'] = 'application/json';
    common.options.headers['Content-Length'] = JSONData.length;

    if (obj && obj.options !== undefined && (obj.options.email !== undefined && obj.options.email === 'disable')) {
      common.options.path = common.basePath + '/document/' + obj.id + '/invite?email=disable';
    } else {
      common.options.path = common.basePath + '/document/' + obj.id + '/invite';
    }

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(data);
          errors = parsedData.errors || parsedData.message || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || data);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.write(JSONData);
    req.end();
  };

  //cancel an invite to a document.
  exports.cancelInvite = function (obj, callback) {
    common.options.method = 'PUT';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/document/' + obj.id + '/fieldinvitecancel';
    delete common.options.headers['Content-Length'];

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(data);
          errors = parsedData.errors || parsedData.message || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || data);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.end();
  };

  //merges existing documents into one.
  exports.merge = function (obj, callback) {
    common.options.method = 'POST';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/document/merge';

    const JSONData = JSON.stringify({
      name: obj.name,
      document_ids: obj.document_ids,
      upload_document: true,
    });

    common.options.headers['Content-Type'] = 'application/json';
    common.options.headers['Content-Length'] = JSONData.length;

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(data);
          errors = parsedData.errors || parsedData.message || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || data);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.write(JSONData);
    req.end();
  };

  //get the history of a document
  exports.history = function (obj, callback) {
    common.options.method = 'GET';
    common.options.headers.Authorization = 'Bearer ' + obj.token;
    common.options.path = common.basePath + '/document/' + obj.id + '/history';
    delete common.options.headers['Content-Length'];

    const req = https.request(common.options, res => {
      let data = '';

      res.setEncoding('utf8');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        let parsedData = '';
        let errors = '';

        try {
          parsedData = JSON.parse(data);
          errors = parsedData.errors || parsedData.message || null;
        } catch (e) {
          errors = e;
          parsedData = null;
        }

        if (callback) {
          return callback(errors, parsedData || data);
        }
      });
    });

    req.on('error', e => {
      if (callback) {
        return callback(e.message);
      }
    });

    req.end();
  };
})();
