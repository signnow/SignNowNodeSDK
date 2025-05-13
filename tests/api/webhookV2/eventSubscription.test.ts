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
import { EventSubscriptionGet } from '../../../src/api/webhookV2/request/eventSubscriptionGet';
import { EventSubscriptionGet as EventSubscriptionGetResponse } from '../../../src/api/webhookV2/response/eventSubscriptionGet';
import { EventSubscriptionPut } from '../../../src/api/webhookV2/request/eventSubscriptionPut';
import { EventSubscriptionPut as EventSubscriptionPutResponse } from '../../../src/api/webhookV2/response/eventSubscriptionPut';
import { EventSubscriptionDelete } from '../../../src/api/webhookV2/request/eventSubscriptionDelete';
import { EventSubscriptionDelete as EventSubscriptionDeleteResponse } from '../../../src/api/webhookV2/response/eventSubscriptionDelete';

describe('eventSubscriptionGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const eventSubscriptionGet = new EventSubscriptionGet(
        faker.eventSubscriptionId()
    );

    const response = await client.send<EventSubscriptionGetResponse>(eventSubscriptionGet);

    const expectation = expectationReader.get('get_event_subscription_v2', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('eventSubscriptionPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const eventSubscriptionPut = new EventSubscriptionPut(
        faker.eventSubscriptionId(),
        faker.event(),
        faker.entityId(),
        faker.action(),
        faker.webhookV2EventSubscriptionAttributes()
    );

    const response = await client.send<EventSubscriptionPutResponse>(eventSubscriptionPut);

    const expectation = expectationReader.get('update_event_subscriptions_subscription_v2', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('eventSubscriptionDelete', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const eventSubscriptionDelete = new EventSubscriptionDelete(
        faker.eventSubscriptionId()
    );

    const response = await client.send<EventSubscriptionDeleteResponse>(eventSubscriptionDelete);

    const expectation = expectationReader.get('delete_event_subscription_v2', 'delete');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
