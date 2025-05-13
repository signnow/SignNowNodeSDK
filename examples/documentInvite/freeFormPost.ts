import { DocumentPostRequest, DocumentPostResponse } from '../../src/api/document';
import { FreeFormInvitePost } from '../../src/api/documentInvite/request/freeFormInvitePost';
import { FreeFormInvitePost as FreeFormInvitePostResponse } from '../../src/api/documentInvite/response/freeFormInvitePost';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

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
  const freeFormInvite = new FreeFormInvitePost(
    documentId,
    recipientEmail,
    senderEmail
  );

  const response = await client.send<FreeFormInvitePostResponse>(freeFormInvite);

  return response;
}

sendFreeFormInvite().then(displayResult).catch(displayResult);
