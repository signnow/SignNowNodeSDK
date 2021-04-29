'use strict';
const https = require('https');
const { readFileSync } = require('fs');
const { basename, extname } = require('path');
const {
  responseHandler,
  errorHandler,
  buildRequestOptions,
  stringifyQueryParams,
  getMimeTypeByFileExtension,
  isDocumentTypeAcceptable,
  getFormDataBoundary,
  getByDeclinedStatus,
  getSignerEmails,
} = require('../common');
const { promisify } = require('../../utils');

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
    const fileExt = extname(filepath).substr(1);

    if (!isDocumentTypeAcceptable(fileExt)) {
      callback('File type isn\'t supported.');
      return;
    }

    let fileContent;

    try {
      fileContent = readFileSync(filepath);
    } catch (err) {
      callback(err);
      return;
    }

    const mimeType = getMimeTypeByFileExtension(fileExt);
    const formDataBoundary = getFormDataBoundary();
    const formDataBeginning = `--${formDataBoundary}\r\n`
      .concat(`Content-Disposition: form-data; name="file"; filename="${basename(filepath)}"\r\n`)
      .concat(`Content-Type: ${mimeType}\r\n\r\n`);
    const formDataEnding = `\r\n--${formDataBoundary}\r\n`;

    const payload = Buffer.concat([
      Buffer.from(formDataBeginning, 'utf8'),
      fileContent,
      Buffer.from(formDataEnding, 'utf8'),
    ]);

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/document',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formDataBoundary}`,
          'Content-Length': Buffer.byteLength(payload),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(payload);
    req.end();
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
    const fileExt = extname(filepath).substr(1);

    if (!isDocumentTypeAcceptable(fileExt)) {
      callback('File type isn\'t supported.');
      return;
    }

    let fileContent;

    try {
      fileContent = readFileSync(filepath);
    } catch (err) {
      callback(err);
      return;
    }

    const mimeType = getMimeTypeByFileExtension(fileExt);
    const formDataBoundary = getFormDataBoundary();
    const formDataBeginning = `--${formDataBoundary}\r\n`
      .concat(`Content-Disposition: form-data; name="file"; filename="${basename(filepath)}"\r\n`)
      .concat(`Content-Type: ${mimeType}\r\n\r\n`);
    const formDataEnding = `\r\n--${formDataBoundary}\r\n`;

    const payload = Buffer.concat([
      Buffer.from(formDataBeginning, 'utf8'),
      Buffer.from(fileContent, 'binary'),
      Buffer.from(formDataEnding, 'utf8'),
    ]);

    const req = https
      .request(buildRequestOptions({
        method: 'POST',
        path: '/document/fieldextract',
        authorization: {
          type: 'Bearer',
          token,
        },
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formDataBoundary}`,
          'Content-Length': Buffer.byteLength(payload),
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback));

    req.write(payload);
    req.end();
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
   * @property {DocumentThumbnails} thumbnail - thumbnail urls with different sizes (small, medium, large)
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
   * Document thumbnail urls with different sizes (small, medium, large)
   * @typedef {Object} DocumentThumbnails
   * @property {string} large
   * @property {string} medium
   * @property {string} small
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
   * @property {DocumentThumbnails} thumbnail - thumbnail urls with different sizes (small, medium, large)
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
   * @param {DocumentViewParams} data - view document details payload
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
   * Download document optional settings
   * @typedef {Object} DocumentDownloadOptions
   * @property {boolean} [withAttachments=false] - if true document will be downloaded as zip package with its attachments
   * @property {boolean} [withHistory=false] - if true document will be downloaded with history
   */

  /**
   * Document download payload
   * @typedef {Object} DocumentDownloadParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   * @property {DocumentDownloadOptions} options - download document optional settings
   */

  /**
   * Document binary data
   * @typedef {Buffer} DocumentDownloadResponse
   */

  /**
   * Downloads document with embedded fields and elements.
   * By default document is downloaded without history. To download document with history set `withHistory` option to `true`.
   * @param {DocumentDownloadParams} data - download document request payload
   * @param {function(err: ApiErrorResponse, res: DocumentDownloadResponse)} [callback] - error first node.js callback
   */
  static download ({
    id,
    token,
    options: {
      withAttachments = false,
      withHistory = false,
    } = {},
  }, callback) {
    const queryParams = {};
    const clientTimestamp = Math.floor(Date.now() / 1000);

    queryParams.type = withAttachments ? 'zip' : 'collapsed';
    withHistory && (queryParams.with_history = '1');

    https
      .request(buildRequestOptions({
        method: 'GET',
        path: `/document/${id}/download?client_timestamp=${clientTimestamp}&${stringifyQueryParams(queryParams)}`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /**
   * Document share payload
   * @typedef {Object} DocumentShareParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   */

  /**
   * Document share response data
   * @typedef {Object} DocumentShareResponse
   * @property {string} link - link to download specified document in PDF format
   */

  /**
   * Requests a link to download document with embedded fields and elements
   * Link can be used once and then will expire
   * @param {DocumentShareParams} data - share document request payload
   * @param {function(err: ApiErrorResponse, res: DocumentShareResponse)} [callback] - error first node.js callback
   */
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
   * @property {string} [role_id] - role unique id (can be discovered in document details)
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
   * @property {string} [email] - ability to disable invitation by email. to disable email assign value 'disable'
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
    const inviteData = Object.assign({}, data, { document_id: id });

    const JSONData = JSON.stringify(inviteData);
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

  /**
   * Cancel freeform invite payload
   * @typedef {Object} CancelFreeformInviteParams
   * @property {string} id - unique id of invite
   * @property {string} token - your auth token
   */

  /**
   * Cancel freeform invite response data
   * @typedef {Object} CancelFreeformInviteResponse
   * @property {string} id - unique id of invite
   */

  /**
   * Cancels sent freeform invite
   * @param {CancelFreeformInviteParams} data - cancel freeform invite payload
   * @param {function(err: ApiErrorResponse, res: CancelFreeformInviteResponse)} [callback] - error first node.js callback
   */
  static cancelFreeFormInvite ({ id, token }, callback) {
    https
      .request(buildRequestOptions({
        method: 'PUT',
        path: `/invite/${id}/cancel`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(callback))
      .end();
  }

  /**
   * Cancel document field invite payload
   * @typedef {Object} DocumentFieldInviteCancelParams
   * @property {string} id - an id of document
   * @property {string} token - your auth token
   */

  /**
   * Cancel document field invite response data
   * @typedef {Object} DocumentFieldInviteCancelResponse
   * @property {string} status - status of field invite cancellation, e.g. 'success'
   */

  /**
   * Cancels an invite to a document
   * @param {DocumentFieldInviteCancelParams} data - cancel field invite payload
   * @param {function(err: ApiErrorResponse, res: DocumentFieldInviteCancelResponse)} [callback] - error first node.js callback
   */
  static cancelFieldInvite ({ id, token }, callback) {
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
   * Cancels an invite to a document
   * @deprecated use Document.cancelFieldInvite instead of this
   * @param {DocumentFieldInviteCancelParams} data - cancel field invite payload
   * @param {function(err: ApiErrorResponse, res: DocumentFieldInviteCancelResponse)} [callback] - error first node.js callback
   */
  static cancelInvite ({ id, token }, callback) {
    Document.cancelFieldInvite({
      id,
      token,
    }, callback);
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
   * @param {function(err: ApiErrorResponse, res: DocumentMergeResponse)} [originalCallback] - error first node.js callback
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

  /**
   * Document history payload
   * @typedef {Object} DocumentHistoryParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   */

  /**
   * Document action log item
   * @typedef {Object} DocumentEvent
   * @property {string} client_app_name - name of a client application
   * @property {?string} client_timestamp - client application timestamp
   * @property {string} created - timestamp of action creation
   * @property {string} email - email of an actor
   * @property {string} event - name of event
   * @property {string} ip_address - actor's IP address
   * @property {?string} element_id - an ID of specific element
   * @property {?string} field_id - an ID of specific field
   * @property {?string} json_attributes - field attributes (e.g. font, style, size etc.)
   * @property {string} [document_id] - an ID of specific document
   * @property {string} [origin] - an origin of document
   * @property {string} [unique_id] - an ID of event
   * @property {string} [user_agent] - user agent
   * @property {string} [user_id] - id of an actor
   * @property {string} [version] - version of signed document (incremented after each signature addition)
   */

  /**
   * Document history response data
   * @typedef {DocumentEvent[]} DocumentHistoryResponse
   */

  /**
   * Retrieves a document action log (history) data
   * @param {DocumentHistoryParams} data -  payload
   * @param {function(err: ApiErrorResponse, res: DocumentHistoryResponse)} [callback] - error first node.js callback
   */
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
   * Document remove optional settings
   * @typedef {Object} DocumentRemoveOptions
   * @property {boolean} [cancelInvites=false] - ability to cancel all document invites during deletion
   */

  /**
   * Remove document payload
   * @typedef {Object} DocumentRemoveParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   * @property {DocumentRemoveOptions} [options] - document remove optional settings
   */

  /**
   * Remove document response data
   * @typedef {Object} DocumentRemoveResponse
   * @property {string} status - status of deletion, e.g. 'success'
   */

  /**
   * Removes a specified document from folder
   * @param {DocumentRemoveParams} data - remove document payload
   * @param {function(err: ApiErrorResponse, res: DocumentRemoveResponse)} [originalCallback] - error first node.js callback
   */
  static remove ({
    id: documentId,
    token,
    options: { cancelInvites = false } = {},
  }, originalCallback) {
    const callbackWithInviteCancellation = (removeErr, removeRes) => {
      if (removeErr) {
        originalCallback(removeErr);
        return;
      } else {
        promisify(Document.view)({
          id: documentId,
          token,
        })
          .then(document => {
            const { field_invites: fieldInvites, requests: freeformInvites } = document;
            return {
              fieldInvites,
              freeformInvites,
            };
          })
          .then(({ fieldInvites, freeformInvites }) => {
            const fieldInvitesCancelled = new Promise(resolve => {
              if (Array.isArray(fieldInvites) && fieldInvites.length) {
                resolve(promisify(Document.cancelFieldInvite)({
                  id: documentId,
                  token,
                }));
              } else {
                resolve({ status: 'success' });
              }
            })
              .then(({ status }) => status === 'success');

            const freeformInvitesCancelled = freeformInvites
              .map(({ id: inviteId }) => {
                return promisify(Document.cancelFreeFormInvite)({
                  id: inviteId,
                  token,
                })
                  .then(({ id }) => !!id);
              });

            Promise.all([
              fieldInvitesCancelled,
              ...freeformInvitesCancelled,
            ])
              .then(allInvitesCancelled => {
                if (allInvitesCancelled) {
                  originalCallback(null, removeRes);
                  return;
                } else {
                  throw new Error('Some of invites have not been cancelled');
                }
              })
              .catch(err => {
                originalCallback(err.message);
                return;
              });
          });
      }
    };

    const callback = cancelInvites
      ? callbackWithInviteCancellation
      : originalCallback;

    https
      .request(buildRequestOptions({
        method: 'DELETE',
        path: `/document/${documentId}`,
        authorization: {
          type: 'Bearer',
          token,
        },
      }), responseHandler(callback))
      .on('error', errorHandler(originalCallback))
      .end();
  }

  /**
   * Get Document Signers optional settings
   * @typedef {Object} DocumentSignersOptions
   * @property {boolean} [allSignatures=true] - if true receive all document signers email
   * @property {boolean} [freeFormInvites=false] - if `true` return free from invite signer emails
   * @property {?string[]} [fieldInvitesStatus=null] - return signers according to specified field invite status(es)
   * Accepts list of statuses or a single status.
   * Acceptable statuses: all, pending, declined, fulfilled, created, skipped.
   * @property {?string[]} [paymentRequestsStatus=null] - return signers according to specified to payment request status(es)
   * Accepts list of statuses or a single status.
   * Available statuses: all, pending, fulfilled, created, skipped.
   */

  /**
   * Get Document Signers payload
   * @typedef {Object} DocumentSignersParams
   * @property {string} id - id of specific document
   * @property {string} token - your auth token
   * @property {DocumentSignersOptions} [options] - document signers optional settings,
   */

  /**
   * Get Document Signers response data
   * @typedef {Object} DocumentSignersResponse
   * @property {string[]}  - emails of document signers
   */

  /**
   * Retrieves all signers of specific document
   * @experimental this class includes breaking change.
   * @param {DocumentSignersParams} data - get document signers payload
   * @param {function(err: ApiErrorResponse, res: DocumentSignersResponse)} [callback] - error first node.js callback
   */
  static signers ({
    id,
    token,
    options = {},
  }, callback) {
    promisify(Document.view)({
      id,
      token,
    })
      .then(document => {
        const {
          requests,
          field_invites,
        } = document;

        const {
          freeFormInvites = false,
          fieldInviteStatus = null,
          paymentRequestStatus = null,
        } = options;

        const emails = [];

        if (Object.keys(options).length === 0) {
          const fieldInvitesEmails = getSignerEmails(field_invites, 'email') || [];
          const freeFormInvitesEmails = getSignerEmails(requests, 'signer_email') || [];

          emails.push(...fieldInvitesEmails);
          emails.push(...freeFormInvitesEmails);
        }

        if (freeFormInvites) {
          const freeFomInvites = getSignerEmails(requests, 'signer_email') || [];

          emails.push(...freeFomInvites);
        }

        if (fieldInviteStatus) {
          const fieldInvites = getSignerEmails(field_invites, 'email', fieldInviteStatus) || [];
          const declined = getByDeclinedStatus(field_invites, fieldInviteStatus) || [];

          if (fieldInvites.length > 0) {
            emails.push(...fieldInvites);
          } else {
            emails.push(...fieldInvites);
            emails.push(...declined);
          }
        }

        if (paymentRequestStatus) {
          const paymentRequests = getSignerEmails(field_invites, 'email', paymentRequestStatus) || [];

          emails.push(...paymentRequests);
        }

        callback(null, [...new Set(emails)]);
      })
      .catch(err => callback(err));
  }
}

module.exports = Document;
