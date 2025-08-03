import { DocumentGetRequest, DocumentPostRequest, DocumentPutRequest, DocumentGetResponse, DocumentPostResponse, DocumentPutResponse, FieldRequestAttribute } from '@signnow/api-client/api/document';
import { BulkInvitePostRequest, TemplatePostRequest, BulkInvitePostResponse, TemplatePostResponse } from '@signnow/api-client/api/template';
import { Sdk } from '@signnow/api-client/core';

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
  const fields: FieldRequestAttribute[] = [{
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