# signNow API NODE.JS SDK
## v3.0.0

[![Node.js Version](https://img.shields.io/badge/supported->=20-blue?logo=node.js)](https://nodejs.org/)

### Requirements
- Node.js 20 or higher

### Installation
Get SDK code
```bash
git clone git@github.com:signnow/SignNowNodeSDK.git
```
Install dependencies
```bash
npm install
```

### Configuration
Copy `.env.example` to `.env` and fill your credentials in the required values
```bash
cp .env.example .env
```

### Run tests
To run tests you need to have a valid `.env.test` file with credentials for testing.
If you don't have it, you can create it by copying the `.env.test.dist` file and renaming it to `.env.test`.
However, the file will be created automatically if you just run test execution with the following commands:
```bash
npm run test
```

### Usage
To start using the SDK, you need to create a new instance of the SDK API client and authenticate it using the credentials from the `.env` file.
Example of sending a request to get a document by id:
```typescript

import { Sdk, DocumentGet } from '@signnow/api-sdk';
import type { Document } from '@signnow/api-sdk';

const sdk = await new Sdk().authenticate();
const client = sdk.getClient();

const documentGet = new DocumentGet('29db9956636d481f9c532ef64951ae78209f7483');
const responseDocumentGet = await client.send<Document>(documentGet);
console.log('response document get', responseDocumentGet);
```

### Examples
You can find more examples of API usage in the [`examples`](./examples) directory.