import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function postDocument(): Promise<DocumentPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'test.pdf');
  const response = await client.send<DocumentPostResponse>(documentPost);

  return response;
}

postDocument().then(displayResultError).catch(displayResultError); 