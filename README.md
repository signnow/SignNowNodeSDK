# SignNow API client v1.2.0

SignNow REST Service Wrapper

### About SignNow

SignNow is a powerful web-based e-signature solution that streamlines the signing process and overall document flow for businesses of any size. SignNow offers SaaS as well as public and private cloud deployment options using the same underlying API. With SignNow you can easily sign, share and manage documents in compliance with international data laws and industry-specific regulations. SignNow enables you to collect signatures from partners, employees and customers from any device within minutes.

### API Contact Information

If you have questions about the SignNow API, please visit [https://help.signnow.com/docs](https://help.signnow.com/docs) or email [api@signnow.com](mailto:api@signnow.com).

See additional contact information at the bottom.

### API and Application

Resources | Sandbox | Production
------------- | ------------- | -------------
API: | **api-eval.signnow.com** | **api.signnow.com**
Application: | [https://app-eval.signnow.com](https://app-eval.signnow.com) | [https://app.signnow.com](https://app.signnow.com)
Entry page: | [https://eval.signnow.com](https://eval.signnow.com) |

## Installation

`@signnow/api-client` supports node.js **v6.4.0** or later.

To install the latest version of `@signnow/api-client` run:

```bash
npm install @signnow/api-client
```

## Documentation

See api reference in our [Documentation](https://signnow.github.io/SignNowNodeSDK/).

## Examples

To run the examples you will need an API key. You can get one here [https://www.signnow.com/api](https://www.signnow.com/api). For a full list of accepted parameters, refer to the SignNow REST Endpoints API guide: [https://help.signnow.com/docs](https://help.signnow.com/docs).

Every resource is accessed via your api client instance:

```javascript
const api = require('@signnow/api-client')({
  credentials: 'ENCODED_CLIENT_CREDENTIALS',
  production: false, // if false uses eval server
});
```

Every resource returns two parameters. The first param contains any errors and the second contains the results.

### User

#### Create a User

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

#### Retrieve User Information

```javascript
api.user.retrieve({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
}
});
```

### OAuth 2.0

#### Request Access Token

```javascript
api.oauth2.requestToken({
  username: 'username',
  password: 'password',
}, function(err, res){
  // handle error or process response data
});
```

#### Verify an Access Token

```javascript
api.oauth2.verify({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

### Document

#### Retrieve a List of the User’s Documents

```javascript
api.document.list({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

#### Retrieve a Document Resource

```javascript
api.document.view({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### Download a Collapsed Document

```javascript
api.document.download({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### Upload Document

```javascript
api.document.create({
  token: 'your auth token',
  filepath: 'path to file',
}, (err, res) => {
  // handle error or process response data
});
```

#### Upload File & Extract Fields

```javascript
api.document.fieldextract({
  token: 'your auth token',
  filepath: 'path to file',
}, (err, res) => {
  // handle error or process response data
});
```

#### Update Document (add fields)

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

#### Create Invite to Sign a Document

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

#### Cancel an Invite to a Document

```javascript
api.document.cancelInvite({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### Create a One-time Use Download URL

```javascript
api.document.share({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

#### Merge Existing Documents

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

#### Get Document History

```javascript
api.document.history({
  token: 'your auth token',
  id: 'document id',
}, (err, res) => {
  // handle error or process response data
});
```

### Enumerations

#### Add Enumeration Field to a Document

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

#### Add Enumeration Options to the Field

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

### Template

#### Create a Template

```javascript
api.template.create({
  token: 'your auth token',
  document_id: 'document id',
  document_name: 'my template',
}, (err, res) => {
  // handle error or process response data
});
```

#### Duplicate a Template

```javascript
api.template.duplicate({
  token: 'your auth token',
  id: 'document id',
  name: 'my template',
}, (err, res) => {
  // handle error or process response data
});
```

### Folder

#### Returns a list of folders

```javascript
api.folder.list({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

#### Returns a list of documents inside a folder

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

### Webhook

#### Returns a list of Webhooks

```javascript
signnow.webhook.list({
  token: 'your auth token',
}, (err, res) => {
  // handle error or process response data
});
```

#### Create a Webhook

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

### Promisify methods

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

## Unit Tests

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

## License

This project is released under the MIT license, which can be found in [License](https://github.com/signnow/SignNowNodeSDK/blob/master/LICENSE.md).

## Additional Contact Information

### Support

To contact SignNow support, please email [support@signnow.com](mailto:support@signnow.com).

### Sales

For pricing information, please call (800) 831-2050 or email [sales@signnow.com](mailto:sales@signnow.com).
