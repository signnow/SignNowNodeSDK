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
import { DocumentPrefillSmartFieldPost } from '../../../src/api/smartFields/request/documentPrefillSmartFieldPost';
import { DocumentPrefillSmartFieldPost as DocumentPrefillSmartFieldPostResponse } from '../../../src/api/smartFields/response/documentPrefillSmartFieldPost';

describe('documentPrefillSmartFieldPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentPrefillSmartFieldPost = new DocumentPrefillSmartFieldPost(
        faker.documentId(),
        faker.smartFieldsDocumentPrefillSmartFieldData(),
        faker.clientTimestampAsString()
    );

    const response = await client.send<DocumentPrefillSmartFieldPostResponse>(documentPrefillSmartFieldPost);

    const expectation = expectationReader.get('prefill_smart_fields', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
