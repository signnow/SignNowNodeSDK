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
import { DocumentDownloadLinkPost } from '../../../src/api/document/request/documentDownloadLinkPost';
import { DocumentDownloadLinkPost as DocumentDownloadLinkPostResponse } from '../../../src/api/document/response/documentDownloadLinkPost';

describe('documentDownloadLinkPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentDownloadLinkPost = new DocumentDownloadLinkPost(
        faker.documentId()
    );

    const response = await client.send<DocumentDownloadLinkPostResponse>(documentDownloadLinkPost);

    const expectation = expectationReader.get('create_document_download_link', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
