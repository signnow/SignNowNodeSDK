import { DocumentPostRequest, DocumentPostResponse, DocumentPutRequest, DocumentPutResponse } from '../../src/api/document';
import { Sdk } from '../../src/core/sdk';
import { displayResult } from '../../src/core/error/displayResult';
import { Invite } from '../../src/api/embeddedGroupInvite/request/data/invite/invite';
import { Document } from '../../src/api/embeddedGroupInvite/request/data/invite/document';
import { Signer } from '../../src/api/embeddedGroupInvite/request/data/invite/signer';
import { GroupInvitePost as EmbeddedGroupInvitePostRequest } from '../../src/api/embeddedGroupInvite/request/groupInvitePost';
import { GroupInvitePost as EmbeddedGroupInvitePostResponse } from '../../src/api/embeddedGroupInvite/response/groupInvitePost';
import { DocumentGroupPost as DocumentGroupPostRequest } from '../../src/api/documentGroup/request/documentGroupPost';
import { DocumentGroupPost as DocumentGroupPostResponse } from '../../src/api/documentGroup/response/documentGroupPost';

export async function createEmbeddedDocumentGroupInvite(): Promise<EmbeddedGroupInvitePostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
	const documentGroupName = 'Test Document Group';
	const signers = [{
    email: 'signer1@signnow.com',
    role: 'Manager',
    first_name: 'John',
    last_name: 'Doe',
		redirect_uri: 'https://www.example.com/after-signing'
  }, {
    email: 'signer2@signnow.com',
    role: 'Department Head',
    first_name: 'María',
    last_name: 'Fernández'
  }];

  // 1. Upload documents for a group invite
  const documentPost1 = new DocumentPostRequest('./examples/_data/demo.pdf', 'first_document.pdf');
  const documentResponse1 = await client.send<DocumentPostResponse>(documentPost1);
  const documentId1 = documentResponse1.id;

  const documentPost2 = new DocumentPostRequest('./examples/_data/demo.pdf', 'second_document.pdf');
  const documentResponse2 = await client.send<DocumentPostResponse>(documentPost2);
  const documentId2 = documentResponse2.id;

  // 2. Add fields and roles to both documents
  const field1Doc1 = {
    x: 205,
    y: 18,
    width: 122,
    height: 12,
    type: 'text',
    page_number: 0,
    required: true,
    role: signers[0].role,
    name: 'text_field_1',
    label: 'First Document Field 1'
  };
  const documentPut1 = new DocumentPutRequest(documentId1, [field1Doc1]);
  await client.send<DocumentPutResponse>(documentPut1);

  const field1Doc2 = {
    x: 205,
    y: 100,
    width: 122,
    height: 12,
    type: 'text',
    page_number: 0,
    required: true,
    role: signers[1].role,
    name: 'text_field_1',
    label: 'Second Document Field 1'
  };
  const documentPut2 = new DocumentPutRequest(documentId2, [field1Doc2]);
  await client.send<DocumentPutResponse>(documentPut2);

	// 3. Create a document group of the uploaded documents
	const documentGroupPost = new DocumentGroupPostRequest([documentId1, documentId2], documentGroupName);
	const documentGroupResponse = await client.send<DocumentGroupPostResponse>(documentGroupPost);
	const documentGroupId = documentGroupResponse.id;

  // 3. Create embedded group invite
  const documentsSinger1: Document[] = [
    {
      id: documentId1,
      role: signers[0].role,
      action: 'sign'
    }
  ];

  const embeddedSigners1: Signer[] = [
    {
      email: signers[0].email,
      auth_method: 'none', // No authentication required
      documents: documentsSinger1,
      first_name: signers[0].first_name,
      last_name: signers[0].last_name,
			language: 'en',
			redirect_uri: signers[0].redirect_uri,
			redirect_target: 'blank'
    }
  ];

	const documentsSinger2: Document[] = [
    {
      id: documentId2,
      role: signers[1].role,
      action: 'sign'
    }
  ];

  const embeddedSigners2: Signer[] = [
    {
      email: signers[1].email,
      auth_method: 'none', // No authentication required
      documents: documentsSinger2,
      first_name: signers[1].first_name,
      last_name: signers[1].last_name,
			language: 'es'
    }
  ];

  // Define invites with order
  const invites: Invite[] = [
    {
      order: 1,
      signers: embeddedSigners1
    },
		{
      order: 2,
      signers: embeddedSigners2
    }
  ];

  const embeddedGroupInviteRequest = new EmbeddedGroupInvitePostRequest(
		documentGroupId,
    invites,
		true // sign_as_merged
  );

  const response = await client.send<EmbeddedGroupInvitePostResponse>(embeddedGroupInviteRequest);
  
  return response;
}

createEmbeddedDocumentGroupInvite().then(displayResult).catch(displayResult);
