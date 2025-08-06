import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { DocumentEmbeddedEditorLinkPostRequest, DocumentEmbeddedEditorLinkPostResponse } from '@signnow/api-client/api/embeddedEditor';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function createEmbeddedEditorLink(): Promise<DocumentEmbeddedEditorLinkPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const redirectUri = 'https://signnow.com'; // Redirect URI after the document is signed
  const redirectTarget = 'self'; // Target for the redirect: 'self'|'blank'
  const linkExpiration = 15;     // Link will expire in 15 minutes

  // 1. Upload the document
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'contract.pdf');
  const responseDocumentPost = await client.send<DocumentPostResponse>(documentPost);
  const documentId = responseDocumentPost.id;

  // 2. Create a link to embedded editor for the document
  const editorRequest = new DocumentEmbeddedEditorLinkPostRequest(
    documentId,
    redirectUri,
    redirectTarget,
    linkExpiration
  );

  const response = await client.send<DocumentEmbeddedEditorLinkPostResponse>(editorRequest);

  return response;
}

createEmbeddedEditorLink().then(displayResultError).catch(displayResultError); 