import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { TemplatePostRequest, TemplatePostResponse } from '@signnow/api-client/api/template';
import { Sdk } from '@signnow/api-client/core';

export async function postTemplate(): Promise<TemplatePostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  /**
   * Upload a document.
   */
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf');
  const documentPostResponse = await client.send<DocumentPostResponse>(documentPost);

  /**
   * Create a template from document.
   */
  const templatePost = new TemplatePostRequest(documentPostResponse.id, 'demo.pdf');
  const response = await client.send<TemplatePostResponse>(templatePost);

  return response;
}

postTemplate().then(console.log, console.error); 