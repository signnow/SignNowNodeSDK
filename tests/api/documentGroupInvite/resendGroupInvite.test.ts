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
import { ResendGroupInvitePost } from '../../../src/api/documentGroupInvite/request/resendGroupInvitePost';
import { ResendGroupInvitePost as ResendGroupInvitePostResponse } from '../../../src/api/documentGroupInvite/response/resendGroupInvitePost';

describe('resendGroupInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const resendGroupInvitePost = new ResendGroupInvitePost(
        faker.documentGroupId(),
        faker.inviteId(),
        faker.email()
    );

    const response = await client.send<ResendGroupInvitePostResponse>(resendGroupInvitePost);

    const expectation = expectationReader.get('resend_document_group_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
