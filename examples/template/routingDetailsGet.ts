import { Field } from '../../src/api/document/request/data/field';
import { DocumentPost as DocumentPostRequest } from '../../src/api/document/request/documentPost';
import { DocumentPut as DocumentPutRequest } from '../../src/api/document/request/documentPut';
import { DocumentPost as DocumentPostResponse } from '../../src/api/document/response/documentPost';
import { DocumentPut as DocumentPutResponse } from '../../src/api/document/response/documentPut';
import { RoutingDetailsGet as RoutingDetailsGetRequest } from '../../src/api/template/request/routingDetailsGet';
import { RoutingDetailsPost as RoutingDetailsPostRequest } from '../../src/api/template/request/routingDetailsPost';
import { RoutingDetailsGet as RoutingDetailsGetResponse } from '../../src/api/template/response/routingDetailsGet';
import { RoutingDetailsPost as RoutingDetailsPostResponse } from '../../src/api/template/response/routingDetailsPost';
import { Sdk } from '../../src/core/sdk';

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
  const fields: Field[] = [{
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
