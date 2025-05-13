import { DocumentPostRequest, DocumentPostResponse } from '../../src/api/document';
import { DocumentEmbeddedEditorLinkPost } from '../../src/api/embeddedEditor/request/documentEmbeddedEditorLinkPost';
import { DocumentEmbeddedEditorLinkPost as DocumentEmbeddedEditorLinkPostResponse } from '../../src/api/embeddedEditor/response/documentEmbeddedEditorLinkPost';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

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
  const editorRequest = new DocumentEmbeddedEditorLinkPost(
    documentId,
    redirectUri,
    redirectTarget,
    linkExpiration
  );

  const response = await client.send<DocumentEmbeddedEditorLinkPostResponse>(editorRequest);

  return response;
}

createEmbeddedEditorLink().then(displayResult).catch(displayResult);
