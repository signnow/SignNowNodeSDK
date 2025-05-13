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
import { UserPost } from '../../../src/api/user/request/userPost';
import { UserPost as UserPostResponse } from '../../../src/api/user/response/userPost';
import { UserPut } from '../../../src/api/user/request/userPut';
import { UserPut as UserPutResponse } from '../../../src/api/user/response/userPut';
import { UserGet } from '../../../src/api/user/request/userGet';
import { UserGet as UserGetResponse } from '../../../src/api/user/response/userGet';

describe('userPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const userPost = new UserPost(
        faker.email(),
        faker.password(),
        faker.firstName(),
        faker.lastName(),
        faker.number()
    );

    const response = await client.send<UserPostResponse>(userPost);

    const expectation = expectationReader.get('create_user', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('userPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const userPut = new UserPut(
        faker.firstName(),
        faker.lastName(),
        faker.password(),
        faker.oldPassword(),
        faker.logoutAll()
    );

    const response = await client.send<UserPutResponse>(userPut);

    const expectation = expectationReader.get('update_user', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('userGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const userGet = new UserGet();

    const response = await client.send<UserGetResponse>(userGet);

    const expectation = expectationReader.get('get_user_info', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
