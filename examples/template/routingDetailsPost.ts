import { DocumentPost as DocumentPostRequest } from '../../src/api/document/request/documentPost';
import { DocumentPost as DocumentPostResponse } from '../../src/api/document/response/documentPost';
import { RoutingDetailsPost as RoutingDetailsPostRequest } from '../../src/api/template/request/routingDetailsPost';
import { RoutingDetailsPost as RoutingDetailsPostResponse } from '../../src/api/template/response/routingDetailsPost';
import { Sdk } from '../../src/core/sdk';

export async function postRoutingDetails(): Promise<RoutingDetailsPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  /**
   * Upload a document.
   */
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf');
  const documentPostResponse = await client.send<DocumentPostResponse>(documentPost);

  /**
   * Create routing details for the document.
   */
  const routingDetailsPost = new RoutingDetailsPostRequest(documentPostResponse.id);
  const response = await client.send<RoutingDetailsPostResponse>(routingDetailsPost);

  return response;
}

postRoutingDetails().then(console.log, console.error);
