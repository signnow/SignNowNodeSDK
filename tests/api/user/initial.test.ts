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
import { InitialGet } from '../../../src/api/user/request/initialGet';
import { InitialGet as InitialGetResponse } from '../../../src/api/user/response/initialGet';
import { InitialPut } from '../../../src/api/user/request/initialPut';
import { InitialPut as InitialPutResponse } from '../../../src/api/user/response/initialPut';

describe('initialGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const initialGet = new InitialGet();

    const response = await client.send<InitialGetResponse>(initialGet);

    const expectation = expectationReader.get('get_user_initials', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('initialPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const initialPut = new InitialPut(
        faker.data()
    );

    const response = await client.send<InitialPutResponse>(initialPut);

    const expectation = expectationReader.get('update_user_initials', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
