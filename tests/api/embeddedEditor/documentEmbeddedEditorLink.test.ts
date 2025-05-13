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
import { DocumentEmbeddedEditorLinkPost } from '../../../src/api/embeddedEditor/request/documentEmbeddedEditorLinkPost';
import { DocumentEmbeddedEditorLinkPost as DocumentEmbeddedEditorLinkPostResponse } from '../../../src/api/embeddedEditor/response/documentEmbeddedEditorLinkPost';

describe('documentEmbeddedEditorLinkPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentEmbeddedEditorLinkPost = new DocumentEmbeddedEditorLinkPost(
        faker.documentId(),
        faker.redirectUri(),
        faker.redirectTarget(),
        faker.linkExpiration()
    );

    const response = await client.send<DocumentEmbeddedEditorLinkPostResponse>(documentEmbeddedEditorLinkPost);

    const expectation = expectationReader.get('create_document_embedded_editor_link', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
