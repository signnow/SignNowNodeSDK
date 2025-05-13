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
import { DocumentInvitePost } from '../../../src/api/embeddedInvite/request/documentInvitePost';
import { DocumentInvitePost as DocumentInvitePostResponse } from '../../../src/api/embeddedInvite/response/documentInvitePost';
import { DocumentInviteDelete } from '../../../src/api/embeddedInvite/request/documentInviteDelete';
import { DocumentInviteDelete as DocumentInviteDeleteResponse } from '../../../src/api/embeddedInvite/response/documentInviteDelete';

describe('documentInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentInvitePost = new DocumentInvitePost(
        faker.documentId(),
        faker.embeddedInviteDocumentInviteInvites(),
        faker.nameFormula()
    );

    const response = await client.send<DocumentInvitePostResponse>(documentInvitePost);

    const expectation = expectationReader.get('create_embedded_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('documentInviteDelete', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentInviteDelete = new DocumentInviteDelete(
        faker.documentId()
    );

    const response = await client.send<DocumentInviteDeleteResponse>(documentInviteDelete);

    const expectation = expectationReader.get('delete_embedded_invite', 'delete');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
