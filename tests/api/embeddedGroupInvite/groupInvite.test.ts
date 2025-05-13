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
import { GroupInvitePost } from '../../../src/api/embeddedGroupInvite/request/groupInvitePost';
import { GroupInvitePost as GroupInvitePostResponse } from '../../../src/api/embeddedGroupInvite/response/groupInvitePost';
import { GroupInviteDelete } from '../../../src/api/embeddedGroupInvite/request/groupInviteDelete';
import { GroupInviteDelete as GroupInviteDeleteResponse } from '../../../src/api/embeddedGroupInvite/response/groupInviteDelete';

describe('groupInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const groupInvitePost = new GroupInvitePost(
        faker.documentGroupId(),
        faker.embeddedGroupInviteGroupInviteInvites(),
        faker.boolean()
    );

    const response = await client.send<GroupInvitePostResponse>(groupInvitePost);

    const expectation = expectationReader.get('create_embedded_invite_for_document_group', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('groupInviteDelete', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const groupInviteDelete = new GroupInviteDelete(
        faker.documentGroupId()
    );

    const response = await client.send<GroupInviteDeleteResponse>(groupInviteDelete);

    const expectation = expectationReader.get('delete_embedded_doc_group_invites', 'delete');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
