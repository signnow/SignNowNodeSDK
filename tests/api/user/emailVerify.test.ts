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
import { EmailVerifyPut } from '../../../src/api/user/request/emailVerifyPut';
import { EmailVerifyPut as EmailVerifyPutResponse } from '../../../src/api/user/response/emailVerifyPut';

describe('emailVerifyPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const emailVerifyPut = new EmailVerifyPut(
        faker.email(),
        faker.verificationToken()
    );

    const response = await client.send<EmailVerifyPutResponse>(emailVerifyPut);

    const expectation = expectationReader.get('user_email_verify', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
