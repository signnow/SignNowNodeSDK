/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { describe, expect, it } from '@jest/globals';
import { Sdk } from '../../../src/core/sdk';
import { ExpectationReader } from '../../core/mock/expectation/expectationReader';
import { Faker } from '../../core/mock/faker';
import { DocumentPost } from '../../../src/api/document/request/documentPost';
import { DocumentPost as DocumentPostResponse } from '../../../src/api/document/response/documentPost';
import { DocumentGet } from '../../../src/api/document/request/documentGet';
import { DocumentGet as DocumentGetResponse } from '../../../src/api/document/response/documentGet';
import { DocumentPut } from '../../../src/api/document/request/documentPut';
import { DocumentPut as DocumentPutResponse } from '../../../src/api/document/response/documentPut';

describe('documentPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentPost = new DocumentPost(
        faker.file(),
        faker.name(),
        faker.boolean(),
        faker.saveFields(),
        faker.makeTemplate(),
        faker.password(),
        faker.folderId(),
        faker.originTemplateId(),
        faker.clientTimestampAsNumber()
    );

    const response = await client.send<DocumentPostResponse>(documentPost);

    const expectation = expectationReader.get('upload_document', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('documentGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGet = new DocumentGet(
        faker.documentId()
    );

    const response = await client.send<DocumentGetResponse>(documentGet);

    const expectation = expectationReader.get('get_document', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('documentPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentPut = new DocumentPut(
        faker.documentId(),
        faker.documentFields(),
        faker.documentLines(),
        faker.documentChecks(),
        faker.documentRadiobuttons(),
        faker.documentSignatures(),
        faker.documentTexts(),
        faker.documentAttachments(),
        faker.documentHyperlinks(),
        faker.documentIntegrationObjects(),
        faker.documentDeactivateElements(),
        faker.documentName(),
        faker.clientTimestampAsString()
    );

    const response = await client.send<DocumentPutResponse>(documentPut);

    const expectation = expectationReader.get('update_document', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
