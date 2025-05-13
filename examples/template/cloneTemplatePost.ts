import { DocumentPost as DocumentPostRequest } from '../../src/api/document/request/documentPost';
import { DocumentPost as DocumentPostResponse } from '../../src/api/document/response/documentPost';
import { CloneTemplatePost as CloneTemplatePostRequest } from '../../src/api/template/request/cloneTemplatePost';
import { TemplatePost as TemplatePostRequest } from '../../src/api/template/request/templatePost';
import { CloneTemplatePost as CloneTemplatePostResponse } from '../../src/api/template/response/cloneTemplatePost';
import { TemplatePost  as TemplatePostResponse } from '../../src/api/template/response/templatePost';
import { Sdk } from '../../src/core/sdk';

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
