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
import { SigningLinkPost } from '../../../src/api/documentInvite/request/signingLinkPost';
import { SigningLinkPost as SigningLinkPostResponse } from '../../../src/api/documentInvite/response/signingLinkPost';

describe('signingLinkPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const signingLinkPost = new SigningLinkPost(
        faker.documentId(),
        faker.redirectUri()
    );

    const response = await client.send<SigningLinkPostResponse>(signingLinkPost);

    const expectation = expectationReader.get('create_signing_link', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
