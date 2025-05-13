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
import { FreeFormInvitePost } from '../../../src/api/documentInvite/request/freeFormInvitePost';
import { FreeFormInvitePost as FreeFormInvitePostResponse } from '../../../src/api/documentInvite/response/freeFormInvitePost';
import { FreeFormInviteGet } from '../../../src/api/documentInvite/request/freeFormInviteGet';
import { FreeFormInviteGet as FreeFormInviteGetResponse } from '../../../src/api/documentInvite/response/freeFormInviteGet';

describe('freeFormInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const freeFormInvitePost = new FreeFormInvitePost(
        faker.documentId(),
        faker.to(),
        faker.from(),
        faker.documentInviteFreeFormInviteCc(),
        faker.subject(),
        faker.message(),
        faker.ccSubject(),
        faker.ccMessage(),
        faker.language(),
        faker.clientTimestampAsNumber(),
        faker.callbackUrl(),
        faker.boolean(),
        faker.redirectUri(),
        faker.closeRedirectUri(),
        faker.redirectTarget()
    );

    const response = await client.send<FreeFormInvitePostResponse>(freeFormInvitePost);

    const expectation = expectationReader.get('create_free_form_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('freeFormInviteGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const freeFormInviteGet = new FreeFormInviteGet(
        faker.documentId()
    );

    const response = await client.send<FreeFormInviteGetResponse>(freeFormInviteGet);

    const expectation = expectationReader.get('get_document_free_form_invites', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
