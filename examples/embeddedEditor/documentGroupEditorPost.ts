import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { DocumentGroupPostRequest, DocumentGroupPostResponse } from '@signnow/api-client/api/documentGroup';
import { DocumentGroupEmbeddedEditorLinkPostRequest, DocumentGroupEmbeddedEditorLinkPostResponse } from '@signnow/api-client/api/embeddedEditor';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function createDocumentGroupEmbeddedEditorLink(): Promise<DocumentGroupEmbeddedEditorLinkPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const groupName = 'Embedded Invite Document Group';
  const redirectUri = 'https://example.com/document-group-completed'; // Redirect URI after the document group is signed
  const redirectTarget = 'self';
  const linkExpiration = 15; // Link will expire in 15 minutes

  // 1. Upload first document
  const documentPost1 = new DocumentPostRequest('./examples/_data/demo.pdf', 'contract1.pdf');
  const documentResponse1 = await client.send<DocumentPostResponse>(documentPost1);
  const documentId1 = documentResponse1.id;

  // 2. Upload second document
  const documentPost2 = new DocumentPostRequest('./examples/_data/demo.pdf', 'contract2.pdf');
  const documentResponse2 = await client.send<DocumentPostResponse>(documentPost2);
  const documentId2 = documentResponse2.id;

  // 3. Create document group
  const documentGroupPost = new DocumentGroupPostRequest(
    [documentId1, documentId2],
    groupName
  );
  const documentGroupResponse = await client.send<DocumentGroupPostResponse>(documentGroupPost);
  const groupId = documentGroupResponse.id;

  // 4. Create a link to embedded editor for the document group
  const editorRequest = new DocumentGroupEmbeddedEditorLinkPostRequest(
    groupId,
    redirectUri,
    redirectTarget,
    linkExpiration
  );

  const response = await client.send<DocumentGroupEmbeddedEditorLinkPostResponse>(editorRequest);
  
  return response;
}

createDocumentGroupEmbeddedEditorLink().then(displayResultError).catch(displayResultError); 