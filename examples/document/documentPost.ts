import { DocumentPostRequest, DocumentPostResponse } from '../../src/api/document';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function postDocument(): Promise<DocumentPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'test.pdf');
  const response = await client.send<DocumentPostResponse>(documentPost);

  return response;
}

postDocument().then(displayResult).catch(displayResult);
