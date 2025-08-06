import { DocumentPostRequest, DocumentPostResponse } from '@signnow/api-client/api/document';
import { RoutingDetailsPutRequest, RoutingDetailsPutResponse } from '@signnow/api-client/api/template';
import { Sdk } from '@signnow/api-client/core';

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