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
import { GroupInvitePost } from '../../../src/api/documentGroupInvite/request/groupInvitePost';
import { GroupInvitePost as GroupInvitePostResponse } from '../../../src/api/documentGroupInvite/response/groupInvitePost';
import { GroupInviteGet } from '../../../src/api/documentGroupInvite/request/groupInviteGet';
import { GroupInviteGet as GroupInviteGetResponse } from '../../../src/api/documentGroupInvite/response/groupInviteGet';

describe('groupInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const groupInvitePost = new GroupInvitePost(
        faker.documentGroupId(),
        faker.documentGroupInviteGroupInviteInviteSteps(),
        faker.documentGroupInviteGroupInviteCc(),
        faker.documentGroupInviteGroupInviteEmailGroups(),
        faker.documentGroupInviteGroupInviteCompletionEmails(),
        faker.boolean(),
        faker.clientTimestampAsNumber(),
        faker.ccSubject(),
        faker.ccMessage()
    );

    const response = await client.send<GroupInvitePostResponse>(groupInvitePost);

    const expectation = expectationReader.get('invite_to_sign_document_group', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('groupInviteGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const groupInviteGet = new GroupInviteGet(
        faker.documentGroupId(),
        faker.inviteId()
    );

    const response = await client.send<GroupInviteGetResponse>(groupInviteGet);

    const expectation = expectationReader.get('get_document_group_invite', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
