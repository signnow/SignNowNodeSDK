import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { RoutingDetailsPostRequest, RoutingDetailsPostResponse } from '@signnow/api-client/api/template';
import { Sdk } from '@signnow/api-client/core';

export async function postRoutingDetails(): Promise<RoutingDetailsPostResponse> {
  const sdk = new Sdk({ apiKey: '{{API_KEY}}', basicToken: '{{BASIC_TOKEN}}' });
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