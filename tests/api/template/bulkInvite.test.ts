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
import { BulkInvitePost } from '../../../src/api/template/request/bulkInvitePost';
import { BulkInvitePost as BulkInvitePostResponse } from '../../../src/api/template/response/bulkInvitePost';

describe('bulkInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const bulkInvitePost = new BulkInvitePost(
        faker.documentId(),
        faker.file(),
        faker.folderId(),
        faker.clientTimestampAsNumber(),
        faker.documentName(),
        faker.subject(),
        faker.message()
    );

    const response = await client.send<BulkInvitePostResponse>(bulkInvitePost);

    const expectation = expectationReader.get('bulk_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
