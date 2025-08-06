# SignNow API Node.js SDK

## v3.0.0

[![Node.js Version](https://img.shields.io/badge/supported->=17-blue?logo=node.js)](https://nodejs.org/)

**Requirements**

- Node.js 17 or higher

**Installation**

Install the SDK from [`npm`](https://www.npmjs.com/package/@signnow/api-client):

```bash
npm install @signnow/api-client
```

**Configuration**

To authenticate and use the SDK, you need to set up environment variables with your API credentials.

- Create a `.env` file in the root of your project.
- Add the required API credentials to the file.

Example `.env` file:

```ini
##
## SignNow API SDK configuration
##

## Replace these dummy values with your actual credentials (except API_HOST)
SIGNNOW_API_HOST=https://api.signnow.com
SIGNNOW_API_BASIC_TOKEN=c2lnbk5vdyBBUEkgc2FtcGxlIEFwcCB2MS4wCg==
SIGNNOW_API_USERNAME=user@signnow.com
SIGNNOW_API_PASSWORD=coolest_pazzw0rd

# Absolute or relative (starts with .) path to the directory
# where the downloaded files will be stored (ensure you have write permissions to this directory)
## Default: ./storage/downloads
SIGNNOW_DOWNLOADS_DIR=./storage/downloads
```

> ⚠️ Do not commit `.env` files to version control.
>

**Usage**

To start using the SDK, create a new instance of the SDK API client and authenticate using the credentials from the `.env` file.

Example of retrieving the document information by ID:

```typescript
import { Sdk } from '@signnow/api-client/core/sdk';
import { DocumentGetRequest, DocumentGetResponse } from '@signnow/api-client/api/document';

const sdk = await new Sdk().authenticate();
const client = sdk.getClient();

const documentGet = new DocumentGetRequest('1b23ed1a6aaf4d3392ed0e88bc2bfafb2a3cf414');
const responseDocumentGet = await client.send<DocumentGetResponse>(documentGet);
console.log('response document get', responseDocumentGet);
```

**Examples**

Find more API usage examples in the [`examples`](https://github.com/signnow/SignNowNodeSDK/tree/master/examples) directory.