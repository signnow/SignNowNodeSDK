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
import { DocumentInviteLinkPost } from '../../../src/api/embeddedInvite/request/documentInviteLinkPost';
import { DocumentInviteLinkPost as DocumentInviteLinkPostResponse } from '../../../src/api/embeddedInvite/response/documentInviteLinkPost';

describe('documentInviteLinkPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentInviteLinkPost = new DocumentInviteLinkPost(
        faker.documentId(),
        faker.fieldInviteId(),
        faker.authMethod(),
        faker.linkExpiration()
    );

    const response = await client.send<DocumentInviteLinkPostResponse>(documentInviteLinkPost);

    const expectation = expectationReader.get('create_link_for_embedded_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
