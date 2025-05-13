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
import { SubscriptionPost } from '../../../src/api/webhook/request/subscriptionPost';
import { SubscriptionPost as SubscriptionPostResponse } from '../../../src/api/webhook/response/subscriptionPost';
import { SubscriptionGet } from '../../../src/api/webhook/request/subscriptionGet';
import { SubscriptionGet as SubscriptionGetResponse } from '../../../src/api/webhook/response/subscriptionGet';
import { SubscriptionPut } from '../../../src/api/webhook/request/subscriptionPut';
import { SubscriptionPut as SubscriptionPutResponse } from '../../../src/api/webhook/response/subscriptionPut';
import { SubscriptionDelete } from '../../../src/api/webhook/request/subscriptionDelete';
import { SubscriptionDelete as SubscriptionDeleteResponse } from '../../../src/api/webhook/response/subscriptionDelete';

describe('subscriptionPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const subscriptionPost = new SubscriptionPost(
        faker.event(),
        faker.entityId(),
        faker.action(),
        faker.webhookSubscriptionAttributes(),
        faker.secretKey()
    );

    const response = await client.send<SubscriptionPostResponse>(subscriptionPost);

    const expectation = expectationReader.get('create_event_subscription', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('subscriptionGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const subscriptionGet = new SubscriptionGet();

    const response = await client.send<SubscriptionGetResponse>(subscriptionGet);

    const expectation = expectationReader.get('get_event_subscriptions', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('subscriptionPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const subscriptionPut = new SubscriptionPut(
        faker.eventSubscriptionId(),
        faker.event(),
        faker.entityId(),
        faker.action(),
        faker.webhookSubscriptionAttributes()
    );

    const response = await client.send<SubscriptionPutResponse>(subscriptionPut);

    const expectation = expectationReader.get('update_event_subscription', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('subscriptionDelete', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const subscriptionDelete = new SubscriptionDelete(
        faker.eventSubscriptionId()
    );

    const response = await client.send<SubscriptionDeleteResponse>(subscriptionDelete);

    const expectation = expectationReader.get('delete_event_subscription', 'delete');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
