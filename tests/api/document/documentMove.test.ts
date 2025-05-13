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
import { DocumentMovePost } from '../../../src/api/document/request/documentMovePost';
import { DocumentMovePost as DocumentMovePostResponse } from '../../../src/api/document/response/documentMovePost';

describe('documentMovePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentMovePost = new DocumentMovePost(
        faker.documentId(),
        faker.folderId()
    );

    const response = await client.send<DocumentMovePostResponse>(documentMovePost);

    const expectation = expectationReader.get('move_document', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
