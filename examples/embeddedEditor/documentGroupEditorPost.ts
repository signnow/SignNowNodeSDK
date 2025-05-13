import { DocumentPostRequest, DocumentPostResponse } from '../../src/api/document';
import { DocumentGroupPost } from '../../src/api/documentGroup/request/documentGroupPost';
import { DocumentGroupPost as DocumentGroupPostResponse } from '../../src/api/documentGroup/response/documentGroupPost';
import { DocumentGroupEmbeddedEditorLinkPost } from '../../src/api/embeddedEditor/request/documentGroupEmbeddedEditorLinkPost';
import { DocumentGroupEmbeddedEditorLinkPost as DocumentGroupEmbeddedEditorLinkPostResponse } from '../../src/api/embeddedEditor/response/documentGroupEmbeddedEditorLinkPost';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

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
  const documentGroupPost = new DocumentGroupPost(
    [documentId1, documentId2],
    groupName
  );
  const documentGroupResponse = await client.send<DocumentGroupPostResponse>(documentGroupPost);
  const groupId = documentGroupResponse.id;

  // 4. Create a link to embedded editor for the document group
  const editorRequest = new DocumentGroupEmbeddedEditorLinkPost(
    groupId,
    redirectUri,
    redirectTarget,
    linkExpiration
  );

  const response = await client.send<DocumentGroupEmbeddedEditorLinkPostResponse>(editorRequest);
  
  return response;
}

createDocumentGroupEmbeddedEditorLink().then(displayResult).catch(displayResult);
