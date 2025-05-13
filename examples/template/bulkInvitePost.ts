import { Field } from '../../src/api/document/request/data/field';
import { DocumentGet as DocumentGetRequest } from '../../src/api/document/request/documentGet';
import { DocumentPost as DocumentPostRequest } from '../../src/api/document/request/documentPost';
import { DocumentPut as DocumentPutRequest } from '../../src/api/document/request/documentPut';
import { DocumentGet as DocumentGetResponse } from '../../src/api/document/response/documentGet';
import { DocumentPost as DocumentPostResponse } from '../../src/api/document/response/documentPost';
import { DocumentPut as DocumentPutResponse } from '../../src/api/document/response/documentPut';
import { BulkInvitePost as BulkInvitePostRequest } from '../../src/api/template/request/bulkInvitePost';
import { TemplatePost as TemplatePostRequest } from '../../src/api/template/request/templatePost';
import { BulkInvitePost as BulkInvitePostResponse } from '../../src/api/template/response/bulkInvitePost';
import { TemplatePost  as TemplatePostResponse } from '../../src/api/template/response/templatePost';
import { Sdk } from '../../src/core/sdk';

export async function postBulkInvite(): Promise<BulkInvitePostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  /**
   * Upload a document.
   */
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf');
  const documentPostResponse = await client.send<DocumentPostResponse>(documentPost);

  /**
   * Add a field to the document.
   */
  const fields: Field[] = [{
    x: 358,
    y: 171,
    width: 177,
    height: 50,
    type: 'signature',
    page_number: 0,
    required: true,
    role: 'Recipient 1'
  }];
  const documentPut = new DocumentPutRequest(documentPostResponse.id, fields);
  await client.send<DocumentPutResponse>(documentPut);

  /**
   * Get document information to retrieve the Documents folder.
   */
  const documentGet = new DocumentGetRequest(documentPostResponse.id);
  const documentGetResponse = await client.send<DocumentGetResponse>(documentGet);

  /**
   * Create a template from document.
   */
  const templatePost = new TemplatePostRequest(documentPostResponse.id, 'demo.pdf');
  const templatePostResponse = await client.send<TemplatePostResponse>(templatePost);

  /**
   * Create multiple invites to different signers from one template
   */
  const bulkInvitePost = new BulkInvitePostRequest(
    templatePostResponse.id,
    './examples/_data/bulk_invite.csv',
    documentGetResponse.parent_id
  );
  const response = await client.send<BulkInvitePostResponse>(bulkInvitePost);

  return response;
}

postBulkInvite().then(console.log, console.error);
