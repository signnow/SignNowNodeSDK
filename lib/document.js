'use strict';
const https = require('https');
const fs = require('fs');
const {
  responseHandler, errorHandler, buildRequestOptions,
} = require('./common');

// build file multipart/form-data request
const buildFileRequest = (boundaryKey, mimeType, filename) => {
  let req = `------FormBoundary${boundaryKey}\r\n`;
  req += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`;
  req += `Content-Type: ${mimeType}\r\n\r\n`;
  return req;
};

// get file mime type
const getMimeType = path => {
  const extTypes = {
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pdf: 'application/pdf',
    odt: 'application/vnd.oasis.opendocument.text',
    rtf: 'application/rtf',
    xml: 'application/xml',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    bmp: 'image/bmp',
  };
  const pathExtension = path.substr(path.lastIndexOf('.')).replace('.', '');
  return extTypes[pathExtension.toLowerCase()] || null;
};

// get filename from path
const getFileName = path => {
  if (path.lastIndexOf('/') !== -1) {
    return path.substr(path.lastIndexOf('/')).replace('/', '');
  } else {
    return path;
  }
};

// generate randon string
const randString = x => {
  let s = '';
  while (s.length < x && x > 0) {
    const r = Math.random();
    s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
  }
  return s;
};

/**
 * Document methods
 */
class Document {

  /**
   * Create document payload
   * @typedef {Object} DocumentCreateParams
   * @property {string} filepath - path to file to be uploaded
   * @property {string} token - your auth token
   */

  /**
   * Create document response data
   * @typedef {Object} DocumentCreateResponse
   * @property {string} id - an id of created document
   */

  /**
   * Uploads a file and creates a document.
   * This endpoint accepts .pdf, .doc, .docx, .odt, .rtf, .png, .jpg, .jpeg, .gif, .bmp, .xml, .xls, .xlsx, .ppt, .pptx file types
   * @param {DocumentCreateParams} data - create document payload
   * @param {function(err: ApiErrorResponse, res: DocumentCreateResponse)} [callback] - error first node.js callback
   */
  static create ({ filepath, token }, callback) {
    const boundaryKey = randString(30);
    const filename = getFileName(filepath);

    // check mimetype
    const mimeType = getMimeType(filepath);

    if (!mimeType) {
      callback('File type isn\'t supported.');
      return;
    }

    const file = buildFileRequest(boundaryKey, mimeType, filename);
    const stat = fs.statSync(filepath);
    const reader = fs.createReadStream(filepath, { bufferSize: 64 * 1024 });
    const closingLine = `\r\n------FormBoundary${boundaryKey}--`;
    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/document',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': `multipart/form-data; boundary=----FormBoundary${boundaryKey}`,
          'Content-Length': stat.size + file.toString().length + closingLine.length,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(file);
    reader.on('end', () => {
      reader.unpipe(req);
      req.end(closingLine);
    });

    // pipe the file and append a closing line
    reader.pipe(req, { end: false });
  }

  /**
   * Upload document with field extract payload
   * @typedef {Object} DocumentFieldExtractParams
   * @property {string} filepath - path to file to be uploaded
   * @property {string} token - your auth token
   */

  /**
   * Upload document with field extract response data
   * @typedef {Object} DocumentFieldExtractResponse
   * @property {string} id - an id of created document
   */

  /**
   * Uploads a file that contains signnow Document Field Tags.
   * This endpoint only accepts .pdf (You may convert the document from .doc or .docx to .pdf)
   * @param {DocumentFieldExtractParams} data - upload document with field extract payload
   * @param {function(err: ApiErrorResponse, res: DocumentFieldExtractResponse)} [callback] - error first node.js callback
   */
  static fieldextract ({ filepath, token }, callback) {
    const boundaryKey = randString(30);
    const filename = getFileName(filepath);

    // check mimetype
    const mimeType = getMimeType(filepath);

    if (!mimeType) {
      callback('File type isn\'t supported.');
      return;
    }

    const file = buildFileRequest(boundaryKey, mimeType, filename);
    const stat = fs.statSync(filepath);
    const reader = fs.createReadStream(filepath, { bufferSize: 64 * 1024 });
    const closingLine = `\r\n------FormBoundary${boundaryKey}--`;

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/document/fieldextract',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': `multipart/form-data; boundary=----FormBoundary${boundaryKey}`,
          'Content-Length': stat.size + file.toString().length + closingLine.length,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(file);
    reader.on('end', () => {
      reader.unpipe(req);
      req.end(closingLine);
    });

    // pipe the file and append a closing line
    reader.pipe(req, { end: false });
  }

  // list all documents for user
  static list ({ token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: '/user/documentsv2',
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  // retrieve a document resource
  static view ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: `/document/${id}`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  // update an existing document. Add fields [signature | text | initials | checkbox ], elements [signature | text | check]
  static update ({
    id,
    fields,
    token,
  }, callback) {
    const JSONData = JSON.stringify(fields);
    const req = https
      .request(buildRequestOptions({
        method: 'PUT',
        path: `/document/${id}`,
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }

  // download a collapsed document
  static download ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: `/document/${id}/download?type=collapsed`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback, { parse: false }))
      .on('error', errorHandler(callback))
      .end();
  }

  // creates a one-time use URL for anyone to download the document as a PDF.
  static share ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'POST',
        path: `/document/${id}/download/link`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /*
   * TODO: Invite stuck open breaking other request
   * create an invite to sign a document. You can create a simple free form invite or a role-based invite.
   */
  static invite ({
    id,
    data,
    options: { email } = {},
    token,
  }, callback) {
    const JSONData = JSON.stringify(data);
    let path = '';

    if (email === 'disable') {
      path = `/document/${id}/invite?email=disable`;
    } else {
      path = `/document/${id}/invite`;
    }

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
        },
        path,
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }

  // cancel an invite to a document.
  static cancelInvite ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'PUT',
        path: `/document/${id}/fieldinvitecancel`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  // merges existing documents into one.
  static merge ({
    name,
    document_ids,
    token,
  }, callback) {
    const JSONData = JSON.stringify({
      upload_document: true,
      document_ids,
      name,
    });

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/document/merge',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSONData),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(JSONData);
    req.end();
  }

  // get the history of a document
  static history ({ id, token }, callback) {
    const req = https.request(buildRequestOptions({
      method: 'GET',
      path: `/document/${id}/history`,
      authorization: {
        type: 'Bearer',
        token,
      },
    }), responseHandler(callback));

    req.on('error', errorHandler(callback));
    req.end();
  }

}

module.exports = Document;
