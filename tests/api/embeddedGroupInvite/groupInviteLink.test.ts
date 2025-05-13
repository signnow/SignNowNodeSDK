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
import { GroupInviteLinkPost } from '../../../src/api/embeddedGroupInvite/request/groupInviteLinkPost';
import { GroupInviteLinkPost as GroupInviteLinkPostResponse } from '../../../src/api/embeddedGroupInvite/response/groupInviteLinkPost';

describe('groupInviteLinkPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const groupInviteLinkPost = new GroupInviteLinkPost(
        faker.documentGroupId(),
        faker.embeddedInviteId(),
        faker.email(),
        faker.authMethod(),
        faker.linkExpiration()
    );

    const response = await client.send<GroupInviteLinkPostResponse>(groupInviteLinkPost);

    const expectation = expectationReader.get('create_link_for_embedded_invite_document_group', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
