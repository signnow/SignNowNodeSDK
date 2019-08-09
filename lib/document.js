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
   * Uploads a file that contains SignNow Document Field Tags.
   * This endpoint only accepts .pdf (you may convert the document from .doc or .docx to .pdf)
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


  /**
   * Payload to receive user's document list
   * @typedef {Object} DocumentListParams
   * @property {string} token - your auth token
   */

  /**
   * Document list response item
   * @typedef {Object} DocumentListItem
   * @property {string} id - id of specific document
   * @property {string} user_id - id of user that uploaded document
   * @property {string} document_name - name of document
   * @property {string} page_count - amount of pages in the document
   * @property {string} created - timestamp document was created
   * @property {string} updated - timestamp document was updated
   * @property {string} original_filename - original filename with document format (.pdf, .doc, etc...)
   * @property {?string} origin_document_id - an id of original document (if document is a copy)
   * @property {string} owner - email of document owner
   * @property {boolean} template - is document a template or not
   * @property {?string} origin_user_id - id of user who created document
   * @property {Object} thumbnail - thumbnail urls with different sizes (small, medium, large)
   * @property {Object[]} signatures - signature signed elements
   * @property {Object[]} texts - text and enumeration filled elements
   * @property {Object[]} checks - checkbox checked elements
   * @property {Object[]} tags - field types document contains
   * @property {Object[]} fields - all document fillable fields
   * @property {Object[]} requests - requests for signing document
   * @property {Object[]} roles - document signer roles
   * @property {Object[]} field_invites - sent invites data
   * @property {number} version_time - document updated timestamp
   * @property {Object[]} enumeration_options - dropdown options
   * @property {Object[]} attachments - attachments in document
   * @property {Object[]} routing_details - signing steps routing details
   * @property {Object[]} integrations - document integrations
   * @property {Object[]} hyperlinks - document hyperlinks
   * @property {Object[]} radiobuttons - checked radiobuttons after document was signed
   * @property {Object[]} document_group_template_info - document group templates data
   * @property {Object[]} document_group_info - document group template's data
   * @property {Object[]} originator_organization_settings - specific organization settings for document
   * @property {Object[]} field_validators - validation rules for fields (date fields, payment fields etc.)
   * @property {Object} settings - specific document settings
   */

  /**
   * User's Document list response
   * @typedef {DocumentListItem[]} DocumentListResponse
   */

  /**
   * Retrieve user's document list
   * @param {DocumentListParams} data - payload to receive user's document list
   * @param {function(err: ApiErrorResponse, res: DocumentListItem)} [callback] - error first node.js callback
   */
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

  /**
   * Document view payload
   * @typedef {Object} DocumentViewParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   */

  /**
   * Document view response of specific document
   * @typedef {Object} DocumentViewResponse
   * @property {string} id - id of specific document
   * @property {string} user_id - id of user that uploaded document
   * @property {string} document_name - name of document
   * @property {string} page_count - amount of pages in the document
   * @property {string} created - timestamp document was created
   * @property {string} updated - timestamp document was updated
   * @property {string} original_filename - original filename with document format (.pdf, .doc, etc...)
   * @property {?string} origin_document_id - an id of original document (if document is a copy)
   * @property {string} owner - email of document owner
   * @property {boolean} template - is document a template or not
   * @property {Object} thumbnail - thumbnail urls with different sizes (small, medium, large)
   * @property {Object[]} signatures - signature signed elements
   * @property {Object[]} texts - text and enumeration filled elements
   * @property {Object[]} checks - checkbox checked elements
   * @property {Object[]} tags - field types document contains
   * @property {Object[]} fields - all document fillable fields
   * @property {Object[]} requests - requests for signing document
   * @property {Object[]} roles - document signer roles
   * @property {Object[]} field_invites - sent invites data
   * @property {number} version_time - document updated timestamp
   * @property {Object[]} enumeration_options - dropdown options
   * @property {Object[]} attachments - attachments in document
   * @property {Object[]} routing_details - signing steps routing details
   * @property {Object[]} integrations - document integrations
   * @property {Object[]} hyperlinks - document hyperlinks
   * @property {Object[]} radiobuttons - checked radiobuttons after document was signed
   * @property {Object[]} document_group_template_info - document group template's data
   * @property {Object[]} document_group_info - document group's data
   * @property {Object[]} originator_organization_settings - specific organization settings for document
   * @property {Object[]} field_validators - validation rules for fields (date fields, payment fields etc.)
   * @property {Object} settings - specific document settings
   * @property {string} parent_id - id of document folder
   * @property {string} originator_logo - logo url
   * @property {Object[]} pages - list of document pages with page sources and page size.
   */

  /**
   * Retrieves a document detailed data
   * @param {DocumentViewParams} data - view document with field extract payload
   * @param {function(err: ApiErrorResponse, res: DocumentViewResponse)} [callback] - error first node.js callback
   */
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

  /**
   * @typedef {Object} SignatureField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (signature)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {string} [label] - field label
   */

  /**
   * @typedef {Object} InitialsField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (initials)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {string} [label] - field label
   */

  /**
   * @typedef {Object} TextField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (text)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {string|number} [prefilled_text] - prefilled field value
   * @property {string} [validator_id] - field value validator ID
   * @property {string} [label] - field label
   */

  /**
   * @typedef {Object} CheckField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (checkbox)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {boolean} [prefilled_text] - prefilled field value
   * @property {string} [label] - field label
   */

  /**
   * @typedef {Object} EnumerationField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (enumeration)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {Array<number|string>} enumeration_options - choice options of enumerable field
   * @property {string|number} [prefilled_text] - prefilled field value
   * @property {string} [label] - field label
   * @property {boolean} [custom_defined_option=false] - if 'true' user can change values, if 'false' user can only read
   */

  /**
   * @typedef {Object} RadioButton
   * @property {number} page_number - page number of document
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {string} value - value of radio button
   * @property {string} checked - radio button check status
   * @property {number} created - redio button creation timestamp
   */

  /**
   * @typedef {Object} RadioButtonField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (radiobutton)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {RadioButton[]} radio - array of radio buttons
   * @property {string|number} [prefilled_text] - prefilled field value
   * @property {string} [label] - field label
   */

  /**
   * @typedef {Object} FormulaTreeBranchTerminator
   * @property {string} term - name of field which will participate in calculation formula
   */

  /**
   * @typedef {Object} FormulaTreeBranch
   * @property {FormulaTree} term - a part of formula parsed into tree
   */

  /**
   * @typedef {Object} FormulaTree
   * @property {string} operator - arithmetic operator's token
   * @property {FormulaTreeBranch|FormulaTreeBranchTerminator} left - left branch of formula tree
   * @property {FormulaTreeBranch|FormulaTreeBranchTerminator} right - right branch of formula tree
   */

  /**
   * @typedef {Object} CalculatedField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (text)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {string} formula - arithmetic formula, e.g. 'TextName+EnumerationName'
   * @property {FormulaTree} calculation_formula - formula parsed into tree
   * @property {number} calculation_precision - calculation precision
   * @property {string} [label] - field label
   * @property {boolean} [custom_defined_option=false] - if 'true' user can change values, if 'false' user can only read
   */

  /**
   * @typedef {Object} AttachmentField
   * @property {number} page_number - page number of document
   * @property {string} type - type of field (attachment)
   * @property {string} name - unique name of the field
   * @property {string} role - role name
   * @property {boolean} required - required field
   * @property {number} height - height of the field
   * @property {number} width - width of the field
   * @property {number} x - X coordinate of the field
   * @property {number} y - Y coordinate of the field
   * @property {string} [label] - field label
   */

  /**
   * @typedef {Object} DocumentFields
   * @property {number} client_timestamp - local time of user
   * @property {Array<SignatureField|InitialsField|TextField|CheckField|EnumerationField|RadioButtonField|CalculatedField|AttachmentField>} fields - all types of fields
   */

  /**
   * Update document payload
   * @typedef {Object} DocumentUpdateParams
   * @property {string} id - id of specific document
   * @property {DocumentFields} fields - set of fields
   * @property {string} token - your auth token
   */

  /**
   * Update document response data
   * @typedef {Object} DocumentUpdateResponse
   * @property {string} id - an id of document
   * @property {Object[]} signatures - signature and initial elements
   * @property {Object[]} texts - text and enumeration elements
   * @property {Object[]} checks - checkbox elements
   * @property {Object[]} attachments - attachment elements
   * @property {Object[]} radiobuttons - radiobutton elements
   */

  /**
   * Updates an existing document.
   * Adds fields (signature, text, initials, checkbox, radiobutton group, calculated) and elements (signature, text, check).
   * Every call of this method will add only specified fields into document.
   * Old fields will be removed
   * @param {DocumentUpdateParams} data - update document request payload
   * @param {function(err: ApiErrorResponse, res: DocumentUpdateResponse)} [callback] - error first node.js callback
   */
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

  /**
   * Document download payload
   * @typedef {Object} DocumentDownloadParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   */

  /**
   * Document binary data
   * @typedef {Buffer} DocumentDownloadResponse
   */

  /**
   * Downloads document with embedded fields and elements
   * @param {DocumentDownloadParams} data - download document request payload
   * @param {function(err: ApiErrorResponse, res: DocumentDownloadResponse)} [callback] - error first node.js callback
   */

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

  /**
   * Document invite signer settings
   * @typedef {Object} SignerSettings
   * @property {string} email - signer's email
   * @property {string} role - role name
   * @property {string} role_id - role unique id (can be discovered in document details)
   * @property {number} order - role signing order
   * @property {string} reassign - allow reassign signer
   * @property {string} decline_by_signature - signer can decline invite
   * @property {number} reminder - remind via email in days
   * @property {number} expiration_days - expiration of invite in days
   * @property {string} [subject] - specify subject of email
   * @property {string} [message] - specify body of email
   */

  /**
   * Document invite settings
   * @typedef {Object} DocumentInviteSettings
   * @property {string} from - email of sender
   * @property {SignerSettings[]|string} to - array of signers or email of single signer
   * @property {string} [document_id] - an id of document
   * @property {string[]} [cc] - array with emails of copy receivers
   * @property {string} [subject] - specify subject of email
   * @property {string} [message] - specify body of email
   * @property {string} [on_complete] - on signing complete action
   */

  /**
   * Document invite optional settings
   * @typedef {Object} DocumentInviteOptions
   * @property {string} [email] - ability to disable invitation by email. to disabale email assign value 'disable'
   */

  /**
   * Create document invite payload
   * @typedef {Object} DocumentInviteParams
   * @property {string} id - an id of document
   * @property {DocumentInviteSettings} data - document invite settings
   * @property {DocumentInviteOptions} [options] - document invite optional settings
   * @property {string} token - your auth token
   */

  /**
   * Create document field invite response data
   * @typedef {Object} DocumentFieldInviteResponse
   * @property {string} status - status of invitation, e.g. 'success'
   */

  /**
   * Create document free form invite response data
   * @typedef {Object} DocumentFreeformInviteResponse
   * @property {string} result - free form invitation result, e.g. 'success'
   * @property {string} id - unique id of invite
   * @property {string} callback_url - url for front-end redirect or 'none'
   */

  /**
   * Create document invite response data
   * @typedef {DocumentFieldInviteResponse|DocumentFreeformInviteResponse} DocumentInviteResponse
   */

  /**
   * Creates an invite to sign a document.
   * You can create a simple free form invite(s) or a role-based invite(s).
   * @param {DocumentInviteParams} data - create document invite payload
   * @param {function(err: ApiErrorResponse, res: DocumentInviteResponse)} [callback] - error first node.js callback
   */
  static invite ({
    id,
    data,
    options: { email } = {},
    token,
  }, callback) {
    const JSONData = JSON.stringify(data);
    let path = `/document/${id}/invite`;

    if (email === 'disable') {
      path = `${path}?email=disable`;
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

  /**
   * Merge documents optional settings
   * @typedef {Object} DocumentMergeOptions
   * @property {boolean} [removeOriginalDocuments=false] - if true original documents will be removed
   */

  /**
   * Merge documents payload
   * @typedef {Object} DocumentMergeParams
   * @property {string} token - your auth token
   * @property {string} name - new name for merged document
   * @property {string[]} document_ids - an array of document IDs
   * @property {DocumentMergeOptions} options - merge documents optional settings
   */

  /**
   * Merge documents response data
   * @typedef {Object} DocumentMergeResponse
   * @property {string} document_id - an ID of merged document
   */

  /**
   * Merges existing documents into one.
   * By default original documents are not removed after merging. To remove original documents set `removeOriginalDocuments` option to `true`.
   * @param {DocumentMergeParams} data - merge documents payload
   * @param {function(err: ApiErrorResponse, res: DocumentMergeResponse)} [callback] - error first node.js callback
   */
  static merge ({
    name,
    document_ids,
    options: { removeOriginalDocuments = false } = {},
    token,
  }, originalCallback) {
    const JSONData = JSON.stringify({
      upload_document: true,
      document_ids,
      name,
    });

    const callbackWithDocumentDeletion = (mergeErr, mergeRes) => {
      if (mergeErr) {
        originalCallback(mergeErr);
        return;
      } else {

        const removeDocument = ({ id }) => new Promise((resolve, reject) => {
          Document.remove({
            id,
            token,
          }, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res.status === 'success');
            }
          });
        });

        const documentsDeleted = document_ids
          .map(id => removeDocument({ id }));

        Promise.all(documentsDeleted)
          .then(deletionStatuses => deletionStatuses.reduce((generalStatus, currentStatus) => (generalStatus && currentStatus), true))
          .then(allDocumentsDeleted => {
            if (allDocumentsDeleted) {
              originalCallback(null, mergeRes);
              return;
            } else {
              throw new Error('Some of the original documents were not removed');
            }
          })
          .catch(removeErr => {
            originalCallback(removeErr);
            return;
          });

      }
    };

    const callback = removeOriginalDocuments
      ? callbackWithDocumentDeletion
      : originalCallback;

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
      .on('error', errorHandler(originalCallback));

    req.write(JSONData);
    req.end();
  }

  // get the history of a document
  static history ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'GET',
        path: `/document/${id}/history`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /**
   * Remove document payload
   * @typedef {Object} DocumentRemoveParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   */

  /**
   * Remove document response data
   * @typedef {Object} DocumentRemoveResponse
   * @property {string} status - status of deletion, e.g. 'success'
   */

  /**
   * Removes a specified document from folder
   * @param {DocumentRemoveParams} data - remove document payload
   * @param {function(err: ApiErrorResponse, res: DocumentRemoveResponse)} [callback] - error first node.js callback
   */
  static remove ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'DELETE',
        path: `/document/${id}`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

}

module.exports = Document;
