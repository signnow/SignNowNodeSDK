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
import { TokenPost } from '../../../src/api/auth/request/tokenPost';
import { TokenPost as TokenPostResponse } from '../../../src/api/auth/response/tokenPost';
import { TokenGet } from '../../../src/api/auth/request/tokenGet';
import { TokenGet as TokenGetResponse } from '../../../src/api/auth/response/tokenGet';

describe('tokenPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const tokenPost = new TokenPost(
        faker.username(),
        faker.password(),
        faker.grantType(),
        faker.scope(),
        faker.code()
    );

    const response = await client.send<TokenPostResponse>(tokenPost);

    const expectation = expectationReader.get('generate_access_token', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('tokenGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const tokenGet = new TokenGet();

    const response = await client.send<TokenGetResponse>(tokenGet);

    const expectation = expectationReader.get('verify_access_token', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
