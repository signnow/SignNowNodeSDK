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
import { PendingInviteGet } from '../../../src/api/documentGroupInvite/request/pendingInviteGet';
import { PendingInviteGet as PendingInviteGetResponse } from '../../../src/api/documentGroupInvite/response/pendingInviteGet';

describe('pendingInviteGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const pendingInviteGet = new PendingInviteGet(
        faker.documentGroupId(),
        faker.inviteId()
    );

    const response = await client.send<PendingInviteGetResponse>(pendingInviteGet);

    const expectation = expectationReader.get('get_pending_document_group_invites', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
