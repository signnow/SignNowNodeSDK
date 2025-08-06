import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { CloneTemplatePostRequest, TemplatePostRequest, CloneTemplatePostResponse, TemplatePostResponse } from '@signnow/api-client/api/template';
import { Sdk } from '@signnow/api-client/core';

export async function postTemplateCopy(): Promise<CloneTemplatePostResponse> {
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
  const templatePost = new TemplatePostRequest(documentPostResponse.id, 'demo-template.pdf');
  const templatePostResponse = await client.send<TemplatePostResponse>(templatePost);

  /**
   * Create a document from a template.
   */
  const templateCopyPost = new CloneTemplatePostRequest(templatePostResponse.id, 'demo-template-copy.pdf');
  const response = await client.send<CloneTemplatePostResponse>(templateCopyPost);

  return response;
}

postTemplateCopy().then(console.log, console.error); 