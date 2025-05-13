import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';
import { FieldsGetRequest, FieldsGetResponse } from '../../src/api/document';

export async function getDocumentFields(documentId: string): Promise<FieldsGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const fieldsGetRequest = new FieldsGetRequest(documentId);
  const response = await client.send<FieldsGetResponse>(fieldsGetRequest);

  return response;
}

getDocumentFields('6c9f255cfb7c42cbbe74b8fba05ca97c90467730').then(displayResult).catch(displayResult);
