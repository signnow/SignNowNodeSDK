import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { FreeFormInvitePostRequest, FreeFormInvitePostResponse } from '@signnow/api-client/api/documentInvite';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function sendFreeFormInvite(): Promise<FreeFormInvitePostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const senderEmail = 'sender@signnow.com';
  const recipientEmail = 'recipient@signnow.com';

  // 1. Upload the document
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'test.pdf');
  const responseDocumentPost = await client.send<DocumentPostResponse>(documentPost);
  const documentId = responseDocumentPost.id;

  // 2. Send a free-form invite
  const freeFormInvite = new FreeFormInvitePostRequest(
    documentId,
    recipientEmail,
    senderEmail
  );

  const response = await client.send<FreeFormInvitePostResponse>(freeFormInvite);

  return response;
}

sendFreeFormInvite().then(displayResultError).catch(displayResultError); 