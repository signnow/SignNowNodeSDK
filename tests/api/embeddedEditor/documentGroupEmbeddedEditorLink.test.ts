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
import { DocumentGroupEmbeddedEditorLinkPost } from '../../../src/api/embeddedEditor/request/documentGroupEmbeddedEditorLinkPost';
import { DocumentGroupEmbeddedEditorLinkPost as DocumentGroupEmbeddedEditorLinkPostResponse } from '../../../src/api/embeddedEditor/response/documentGroupEmbeddedEditorLinkPost';

describe('documentGroupEmbeddedEditorLinkPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGroupEmbeddedEditorLinkPost = new DocumentGroupEmbeddedEditorLinkPost(
        faker.documentGroupId(),
        faker.redirectUri(),
        faker.redirectTarget(),
        faker.linkExpiration()
    );

    const response = await client.send<DocumentGroupEmbeddedEditorLinkPostResponse>(documentGroupEmbeddedEditorLinkPost);

    const expectation = expectationReader.get('create_document_group_embedded_editor_link', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
