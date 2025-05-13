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
import { RoutingDetailsPost } from '../../../src/api/template/request/routingDetailsPost';
import { RoutingDetailsPost as RoutingDetailsPostResponse } from '../../../src/api/template/response/routingDetailsPost';
import { RoutingDetailsPut } from '../../../src/api/template/request/routingDetailsPut';
import { RoutingDetailsPut as RoutingDetailsPutResponse } from '../../../src/api/template/response/routingDetailsPut';
import { RoutingDetailsGet } from '../../../src/api/template/request/routingDetailsGet';
import { RoutingDetailsGet as RoutingDetailsGetResponse } from '../../../src/api/template/response/routingDetailsGet';

describe('routingDetailsPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const routingDetailsPost = new RoutingDetailsPost(
        faker.documentId()
    );

    const response = await client.send<RoutingDetailsPostResponse>(routingDetailsPost);

    const expectation = expectationReader.get('create_routing_details', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('routingDetailsPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const routingDetailsPut = new RoutingDetailsPut(
        faker.documentId()
    );

    const response = await client.send<RoutingDetailsPutResponse>(routingDetailsPut);

    const expectation = expectationReader.get('update_routing_details', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('routingDetailsGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const routingDetailsGet = new RoutingDetailsGet(
        faker.documentId()
    );

    const response = await client.send<RoutingDetailsGetResponse>(routingDetailsGet);

    const expectation = expectationReader.get('get_routing_details', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
