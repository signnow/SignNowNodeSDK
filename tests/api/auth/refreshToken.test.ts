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
import { RefreshTokenPost } from '../../../src/api/auth/request/refreshTokenPost';
import { RefreshTokenPost as RefreshTokenPostResponse } from '../../../src/api/auth/response/refreshTokenPost';

describe('refreshTokenPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const refreshTokenPost = new RefreshTokenPost(
        faker.refreshToken(),
        faker.scope(),
        faker.expirationTime(),
        faker.grantType()
    );

    const response = await client.send<RefreshTokenPostResponse>(refreshTokenPost);

    const expectation = expectationReader.get('refresh_access_token', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
