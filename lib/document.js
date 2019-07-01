'use strict';
const https = require('https');
const fs = require('fs');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');


/**
 * Document Methods
 */

// build file multipart/form-data request
function buildFileRequest (boundaryKey, mimeType, filename) {
  let req = `------FormBoundary${boundaryKey}\r\n`;
  req += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`;
  req += `Content-Type: ${mimeType}\r\n\r\n`;

  // req += 'Content-Transfer-Encoding: binary\r\n\r\n';
  return req;
}

// get file mime type
function getMimeType (path) {
  const extTypes = {
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pdf: 'application/pdf',
    png: 'image/png',
  };
  const pathExtension = path.substr(path.lastIndexOf('.')).replace('.', '');
  return extTypes[pathExtension.toLowerCase()] || null;
}

// get filename from path
function getFileName (path) {
  if (path.lastIndexOf('/') !== -1) {
    return path.substr(path.lastIndexOf('/')).replace('/', '');
  } else {
    return path;
  }
}

// generate randon string
function randString (x) {
  let s = '';
  while (s.length < x && x > 0) {
    const r = Math.random();
    s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
  }
  return s;
}

// uploads a file and creates a document. This endpoint accepts .doc, .docx, .pdf, and .png file types
exports.create = function(obj, callback) {
  const boundaryKey = randString(30);
  const filename = getFileName(obj.filepath);

  // check mimetype
  let mimeType = '';
  if (getMimeType(obj.filepath)) {
    mimeType = getMimeType(obj.filepath);
  } else {
    return callback('File type isn\'t supported.');
  }

  const file = buildFileRequest(boundaryKey, mimeType, filename);
  const stat = fs.statSync(obj.filepath);
  const reader = fs.createReadStream(obj.filepath, { bufferSize: 64 * 1024 });
  const closingLine = `\r\n------FormBoundary${boundaryKey}--`;

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/document',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
    headers: {
      'Content-Type': `multipart/form-data; boundary=----FormBoundary${boundaryKey}`,
      'Content-Length': stat.size + file.toString().length + closingLine.length,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(file);

  reader.on('end', () => {
    reader.unpipe(req);
    req.end(closingLine);
  });

  // pipe the file and append a closing line
  reader.pipe(req, { end: false });

};

/*
 * uploads a file that contains signnow Document Field Tags. This endpoint
 * only accepts .pdf (You may convert the document from .doc or .docx to .pdf)
 */

exports.fieldextract = function(obj, callback) {
  const boundaryKey = randString(30);
  const filename = getFileName(obj.filepath);

  // check mimetype
  let mimeType = '';
  if (getMimeType(obj.filepath)) {
    mimeType = getMimeType(obj.filepath);
  } else {
    return callback('File type isn\'t supported.');
  }

  const file = buildFileRequest(boundaryKey, mimeType, filename);
  const stat = fs.statSync(obj.filepath);
  const reader = fs.createReadStream(obj.filepath, { bufferSize: 64 * 1024 });
  const closingLine = `\r\n------FormBoundary${boundaryKey}--`;

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/document/fieldextract',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
    headers: {
      'Content-Type': `multipart/form-data; boundary=----FormBoundary${boundaryKey}`,
      'Content-Length': stat.size + file.toString().length + closingLine.length,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(file);

  // pipe the file and append a closing line
  reader.pipe(req, { end: false });

  reader.on('end', () => {
    reader.unpipe(req);
    req.end(closingLine);
  });
};

// list all documents for user
exports.list = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: '/user/documentsv2',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};

// retrieve a document resource
exports.view = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: `/document/${obj.id}`,
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};

// update an existing document. Add fields [signature | text | initials | checkbox ], elements [signature | text | check]
exports.update = function(obj, callback) {
  const JSONData = JSON.stringify(obj.fields);

  const req = https.request(buildRequestOptions({
    method: 'PUT',
    path: `/document/${obj.id}`,
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSONData),
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSONData);
  req.end();
};

// download a collapsed document
exports.download = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: `/document/${obj.id}/download?type=collapsed`,
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback, { parse: false }));

  req.on('error', errorHandler(callback));
  req.end();
};

// creates a one-time use URL for anyone to download the document as a PDF.
exports.share = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: `/document/${obj.id}/download/link`,
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};

/*
 * TODO: Invite stuck open breaking other request
 * create an invite to sign a document. You can create a simple free form invite or a role-based invite.
 */

exports.invite = function(obj, callback) {
  const JSONData = JSON.stringify(obj.data);
  let path = '';

  if (obj && obj.options !== undefined && (obj.options.email !== undefined && obj.options.email === 'disable')) {
    path = `/document/${obj.id}/invite?email=disable`;
  } else {
    path = `/document/${obj.id}/invite`;
  }

  const req = https.request(buildRequestOptions({
    method: 'POST',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSONData),
    },
    path,
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSONData);
  req.end();
};

// cancel an invite to a document.
exports.cancelInvite = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'PUT',
    path: `/document/${obj.id}/fieldinvitecancel`,
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};

// merges existing documents into one.
exports.merge = function(obj, callback) {
  const JSONData = JSON.stringify({
    name: obj.name,
    document_ids: obj.document_ids,
    upload_document: true,
  });

  const req = https.request(buildRequestOptions({
    method: 'POST',
    path: '/document/merge',
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSONData),
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.write(JSONData);
  req.end();
};

// get the history of a document
exports.history = function(obj, callback) {
  const req = https.request(buildRequestOptions({
    method: 'GET',
    path: `/document/${obj.id}/history`,
    authorization: {
      type: 'Bearer',
      token: obj.token,
    },
  }), responseHandler(callback));

  req.on('error', errorHandler(callback));
  req.end();
};
