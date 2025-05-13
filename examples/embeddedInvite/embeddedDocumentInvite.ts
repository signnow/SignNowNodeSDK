import { DocumentGetRequest, DocumentGetResponse, DocumentPostRequest, DocumentPostResponse, DocumentPutRequest, DocumentPutResponse } from '../../src/api/document';
import { DocumentInvitePostRequest, DocumentInvitePostResponse, InviteRequest } from '../../src/api/embeddedInvite';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function createEmbeddedInvite(): Promise<DocumentInvitePostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  // signer names are optional
  const signers = [{
    email: 'signer1@signnow.com',
    role: 'Engineer',
    first_name: 'John',
    last_name: 'Doe'
  }, {
    email: 'signer2@signnow.com',
    role: 'Accountant',
    first_name: 'Jane',
    last_name: 'Smith'
  }];

  // 1. Upload document
  const documentPost = new DocumentPostRequest('./examples/_data/demo.pdf', 'document_to_sign.pdf');
  const responseDocumentPost = await client.send<DocumentPostResponse>(documentPost);
  const documentId = responseDocumentPost.id;

  // 2. Add fields and roles to the document
  const fieldForRole1 = {
    x: 205,
    y: 18,
    width: 122,
    height: 12,
    type: 'text',
    page_number: 0,
    required: true,
    role: signers[0].role,
    name: 'text_field_engineer',
    label: 'Engineer decision'
  };
  const fieldForRole2 = {
    x: 205,
    y: 36,
    width: 122,
    height: 12,
    type: 'text',
    page_number: 0,
    required: true,
    role: signers[1].role,
    name: 'text_field_accountant',
    label: 'Accountant decision'
  };
  const documentPut = new DocumentPutRequest(documentId, [fieldForRole1, fieldForRole2]);
  await client.send<DocumentPutResponse>(documentPut);

  // 3. Get the document by id to retrieve the roles IDs
  const documentGet = new DocumentGetRequest(documentId);
  const responseDocumentGet = await client.send<DocumentGetResponse>(documentGet);
  const roleIds = responseDocumentGet.roles.map(role => role.unique_id);

  // 4. Create embedded invite
  // Define the invitees with their roles and settings
  const invites: InviteRequest[] = [
    {
      email: signers[0].email,
      role_id: roleIds[0], // Use the first role ID from the document
      order: 1,
      auth_method: 'none', // No authentication required
      first_name: signers[0].first_name,
      last_name: signers[0].last_name
    },
    {
      email: signers[1].email,
      role_id: roleIds[1], // Use the second role ID from the document
      order: 2,
      auth_method: 'password', // Password authentication
      first_name: signers[1].first_name,
      last_name: signers[1].last_name,
      authentication: {
        password: 'just.not.12345', // Password for authentication
        type: 'password'
      }
    }
  ];

  const embeddedInviteRequest = new DocumentInvitePostRequest(
    documentId,
    invites
  );

  const response = await client.send<DocumentInvitePostResponse>(embeddedInviteRequest);
  
  return response;
}

createEmbeddedInvite().then(displayResult).catch(displayResult);
