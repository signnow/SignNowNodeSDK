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
import { DocumentGroupEmbeddedSendingLinkPost } from '../../../src/api/embeddedSending/request/documentGroupEmbeddedSendingLinkPost';
import { DocumentGroupEmbeddedSendingLinkPost as DocumentGroupEmbeddedSendingLinkPostResponse } from '../../../src/api/embeddedSending/response/documentGroupEmbeddedSendingLinkPost';

describe('documentGroupEmbeddedSendingLinkPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGroupEmbeddedSendingLinkPost = new DocumentGroupEmbeddedSendingLinkPost(
        faker.documentGroupId(),
        faker.redirectUri(),
        faker.linkExpiration(),
        faker.redirectTarget()
    );

    const response = await client.send<DocumentGroupEmbeddedSendingLinkPostResponse>(documentGroupEmbeddedSendingLinkPost);

    const expectation = expectationReader.get('create_document_group_embedded_sending_link', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
