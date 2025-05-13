import { DocumentPost as DocumentPostRequest } from '../../src/api/document/request/documentPost';
import { DocumentPost as DocumentPostResponse } from '../../src/api/document/response/documentPost';
import { TemplatePost as TemplatePostRequest } from '../../src/api/template/request/templatePost';
import { TemplatePost  as TemplatePostResponse } from '../../src/api/template/response/templatePost';
import { Sdk } from '../../src/core/sdk';

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
