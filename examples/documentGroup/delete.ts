import { DocumentGroupDeleteRequest, DocumentGroupDeleteResponse } from '@signnow/api-client/api/documentGroup';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function deleteDocumentGroup(documentGroupId: string): Promise<DocumentGroupDeleteResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const documentGroupDelete = new DocumentGroupDeleteRequest(documentGroupId);
  
  const response = await client.send<DocumentGroupDeleteResponse>(documentGroupDelete);

	return response;
}

deleteDocumentGroup('4612b8e9ef3e4fe8aa999ea4ab43619e56a32692').then(displayResultError).catch(displayResultError); 