import { DocumentPostRequest, DocumentPostResponse, DocumentGetRequest, DocumentGetResponse, DocumentPutRequest, DocumentPutResponse } from '@signnow/api-client/api/document';
import { SendInvitePostRequest, SendInvitePostResponse, ToRequestAttribute } from '@signnow/api-client/api/documentInvite';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function sendFieldInvite(): Promise<SendInvitePostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const senderEmail = 'sender@example.com';
  const signerEmail = 'signer@signnow.com';
  const signerRole = 'HR Manager';
  const emailSubject = 'You have got an invitation to sign the contact';
  const emailMessage = 'Please review and sign the attached document';

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

  // 3. Get the document by id to retrieve the roles IDs
  const documentGet = new DocumentGetRequest(documentId);
  const responseDocumentGet = await client.send<DocumentGetResponse>(documentGet);
  const roles = responseDocumentGet.roles;

  // 4. Send an invite for signature
  const recipients: ToRequestAttribute[] = roles.map(role => ({
    email: signerEmail,
    role: role.name,
    role_id: role.unique_id,
    order: parseInt(role.signing_order, 10),
    subject: emailSubject,
    message: emailMessage
  }));

  const sendInviteRequest = new SendInvitePostRequest(
    documentId,
    recipients,
    senderEmail,
    emailSubject,
    emailMessage
  );

  const response = await client.send<SendInvitePostResponse>(sendInviteRequest);

  return response;
}

sendFieldInvite().then(displayResultError).catch(displayResultError); 