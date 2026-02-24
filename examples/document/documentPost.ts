import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function postDocument(): Promise<DocumentPostResponse> {
  const sdk = new Sdk({ apiKey: '{{API_KEY}}', basicToken: '{{BASIC_TOKEN}}' });
  const client = sdk.getClient();

  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'test.pdf');
  const response = await client.send<DocumentPostResponse>(documentPost);

  return response;
}

postDocument().then(displayResultError).catch(displayResultError); 