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
import { ResetPasswordPost } from '../../../src/api/user/request/resetPasswordPost';
import { ResetPasswordPost as ResetPasswordPostResponse } from '../../../src/api/user/response/resetPasswordPost';

describe('resetPasswordPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const resetPasswordPost = new ResetPasswordPost(
        faker.email()
    );

    const response = await client.send<ResetPasswordPostResponse>(resetPasswordPost);

    const expectation = expectationReader.get('reset_password', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
