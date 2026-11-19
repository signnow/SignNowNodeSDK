import {
  DocumentPostRequest,
  DocumentPostResponse,
  DocumentPutRequest,
  DocumentPutResponse,
  FieldRequestAttribute,
} from '@signnow/api-client/api/document';
import {
  DocumentPrefillPutRequest,
  FieldRequestAttribute as PrefillFieldRequestAttribute,
} from '@signnow/api-client/api/documentField';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function uploadDocumentAddFieldsAndPrefill(): Promise<void> {
  const sdk = new Sdk({ apiKey: '{{API_KEY}}', basicToken: '{{BASIC_TOKEN}}' });
  const client = sdk.getClient();

  // Step 1: Upload a document
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'test.pdf');
  const documentPostResponse = await client.send<DocumentPostResponse>(documentPost);
  const documentId = documentPostResponse.id;

  console.log(`Document uploaded with ID: ${documentId}`);

  // Step 2: Add two text fields to the document
  const fields: FieldRequestAttribute[] = [
    {
      x: 260,
      y: 30,
      width: 100,
      height: 25,
      type: 'text',
      page_number: 0,
      required: true,
      role: 'Signer',
      name: 'first_name',
    },
    {
      x: 260,
      y: 60,
      width: 100,
      height: 25,
      type: 'text',
      page_number: 0,
      required: true,
      role: 'Signer',
      name: 'last_name',
    },
  ];

  const documentPut = new DocumentPutRequest(documentId, fields);
  const documentPutResponse = await client.send<DocumentPutResponse>(documentPut);

  console.log('Fields added to document');

  // Step 3: Prefill the fields
  const prefillFields: PrefillFieldRequestAttribute[] = [
    {
      field_name: 'first_name',
      prefilled_text: 'Jane',
    },
    {
      field_name: 'last_name',
      prefilled_text: 'Doe',
    },
  ];

  const documentPrefillPut = new DocumentPrefillPutRequest(documentId, prefillFields);
  await client.send(documentPrefillPut);

  console.log('Fields prefilled successfully');
}

uploadDocumentAddFieldsAndPrefill().then(displayResultError).catch(displayResultError);
