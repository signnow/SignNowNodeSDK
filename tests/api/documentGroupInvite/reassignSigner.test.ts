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
import { ReassignSignerPost } from '../../../src/api/documentGroupInvite/request/reassignSignerPost';
import { ReassignSignerPost as ReassignSignerPostResponse } from '../../../src/api/documentGroupInvite/response/reassignSignerPost';

describe('reassignSignerPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const reassignSignerPost = new ReassignSignerPost(
        faker.documentGroupId(),
        faker.inviteId(),
        faker.stepId(),
        faker.userToUpdate(),
        faker.replaceWithThisUser(),
        faker.documentGroupInviteReassignSignerInviteEmail(),
        faker.documentGroupInviteReassignSignerUpdateInviteActionAttributes()
    );

    const response = await client.send<ReassignSignerPostResponse>(reassignSignerPost);

    const expectation = expectationReader.get('reassign_signer_for_document_group_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
