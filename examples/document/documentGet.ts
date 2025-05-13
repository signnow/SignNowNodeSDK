import { DocumentGetRequest, DocumentGetResponse } from '../../src/api/document';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function getDocument(documentId: string): Promise<DocumentGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const documentGet = new DocumentGetRequest(documentId);
  const response = await client.send<DocumentGetResponse>(documentGet);

  return response;
}

getDocument('29db9956636d481f9c532ef64951ae78209f7483').then(displayResult).catch(displayResult);
