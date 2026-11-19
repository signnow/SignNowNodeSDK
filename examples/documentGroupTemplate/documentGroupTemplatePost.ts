import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { TemplatePostRequest, TemplatePostResponse, GroupTemplateGetRequest, GroupTemplateGetResponse } from '@signnow/api-client/api/template';
import { DocumentGroupTemplatePostRequest, DocumentGroupTemplatePostResponse } from '@signnow/api-client/api/documentGroupTemplate';
import { Sdk } from '@signnow/api-client/core';

export async function postDocumentGroupTemplate(): Promise<DocumentGroupTemplatePostResponse> {
  const sdk = new Sdk({ apiKey: '{{API_KEY}}', basicToken: '{{BASIC_TOKEN}}' });
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
   * Get template group information to retrieve the template_group_id.
   */
  const groupTemplateGet = new GroupTemplateGetRequest(templatePostResponse.id);
  const groupTemplateGetResponse = await client.send<GroupTemplateGetResponse>(groupTemplateGet);

  /**
   * Create a document group template from template group.
   */
  const documentGroupTemplatePost = new DocumentGroupTemplatePostRequest(
    groupTemplateGetResponse.id,
    'demo-document-group-template',
    new Date().toISOString(),
    null,
  );
  const response = await client.send<DocumentGroupTemplatePostResponse>(documentGroupTemplatePost);

  return response;
}

postDocumentGroupTemplate().then(console.log, console.error); 
