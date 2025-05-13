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
import { EventSubscriptionsCallbacksAllGet } from '../../../src/api/webhookV2/request/eventSubscriptionsCallbacksAllGet';
import { EventSubscriptionsCallbacksAllGet as EventSubscriptionsCallbacksAllGetResponse } from '../../../src/api/webhookV2/response/eventSubscriptionsCallbacksAllGet';

describe('eventSubscriptionsCallbacksAllGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const eventSubscriptionsCallbacksAllGet = new EventSubscriptionsCallbacksAllGet();

    const response = await client.send<EventSubscriptionsCallbacksAllGetResponse>(eventSubscriptionsCallbacksAllGet);

    const expectation = expectationReader.get('get_all_event_subscriptions_callbacks_v2', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
