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
import { CancelInvitePut } from '../../../src/api/documentInvite/request/cancelInvitePut';
import { CancelInvitePut as CancelInvitePutResponse } from '../../../src/api/documentInvite/response/cancelInvitePut';

describe('cancelInvitePut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const cancelInvitePut = new CancelInvitePut(
        faker.documentId(),
        faker.reason()
    );

    const response = await client.send<CancelInvitePutResponse>(cancelInvitePut);

    const expectation = expectationReader.get('cancel_invite', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
