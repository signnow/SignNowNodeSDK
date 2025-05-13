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
import { CancelGroupInvitePost } from '../../../src/api/documentGroupInvite/request/cancelGroupInvitePost';
import { CancelGroupInvitePost as CancelGroupInvitePostResponse } from '../../../src/api/documentGroupInvite/response/cancelGroupInvitePost';

describe('cancelGroupInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const cancelGroupInvitePost = new CancelGroupInvitePost(
        faker.documentGroupId(),
        faker.inviteId()
    );

    const response = await client.send<CancelGroupInvitePostResponse>(cancelGroupInvitePost);

    const expectation = expectationReader.get('cancel_document_group_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
