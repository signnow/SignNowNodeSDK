import { DocumentPostRequest, DocumentPutRequest, DocumentPostResponse, DocumentPutResponse, FieldRequestAttribute } from '@signnow/api-client/api/document';
import { RoutingDetailsGetRequest, RoutingDetailsPostRequest, RoutingDetailsGetResponse, RoutingDetailsPostResponse } from '@signnow/api-client/api/template';
import { Sdk } from '@signnow/api-client/core';

export async function getRoutingDetails(): Promise<RoutingDetailsGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  /**
   * Upload a document.
   */
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf');
  const documentPostResponse = await client.send<DocumentPostResponse>(documentPost);

  /**
   * Add a field to the document.
   */
  const fields: FieldRequestAttribute[] = [{
    x: 358,
    y: 171,
    width: 177,
    height: 50,
    type: 'signature',
    page_number: 0,
    required: true,
    role: 'Signer 1'
  }];
  const documentPut = new DocumentPutRequest(documentPostResponse.id, fields);
  await client.send<DocumentPutResponse>(documentPut);

  /**
   * Create routing details for the document.
   */
  const routingDetailsPost = new RoutingDetailsPostRequest(documentPostResponse.id);
  await client.send<RoutingDetailsPostResponse>(routingDetailsPost);

  /**
   * Get routing details for the document.
   */
  const routingDetailsGet = new RoutingDetailsGetRequest(documentPostResponse.id);
  const response = await client.send<RoutingDetailsGetResponse>(routingDetailsGet);

  return response;
}

getRoutingDetails().then(console.log, console.error); 