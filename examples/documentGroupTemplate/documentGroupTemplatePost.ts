import { DocumentPost as DocumentPostRequest } from '../../src/api/document/request/documentPost';
import { DocumentPost as DocumentPostResponse } from '../../src/api/document/response/documentPost';
import { TemplatePost as TemplatePostRequest } from '../../src/api/template/request/templatePost';
import { TemplatePost as TemplatePostResponse } from '../../src/api/template/response/templatePost';
import { GroupTemplateGet as GroupTemplateGetRequest } from '../../src/api/template/request/groupTemplateGet';
import { GroupTemplateGet as GroupTemplateGetResponse } from '../../src/api/template/response/groupTemplateGet';
import { DocumentGroupTemplatePost as DocumentGroupTemplatePostRequest } from '../../src/api/documentGroupTemplate/request/documentGroupTemplatePost';
import { DocumentGroupTemplatePost as DocumentGroupTemplatePostResponse } from '../../src/api/documentGroupTemplate/response/documentGroupTemplatePost';
import { Sdk } from '../../src/core/sdk';

export async function postDocumentGroupTemplate(): Promise<DocumentGroupTemplatePostResponse> {
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
    null
  );
  const response = await client.send<DocumentGroupTemplatePostResponse>(documentGroupTemplatePost);

  return response;
}

postDocumentGroupTemplate().then(console.log, console.error); 
