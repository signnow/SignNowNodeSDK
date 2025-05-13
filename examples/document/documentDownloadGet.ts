import { DocumentDownloadGetRequest, DocumentDownloadGetResponse } from '../../src/api/document';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function documentDownloadGet(documentId: string): Promise<DocumentDownloadGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const documentDownloadGet = new DocumentDownloadGetRequest(documentId);

  documentDownloadGet.withHistory('no');
  documentDownloadGet.withType('collapsed');

  const response = await client.send<DocumentDownloadGetResponse>(documentDownloadGet);

  return response;
}

documentDownloadGet('8612b8e9ea3e4fe8aa997ea4ab43619e56a32691').then(displayResult).catch(displayResult);
