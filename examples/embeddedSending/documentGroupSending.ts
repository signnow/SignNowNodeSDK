import { DocumentPostRequest, DocumentPostResponse, DocumentPutRequest, DocumentPutResponse } from '../../src/api/document';
import { DocumentGroupPost as DocumentGroupPostRequest } from '../../src/api/documentGroup/request/documentGroupPost';
import { DocumentGroupPost as DocumentGroupPostResponse } from '../../src/api/documentGroup/response/documentGroupPost';
import { DocumentGroupEmbeddedSendingLinkPost as DocumentGroupEmbeddedSendingLinkPostRequest } from '../../src/api/embeddedSending/request/documentGroupEmbeddedSendingLinkPost';
import { DocumentGroupEmbeddedSendingLinkPost as DocumentGroupEmbeddedSendingLinkPostResponse } from '../../src/api/embeddedSending/response/documentGroupEmbeddedSendingLinkPost';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function createEmbeddedDocumentGroupSending(): Promise<DocumentGroupEmbeddedSendingLinkPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const documentGroupName = 'Embedded Sending Document Group';
  const signerRole1 = 'Manager';
  const signerRole2 = 'Accountant';
  const redirectUri = 'https://www.example.com/group-sending-completed';
  const linkExpiration = 30; // Link expiration time in minutes (0 means no expiration)
  const redirectTarget = 'blank';

  // 1. Upload documents for a group
  const documentPost1 = new DocumentPostRequest('./examples/_data/demo.pdf', 'first_document.pdf');
  const documentResponse1 = await client.send<DocumentPostResponse>(documentPost1);
  const documentId1 = documentResponse1.id;

  const documentPost2 = new DocumentPostRequest('./examples/_data/demo.pdf', 'second_document.pdf');
  const documentResponse2 = await client.send<DocumentPostResponse>(documentPost2);
  const documentId2 = documentResponse2.id;

  // 2. Add fields to both documents
  const field1Doc1 = {
    x: 205,
    y: 18,
    width: 122,
    height: 12,
    type: 'text',
    page_number: 0,
    required: true,
    role: signerRole1,
    name: 'text_field_1',
    label: 'First Document Field'
  };
  const documentPut1 = new DocumentPutRequest(documentId1, [field1Doc1]);
  await client.send<DocumentPutResponse>(documentPut1);

  const field1Doc2 = {
    x: 205,
    y: 100,
    width: 122,
    height: 12,
    type: 'text',
    page_number: 0,
    required: true,
    role: signerRole2,
    name: 'text_field_1',
    label: 'Second Document Field'
  };
  const documentPut2 = new DocumentPutRequest(documentId2, [field1Doc2]);
  await client.send<DocumentPutResponse>(documentPut2);

  // 3. Create a document group of the uploaded documents
  const documentGroupPost = new DocumentGroupPostRequest([documentId1, documentId2], documentGroupName);
  const documentGroupResponse = await client.send<DocumentGroupPostResponse>(documentGroupPost);
  const documentGroupId = documentGroupResponse.id;

  // 4. Create embedded sending link for the document group
  const embeddedGroupSendingRequest = new DocumentGroupEmbeddedSendingLinkPostRequest(
    documentGroupId,
    redirectUri,
    linkExpiration,
    redirectTarget
  );

  const response = await client.send<DocumentGroupEmbeddedSendingLinkPostResponse>(embeddedGroupSendingRequest);
  
  return response;
}

createEmbeddedDocumentGroupSending().then(displayResult).catch(displayResult);
