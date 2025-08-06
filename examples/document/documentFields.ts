import { FieldsGetRequest, FieldsGetResponse } from '@signnow/api-client/api/document';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function getDocumentFields(documentId: string): Promise<FieldsGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const fieldsGetRequest = new FieldsGetRequest(documentId);
  const response = await client.send<FieldsGetResponse>(fieldsGetRequest);

  return response;
}

getDocumentFields('6c9f255cfb7c42cbbe74b8fba05ca97c90467730').then(displayResultError).catch(displayResultError); 