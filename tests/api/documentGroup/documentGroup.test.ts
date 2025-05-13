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
import { DocumentGroupPost } from '../../../src/api/documentGroup/request/documentGroupPost';
import { DocumentGroupPost as DocumentGroupPostResponse } from '../../../src/api/documentGroup/response/documentGroupPost';
import { DocumentGroupGet } from '../../../src/api/documentGroup/request/documentGroupGet';
import { DocumentGroupGet as DocumentGroupGetResponse } from '../../../src/api/documentGroup/response/documentGroupGet';
import { DocumentGroupDelete } from '../../../src/api/documentGroup/request/documentGroupDelete';
import { DocumentGroupDelete as DocumentGroupDeleteResponse } from '../../../src/api/documentGroup/response/documentGroupDelete';

describe('documentGroupPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGroupPost = new DocumentGroupPost(
        faker.documentGroupDocumentIds(),
        faker.groupName()
    );

    const response = await client.send<DocumentGroupPostResponse>(documentGroupPost);

    const expectation = expectationReader.get('create_document_group', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('documentGroupGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGroupGet = new DocumentGroupGet(
        faker.documentGroupId()
    );

    const response = await client.send<DocumentGroupGetResponse>(documentGroupGet);

    const expectation = expectationReader.get('get_document_group', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('documentGroupDelete', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGroupDelete = new DocumentGroupDelete(
        faker.documentGroupId()
    );

    const response = await client.send<DocumentGroupDeleteResponse>(documentGroupDelete);

    const expectation = expectationReader.get('delete_document_group', 'delete');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
