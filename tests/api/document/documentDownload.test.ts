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
import { Faker } from '../../core/mock/faker';
import { DocumentDownloadGet } from '../../../src/api/document/request/documentDownloadGet';
import { DocumentDownloadGet as DocumentDownloadGetResponse } from '../../../src/api/document/response/documentDownloadGet';

describe('documentDownloadGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentDownloadGet = new DocumentDownloadGet(
        faker.documentId()
    );

    const response = await client.send<DocumentDownloadGetResponse>(documentDownloadGet);

    expect(typeof response).toBe('string');
  });
});
