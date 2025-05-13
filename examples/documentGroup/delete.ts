import { DocumentGroupDelete as DocumentGroupDeleteRequest } from '../../src/api/documentGroup/request/documentGroupDelete';
import { DocumentGroupDelete as DocumentGroupDeleteResponse } from '../../src/api/documentGroup/response/documentGroupDelete';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function deleteDocumentGroup(documentGroupId: string): Promise<DocumentGroupDeleteResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const documentGroupDelete = new DocumentGroupDeleteRequest(documentGroupId);
  
  const response = await client.send<DocumentGroupDeleteResponse>(documentGroupDelete);

	return response;
}

deleteDocumentGroup('4612b8e9ef3e4fe8aa999ea4ab43619e56a32692').then(displayResult).catch(displayResult);
