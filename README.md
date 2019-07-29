# SignNow API client v1.2.0

SignNow REST Service Wrapper

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/signnow/SignNowNodeSDK/blob/master/LICENSE.md)

### <a name="table-of-contents"></a>Table of Contents

1. [About SignNow](#about-signnow)
2. [API Contact Information](#api-contact-info)
3. [API and Application](#api-and-app)
4. [Installation](#installation)
5. [Documentation](#documentation)
6. [Examples](#examples)
    * [User](#user)
      * [Create a User](#create-user)
      * [Retrieve User Information](#get-user)
    * [OAuth 2.0](#oauth2)
      * [Request Access Token](#get-token)
      * [Verify an Access Token](#verify-token)
    * [Document](#document)
      * [Retrieve a List of the User’s Documents](#list-documents)
      * [Retrieve a Document Resource](#get-document)
      * [Download a Collapsed Document](#download-document)
      * [Upload Document](#upload-document)
      * [Upload File & Extract Fields](#extract-fields)
      * [Update Document (add fields)](#update-document)
      * [Create Invite to Sign a Document](#field-invite)
      * [Create Free Form Invite](#freeform-invite)
      * [Cancel Field Invite to Sign a Document](#cancel-invite)
      * [Create a One-time Use Download URL](#share-document)
      * [Merge Existing Documents](#merge-documents)
      * [Get Document History](#get-history)
      * [Remove Document](#remove-document)
    * [Enumerations](#enumerations)
      * [Add Enumeration Field to a Document](#add-enumeration)
      * [Add Enumeration Options to the Field](#enumeration-options)
    * [Template](#template)
      * [Create a Template](#create-template)
      * [Duplicate a Template](#copy-template)
    * [Folder](#folder)
      * [Returns a list of folders](#list-folders)
      * [Returns a list of documents inside a folder](#list-documents-in-folder)
    * [Webhook](#webhook)
      * [Returns a list of Webhooks](#list-webhooks)
      * [Create a Webhook](#create-webhook)
    * [Promisify methods](#promisify)
7. [Unit Tests](#unit-tests)</li>
8. [License](#license)</li>
9. [Additional Contact Information](#contacts)
    * [Support](#support)
    * [Sales](#sales)

### <a name="about-signnow"></a>About SignNow

SignNow is a powerful web-based e-signature solution that streamlines the signing process and overall document flow for businesses of any size. SignNow offers SaaS as well as public and private cloud deployment options using the same underlying API. With SignNow you can easily sign, share and manage documents in compliance with international data laws and industry-specific regulations. SignNow enables you to collect signatures from partners, employees and customers from any device within minutes.

### <a name="api-contact-info"></a>API Contact Information

If you have questions about the SignNow API, please visit [https://help.signnow.com/docs](https://help.signnow.com/docs) or email [api@signnow.com](mailto:api@signnow.com).

See additional contact information at the bottom.

### <a name="api-and-app"></a>API and Application

Resources | Sandbox | Production
------------- | ------------- | -------------
API: | **api-eval.signnow.com:443** | **api.signnow.com:443**
Application: | [https://app-eval.signnow.com](https://app-eval.signnow.com) | [https://app.signnow.com](https://app.signnow.com)
Entry page: | [https://eval.signnow.com](https://eval.signnow.com) |

## <a name="installation"></a>Installation

`@signnow/api-client` supports node.js **v6.4.0** or later.

To install the latest version of `@signnow/api-client` run:

```bash
npm install @signnow/api-client
```

## <a name="documentation"></a>Documentation

See api reference in our [Documentation](https://signnow.github.io/SignNowNodeSDK/).

## <a name="examples"></a>Examples

To run the examples you will need an API key. You can get one here [https://www.signnow.com/api](https://www.signnow.com/api). For a full list of accepted parameters, refer to the SignNow REST Endpoints API guide: [https://help.signnow.com/docs](https://help.signnow.com/docs).

Every resource is accessed via your api client instance:

```javascript
const api = require('@signnow/api-client')({
  credentials: 'ENCODED_CLIENT_CREDENTIALS',
  production: false, // if false uses eval server
});
```

Every resource returns two parameters. The first param contains any errors and the second contains the results.

### <a name="user"></a>User

#### <a name="create-user"></a>Create a User

```javascript
api.user.create({
  first_name: 'John',
  last_name: 'Wayne',
  email: 'john@domain.com',
  password: 'yourpwd',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="get-user"></a>Retrieve User Information

```javascript
api.user.retrieve({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
}
});
```

### <a name="oauth2"></a>OAuth 2.0

#### <a name="get-token"></a>Request Access Token

```javascript
api.oauth2.requestToken({
  username: 'username',
  password: 'password',
}, function(err, res){
  // handle error or process response data
});
```

#### <a name="verify-token"></a>Verify an Access Token

```javascript
api.oauth2.verify({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

### <a name="document"></a>Document

#### <a name="list-documents"></a>Retrieve a List of the User’s Documents

```javascript
api.document.list({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="get-document"></a>Retrieve a Document Resource

```javascript
api.document.view({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="download-document"></a>Download a Collapsed Document

```javascript
api.document.download({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="upload-document"></a>Upload Document

```javascript
api.document.create({
  token: 'your auth token',
  filepath: 'path to file',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="extract-fields"></a>Upload File & Extract Fields

```javascript
api.document.fieldextract({
  token: 'your auth token',
  filepath: 'path to file',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="update-document"></a>Update Document (add fields)

```javascript
const fields = {
  texts: [
    {
      size: 8,
      x: 61,
      y: 72,
      page_number: 0,
      font: 'Arial',
      data: 'sample text',
      line_height: 9.075,
    },
  ],
}

api.document.update({
  token: 'your auth token',
  id: 'document id',
  fields,
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="field-invite"></a>Create Invite to Sign a Document

```javascript
const fieldInvite = {
  document_id: 'DOCUMENT_ID_GOES_HERE',
  from: 'EMAIL_OF_SENDER',
  to: [
    {
      email: 'EMAIL_OF_SIGNER',
      role: 'Signer 1',
      role_id: 'ROLE_ID', // can be discovered in document details
      order: 1,
      reassign: '0',
      decline_by_signature: '0',
      reminder: 4,
      expiration_days: 27,
      subject: 'Field invite Signer1',
      message: 'Message',
    },
  ],
};

api.document.invite({
  data: {
    ...fieldInvite,
  },
  id: 'DOCUMENT_ID_GOES_HERE',
  token: 'YOUR_AUTH_TOKEN',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="freeform-invite"></a>Create Free Form Invite

```javascript
api.document.invite({
  token: 'your auth token',
  id: 'document id',
  data: {
    from: 'email address',
    to: 'email address',
  },
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="cancel-invite"></a>Cancel Field Invite to Sign a Document

```javascript
api.document.cancelInvite({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="share-document"></a>Create a One-time Use Download URL

```javascript
api.document.share({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="merge-documents"></a>Merge Existing Documents

```javascript
api.document.merge({
  token: 'your auth token',
  name: 'the merged doc',
  document_ids: [
    '84a18d12bf7473ea3dd0e4dd1cdcded6ba6281aa',
    'a71d963c49f33176e90c5827069c422616b1500c',
  ],
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="get-history"></a>Get Document History

```javascript
api.document.history({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="remove-document"></a>Remove Document

```javascript
api.document.remove({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

### <a name="enumerations"></a>Enumerations

#### <a name="add-enumeration"></a>Add Enumeration Field to a Document

```javascript
api.enumerations.addField({
  token: 'your auth token',
  document_id: 'document id',
  x: 150,
  y: 200,
  width: 200,
  height: 50,
  page_number: 0,
  role: 'buyer',
  required: true,
  label: 'Clothing Brand',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="enumeration-options"></a>Add Enumeration Options to the Field

```javascript
api.enumerations.addOptions({
  token: 'your auth token',
  enumeration_options: [
    {
      enumeration_id: '8a3501896160b12d4ef7507a81b2f0998b8137b1',
      data: 'Active',
    },
    {
      enumeration_id: '8a3501896160b12d4ef7507a81b2f0998b8137b1',
      data: 'Old Navy',
    },
    {
      enumeration_id: '8a3501896160b12d4ef7507a81b2f0998b8137b1',
      data: 'Volcom',
    },
  ],
}, (err, res) => {
  // handle error or process response data
});
```

### <a name="template"></a>Template

#### <a name="create-template"></a>Create a Template

```javascript
api.template.create({
  token: 'your auth token',
  document_id: 'document id',
  document_name: 'my template',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="copy-template"></a>Duplicate a Template

```javascript
api.template.duplicate({
  token: 'your auth token',
  id: 'document id',
  name: 'my template',
}, (err, res) => {
  // handle error or process response data
});
```

### <a name="folder"></a>Folder

#### <a name="list-folders"></a>Returns a list of folders

```javascript
api.folder.list({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="list-documents-in-folder"></a>Returns a list of documents inside a folder

Filters  | Values
------------- | -------------
```signing-status```  | ```waiting-for-me```, ```waiting-for-others```, ```signed```, ```pending```
```document-updated```  | ```new Date()```
```document-created```  | ```new Date()```

Sort  | Values
------------- | -------------
```document-name```  | ```asc```/```desc```
```updated```  | ```asc```/```desc```
```created```  | ```asc```/```desc```

```javascript
api.folder.documents({
  token: 'your auth token',
  id: 'folder id',
  filter: [
    {
      'signing-status': 'pending',
    },
  ],
  sort: {
    'document-name': 'asc',
  },
}, (err, res) => {
  // handle error or process response data
});
```

### <a name="webhook"></a>Webhook

#### <a name="list-webhooks"></a>Returns a list of Webhooks

```javascript
signnow.webhook.list({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

#### <a name="create-webhook"></a>Create a Webhook

Events  | Description
------------- | -------------
```document.create```  | Webhook is triggered when a document is uploaded to users account in SignNow
```document.update```  | Webhook is triggered when a document is updated (fields added, text added, signature added, etc.)
```document.delete```  | Webhook is triggered when a document is deleted from
```invite.create```  | Webhook is triggered when an invitation to a SignNow document is created.
```invite.update```  | Webhook is triggered when an invite to SignNow document is updated. Ex. A signer has signed the document.

```javascript
api.webhook.create({
  token: 'your auth token',
  event: 'document.create',
  callback_url: 'http://www.domain.com/path',
}, (err, res) => {
  // handle error or process response data
});
```

### <a name="promisify"></a>Promisify methods

If you are using node.js version **8.0.0** or higher you can use built in [*promisify*](https://nodejs.org/api/util.html#util_util_promisify_original) utility:

```javascript
const { promisify } = require('util');
const api = require('@signnow/api-client')({
  credentials: 'ENCODED_CLIENT_CREDENTIALS',
  production: false, // if false uses eval server
});
const requestToken = promisify(api.oauth2.requestToken);

requestToken({
  username: 'username',
  password: 'password',
})
  .then(res => {
    // process response data
  })
  .catch(err => {
    // handle error
  });
```

## <a name="unit-tests"></a>Unit Tests

To run the unit test you will need to install "Mocha" and "Chai". You also need to edit a [test.settings.js](https://github.com/signnow/SignNowNodeSDK/blob/master/test/test.settings.js) in the [test](https://github.com/signnow/SignNowNodeSDK/tree/master/test) folder of the api client module. The file need to contain the following:

```javascript
exports.settings = {
  credentials: '[ENCODED CLIENT CREDENTIALS]',
  token: '[ACCESS TOKEN]',
  username: '[SIGNNOW USERNAME]',
  password: '[SIGNNOW PASSWORD]',
  documentid: '[EXISTING DOCUMENT ID]',
  templateid: '[EXISTING TEMPLATE ID]',
  folderid: '[EXISTING FOLDER ID]',
  email: '[FROM EMAIL FOR INVITE]',
  testemail: '[TO EMAIL FOR INVITE]',
};
```

## <a name="license"></a>License

This project is released under the MIT [License](https://github.com/signnow/SignNowNodeSDK/blob/master/LICENSE.md).

## <a name="contacts"></a>Additional Contact Information

### <a name="support"></a>Support

To contact SignNow support, please email [support@signnow.com](mailto:support@signnow.com).

### <a name="sales"></a>Sales

For pricing information, please call [(800) 831-2050](tel:8008312050) or email [sales@signnow.com](mailto:sales@signnow.com).
