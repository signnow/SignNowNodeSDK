import { DocumentPostRequest, DocumentPostResponse, DocumentPutRequest, DocumentPutResponse } from '@signnow/api-client/api/document';
import { SigningLinkPostRequest, SigningLinkPostResponse } from '@signnow/api-client/api/documentInvite';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function createSigningLink(): Promise<SigningLinkPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const redirectUri = 'https://www.example.com/after-signing';
  const signerRole = 'Manager';

  // 1. Upload the document
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'test.pdf');
  const responseDocumentPost = await client.send<DocumentPostResponse>(documentPost);
  const documentId = responseDocumentPost.id;

  // 2. Add fields and roles to the document
  const field = {
    x: 205,
    y: 18,
    width: 122,
    height: 12,
    type: 'text',
    page_number: 0,
    required: true,
    role: signerRole,
    name: 'text_field',
    label: 'Decision reason'
  };
  const documentPut = new DocumentPutRequest(documentId, [field]);
  await client.send<DocumentPutResponse>(documentPut);

  // 3. Generate a signing link for the document
  const signingLinkPost = new SigningLinkPostRequest(
    documentId,
    redirectUri
  );

  const response = await client.send<SigningLinkPostResponse>(signingLinkPost);

  return response;
}

createSigningLink().then(displayResultError).catch(displayResultError); 