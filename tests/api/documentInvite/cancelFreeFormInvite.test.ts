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
import { CancelFreeFormInvitePut } from '../../../src/api/documentInvite/request/cancelFreeFormInvitePut';
import { CancelFreeFormInvitePut as CancelFreeFormInvitePutResponse } from '../../../src/api/documentInvite/response/cancelFreeFormInvitePut';

describe('cancelFreeFormInvitePut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const cancelFreeFormInvitePut = new CancelFreeFormInvitePut(
        faker.inviteId(),
        faker.reason()
    );

    const response = await client.send<CancelFreeFormInvitePutResponse>(cancelFreeFormInvitePut);

    const expectation = expectationReader.get('cancel_free_form_invite', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
