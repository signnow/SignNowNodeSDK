import { DocumentPostRequest, DocumentPostResponse } from '../../src/api/document';
import { DocumentGroupPost as DocumentGroupPostRequest } from '../../src/api/documentGroup/request/documentGroupPost';
import { DocumentGroupPost as DocumentGroupPostResponse } from '../../src/api/documentGroup/response/documentGroupPost';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function createDocumentGroup(): Promise<DocumentGroupPostResponse> {
	const sdk = await new Sdk().authenticate();
	const client = sdk.getClient();

	// Source data
	const documentGroupName = 'Example Document Group';

	// 1. Upload several documents
	const documentPost1 = new DocumentPostRequest('./examples/_data/demo.pdf', 'document_1.pdf');
	const responseDocumentPost1 = await client.send<DocumentPostResponse>(documentPost1);
	const documentId1 = responseDocumentPost1.id;

	const documentPost2 = new DocumentPostRequest('./examples/_data/demo.pdf', 'document_2.pdf');
	const responseDocumentPost2 = await client.send<DocumentPostResponse>(documentPost2);
	const documentId2 = responseDocumentPost2.id;

	const documentGroupPost = new DocumentGroupPostRequest([documentId1, documentId2], documentGroupName);
	const documentGroupResponse = await client.send<DocumentGroupPostResponse>(documentGroupPost);

	return documentGroupResponse;
}

createDocumentGroup().then(displayResult).catch(displayResult);
