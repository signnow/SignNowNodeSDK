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
import { DownloadDocumentGroupPost } from '../../../src/api/documentGroup/request/downloadDocumentGroupPost';
import { DownloadDocumentGroupPost as DownloadDocumentGroupPostResponse } from '../../../src/api/documentGroup/response/downloadDocumentGroupPost';

describe('downloadDocumentGroupPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const downloadDocumentGroupPost = new DownloadDocumentGroupPost(
        faker.documentGroupId(),
        faker.type(),
        faker.withHistory(),
        faker.documentGroupDownloadDocumentGroupDocumentOrder()
    );

    const response = await client.send<DownloadDocumentGroupPostResponse>(downloadDocumentGroupPost);

    const expectation = expectationReader.get('download_document_group', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
