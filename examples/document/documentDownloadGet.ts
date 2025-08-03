import { DocumentDownloadGetRequest, DocumentDownloadGetResponse } from '@signnow/api-client/api/document';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function documentDownloadGet(documentId: string): Promise<DocumentDownloadGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const documentDownloadGet = new DocumentDownloadGetRequest(documentId);

  documentDownloadGet.withHistory('no');
  documentDownloadGet.withType('collapsed');

  const response = await client.send<DocumentDownloadGetResponse>(documentDownloadGet);

  return response;
}

documentDownloadGet('8612b8e9ea3e4fe8aa997ea4ab43619e56a32691').then(displayResultError).catch(displayResultError); 