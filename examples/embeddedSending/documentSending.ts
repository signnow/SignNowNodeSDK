import { DocumentPostRequest, DocumentPostResponse, DocumentPutRequest, DocumentPutResponse } from '@signnow/api-client/api/document';
import { DocumentEmbeddedSendingLinkPostRequest, DocumentEmbeddedSendingLinkPostResponse } from '@signnow/api-client/api/embeddedSending';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function createEmbeddedDocumentSending(): Promise<DocumentEmbeddedSendingLinkPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const signerRole = 'Manager';
  const redirectUri = 'https://www.example.com/sending-completed'; // URL to redirect after signing
  const redirectTarget = 'blank';
  const sendingType = 'invite';
  const linkExpiration = 15; // Link expiration time in minutes (0 means no expiration)

  // 1. Upload document
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'document_to_send.pdf');
  const responseDocumentPost = await client.send<DocumentPostResponse>(documentPost);
  const documentId = responseDocumentPost.id;

  // 2. Add fields to the document
  const field1 = {
    x: 205,
    y: 20,
    width: 150,
    height: 14,
    type: 'text',
    page_number: 0,
    required: true,
    role: signerRole,
    name: 'text_field_1',
    label: 'Enter your name'
  };
  
  const field2 = {
    x: 205,
    y: 60,
    width: 150,
    height: 14,
    type: 'signature',
    page_number: 0,
    required: true,
    role: signerRole,
    name: 'signature_field_1',
    label: 'Sign here'
  };
  
  const documentPut = new DocumentPutRequest(documentId, [field1, field2]);
  await client.send<DocumentPutResponse>(documentPut);

  // 3. Create embedded sending link
  const embeddedSendingRequest = new DocumentEmbeddedSendingLinkPostRequest(
    documentId,
    sendingType,
    redirectUri,
    linkExpiration,
    redirectTarget
  );

  const response = await client.send<DocumentEmbeddedSendingLinkPostResponse>(embeddedSendingRequest);
  
  return response;
}

createEmbeddedDocumentSending().then(displayResultError).catch(displayResultError); 