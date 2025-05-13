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
import { CallbackGet } from '../../../src/api/webhookV2/request/callbackGet';
import { CallbackGet as CallbackGetResponse } from '../../../src/api/webhookV2/response/callbackGet';

describe('callbackGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const callbackGet = new CallbackGet(
        faker.eventSubscriptionId(),
        faker.callbackId()
    );

    const response = await client.send<CallbackGetResponse>(callbackGet);

    const expectation = expectationReader.get('get_event_subscription_callback', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
