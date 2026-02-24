# SignNow API Node.js SDK

## v3.2.0

[![Node.js Version](https://img.shields.io/badge/supported->=17-blue?logo=node.js)](https://nodejs.org/)

**Requirements**

- Node.js 17 or higher

**Installation**

Install the SDK from [`npm`](https://www.npmjs.com/package/@signnow/api-client):

```bash
npm install @signnow/api-client
```

**Usage**

To start using the SDK, initialize the client with your credentials.
You can authenticate using either an API key:
```typescript
const sdk = new Sdk({ apiKey: '{{API_KEY}}' });
```
or by exchanging your Basic authorization token, username, and password for an access token:
```typescript
const sdk = await new Sdk({ basicToken: '{{BASIC_TOKEN}}' }).authenticate(username, password);
```
**Note:** While the Basic authorization token is optional for requests authenticated via API key, it is required for:
* Generating OAuth 2.0 access tokens.
* Accessing specific endpoints, such as [/api/v2/events](https://docs.signnow.com/docs/signnow/basic-auth).

For details on generating tokens and endpoint requirements, refer to the [SignNow Authentication Guide](https://docs.signnow.com/docs/signnow/authentication).

Example of retrieving the document information by ID:

```typescript
import { Sdk } from '@signnow/api-client/core/sdk';
import { DocumentGetRequest, DocumentGetResponse } from '@signnow/api-client/api/document';

const sdk = new Sdk({ apiKey: '{{API_KEY}}', basicToken: '{{BASIC_TOKEN}}' });
const client = sdk.getClient();

const documentGet = new DocumentGetRequest('1b23ed1a6aaf4d3392ed0e88bc2bfafb2a3cf414');
const responseDocumentGet = await client.send<DocumentGetResponse>(documentGet);
console.log('response document get', responseDocumentGet);
```

**Examples**

Find more API usage examples in the [`examples`](https://github.com/signnow/SignNowNodeSDK/tree/master/examples) directory.