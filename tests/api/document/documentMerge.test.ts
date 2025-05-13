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
import { DocumentMergePost } from '../../../src/api/document/request/documentMergePost';
import { DocumentMergePost as DocumentMergePostResponse } from '../../../src/api/document/response/documentMergePost';

describe('documentMergePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentMergePost = new DocumentMergePost(
        faker.name(),
        faker.documentDocumentMergeDocumentIds(),
        faker.boolean()
    );

    const response = await client.send<DocumentMergePostResponse>(documentMergePost);

    const expectation = expectationReader.get('merge_documents', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
