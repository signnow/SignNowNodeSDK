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
import { CallbacksAllGet } from '../../../src/api/webhookV2/request/callbacksAllGet';
import { CallbacksAllGet as CallbacksAllGetResponse } from '../../../src/api/webhookV2/response/callbacksAllGet';

describe('callbacksAllGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const callbacksAllGet = new CallbacksAllGet(
        faker.eventSubscriptionId()
    );

    const response = await client.send<CallbacksAllGetResponse>(callbacksAllGet);

    const expectation = expectationReader.get('get_event_subscription_callbacks_v2', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
