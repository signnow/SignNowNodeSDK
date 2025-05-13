import { DocumentPost as DocumentPostRequest } from '../../src/api/document/request/documentPost';
import { DocumentPost as DocumentPostResponse } from '../../src/api/document/response/documentPost';
import { RoutingDetailsPut as RoutingDetailsPutRequest } from '../../src/api/template/request/routingDetailsPut';
import { RoutingDetailsPut as RoutingDetailsPutResponse } from '../../src/api/template/response/routingDetailsPut';
import { Sdk } from '../../src/core/sdk';

export async function putRoutingDetails(): Promise<RoutingDetailsPutResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  /**
   * Upload a document.
   */
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf');
  const documentPostResponse = await client.send<DocumentPostResponse>(documentPost);

  /**
   * Update routing details for the document.
   */
  const routingDetailsPut = new RoutingDetailsPutRequest(documentPostResponse.id);
  const response = await client.send<RoutingDetailsPutResponse>(routingDetailsPut);

  return response;
}

putRoutingDetails().then(console.log, console.error);
