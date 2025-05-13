import { DocumentPostRequest, DocumentPostResponse, DocumentPutRequest, DocumentPutResponse } from '../../src/api/document';
import { DocumentGroupPost as DocumentGroupPostRequest } from '../../src/api/documentGroup/request/documentGroupPost';
import { DocumentGroupPost as DocumentGroupPostResponse } from '../../src/api/documentGroup/response/documentGroupPost';
import { GroupInvitePostRequest, GroupInvitePostResponse } from '../../src/api/documentGroupInvite';
import { InviteStepInviteActionRequest } from '../../src/api/documentGroupInvite';
import { InviteStepInviteStepRequest } from '../../src/api/documentGroupInvite';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function sendDocumentGroupInvite(): Promise<GroupInvitePostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const signerEmail = 'signer@signnow.com';
  const signerRole = 'CTO';
  const documentGroupName = 'Contract Package';

  // 1. Upload the first document
  const documentPost1 = new DocumentPostRequest('./examples/_data/demo.pdf', 'agreement.pdf');
  const responseDocumentPost1 = await client.send<DocumentPostResponse>(documentPost1);
  const documentId1 = responseDocumentPost1.id;

  // 2. Add a field to the first document
  const fieldDoc1 = {
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
  const documentPut1 = new DocumentPutRequest(documentId1, [fieldDoc1]);
  await client.send<DocumentPutResponse>(documentPut1);

  // 2. Upload the second document
  const documentPost2 = new DocumentPostRequest('./examples/_data/demo.pdf', 'addendum.pdf');
  const responseDocumentPost2 = await client.send<DocumentPostResponse>(documentPost2);
  const documentId2 = responseDocumentPost2.id;

  // 3. Add a field to the second document
  const fieldDoc2 = {
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
  const documentPut2 = new DocumentPutRequest(documentId2, [fieldDoc2]);
  await client.send<DocumentPutResponse>(documentPut2);

  // 4. Create a document group with the two documents
  const documentGroupPost = new DocumentGroupPostRequest([documentId1, documentId2], documentGroupName);
  const responseDocumentGroupPost = await client.send<DocumentGroupPostResponse>(documentGroupPost);
  const documentGroupId = responseDocumentGroupPost.id;

  // 5. Define invite actions for the document group
  const inviteActions: InviteStepInviteActionRequest[] = [
    {
      email: signerEmail,
      role_name: signerRole,
      action: 'sign',
      document_id: documentId1
    },
    {
      email: signerEmail,
      role_name: signerRole,
      action: 'sign',
      document_id: documentId2
    }
  ];

  // 6. Create invite steps
  const inviteSteps: InviteStepInviteStepRequest[] = [
    {
      order: 1,
      invite_actions: inviteActions
    }
  ];

  // 7. Optional CC recipients
  const ccRecipients = ['cc_recipient@example.com'];

  // 8. Send the document group invitation
  const groupInvitePost = new GroupInvitePostRequest(
    documentGroupId,
    inviteSteps,
    ccRecipients
  );

  const response = await client.send<GroupInvitePostResponse>(groupInvitePost);

  return response;
}

sendDocumentGroupInvite().then(displayResult).catch(displayResult);
